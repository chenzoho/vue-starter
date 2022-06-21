import { defineStore, Store } from "pinia";
import { store } from "@/store";
import { multipleTabState } from "./types";
import { RouteLocationNormalized, RouteLocationRaw, Router } from "vue-router";
import { toRaw, unref } from "vue";
import { useGo, useRedo } from "@/hooks/web/usePage";

import { getRawRoute } from "@/utils";
import { REDIRECT_NAME, HOME_NAME, EXCEPTION_NAME } from "@/router/constant";

const getToTarget = (tabItem: RouteLocationNormalized) => {
	const { params, path, query } = tabItem;
	return {
		params: params || {},
		path,
		query: query || {}
	};
};

function handleGotoPage(router: Router) {
	const go = useGo(router);
	go(unref(router.currentRoute).path, true);
}

export const useMultipleTabStore = defineStore({
	id: "app-multiple-tab",
	state: (): multipleTabState => ({
		cachedViews: new Set(),
		visitedViews: [],
		lastDragEndIndex: 0
	}),
	getters: {
		/** 缓存视图 */
		getCachedViews(): string[] {
			return Array.from(this.cachedViews);
		},
		/** 缓存视图 */
		getVisitedViews(): RouteLocationNormalized[] {
			return this.visitedViews;
		},
		/** 拖拽Index */
		getLastDragEndIndex(): number {
			return this.lastDragEndIndex;
		}
	},
	actions: {
		/** 更新缓存视图 */
		async updateCacheTab(): Promise<void> {
			const cacheMap: Set<string> = new Set();

			for (const tab of this.visitedViews) {
				const item = getRawRoute(tab);
				// 忽略缓存
				const needCache = !item.meta?.ignoreKeepAlive;
				if (!needCache) {
					continue;
				}
				const name = item.name as string;
				cacheMap.add(name);
			}
			this.cachedViews = cacheMap;
		},
		/** 刷新当前页 */
		async refreshPage(router: Router): Promise<void> {
			const { currentRoute } = router;
			const route = unref(currentRoute);
			const name = route.name;

			const findTab = this.getCachedViews.find(item => item === name);
			if (findTab) {
				this.cachedViews.delete(findTab);
			}
			const redo = useRedo(router);
			await redo();
		},
		/** 清楚缓存视图 */
		clearCacheTabs(): void {
			this.cachedViews = new Set();
		},
		/** 切换页面 */
		goToPage(router: Router) {
			const go = useGo(router);
			const len = this.visitedViews.length;
			const { path } = unref(router.currentRoute);

			let toPath: string = HOME_NAME;

			if (len > 0) {
				const page = this.visitedViews[len - 1];
				const p = page.fullPath || page.path;
				if (p) {
					toPath = p;
				}
			}
			// Jump to the current page and report an error
			path !== toPath && go(toPath, true);
		},
		/** 打开标签页 */
		async addTab(route: RouteLocationNormalized) {
			const { path, name, fullPath, params, query, meta } = getRawRoute(route);
			// 标签页白名单
			if (path === HOME_NAME || path === EXCEPTION_NAME || path == REDIRECT_NAME || !name) {
				return;
			}

			let updateIndex = -1;
			// 判断标签页是否已存在
			const tabHasExits = this.visitedViews.some((tab, index) => {
				updateIndex = index;
				return (tab.fullPath || tab.path) === (fullPath || path);
			});

			if (tabHasExits) {
				// 如果标签页已经存在,替换原有标签页
				const curTab = toRaw(this.visitedViews)[updateIndex];
				if (!curTab) {
					return;
				}
				curTab.params = params || curTab.params;
				curTab.query = query || curTab.query;
				curTab.fullPath = fullPath || curTab.fullPath;
				this.visitedViews.splice(updateIndex, 1, curTab);
			} else {
				// 如果标签页已经存在,现在标签页

				// 动态路由数量控制
				const dynamicLevel: any = meta?.dynamicLevel ?? -1;
				if (dynamicLevel > 0) {
					// 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
					// 首先获取到真实的路由，使用配置方式减少计算开销.
					// const realName: string = path.match(/(\S*)\//)![1];
					const realPath = meta?.realPath ?? "";
					// 获取到已经打开的动态路由数, 判断是否大于某一个值
					if (this.visitedViews.filter(e => e.meta?.realPath ?? "" === realPath).length >= dynamicLevel) {
						// 关闭第一个
						const index = this.visitedViews.findIndex(item => item.meta.realPath === realPath);
						index !== -1 && this.visitedViews.splice(index, 1);
					}
				}
				this.visitedViews.push(route);
			}
			// 更新缓存视图
			this.updateCacheTab();
			// 持久化
			// cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList);
		},
		/** 关闭标签页 */
		async closeTab(tab: RouteLocationNormalized, router: Router) {
			const close = (route: RouteLocationNormalized) => {
				const { fullPath, meta: { affix } = {} } = route;
				if (affix) {
					return;
				}
				const index = this.visitedViews.findIndex(item => item.fullPath === fullPath);
				index !== -1 && this.visitedViews.splice(index, 1);
			};

			const { currentRoute, replace } = router;

			const { path } = unref(currentRoute);

			// 关闭非激活标签页
			if (path !== tab.path) {
				close(tab);
				return;
			}

			// 关闭激活标签页
			let toTarget: RouteLocationRaw = {};

			const index = this.visitedViews.findIndex(item => item.path === path);

			if (index === 0) {
				// 如果是第一个标签页,打开下一个标签页
				// 如果只有一个标签页,打开首页
				if (this.visitedViews.length === 1) {
					toTarget = HOME_NAME;
				} else {
					const page = this.visitedViews[index + 1];
					toTarget = getToTarget(page);
				}
			} else {
				// 如果不是第一个标签页,打开上一个标签页
				const page = this.visitedViews[index - 1];
				toTarget = getToTarget(page);
			}
			close(currentRoute.value);
			await replace(toTarget);
		},
		/** 关闭标签页 */
		async closeTabByKey(key: string, router: Router) {
			const index = this.visitedViews.findIndex(item => (item.fullPath || item.path) === key);
			if (index !== -1) {
				await this.closeTab(this.visitedViews[index], router);
				const { currentRoute, replace } = router;
				// 检查当前路由是否存在于tabList中
				const isActivated = this.visitedViews.findIndex(item => {
					return item.fullPath === currentRoute.value.fullPath;
				});
				// 如果当前路由不存在于TabList中，尝试切换到其它路由
				if (isActivated === -1) {
					let pageIndex;
					if (index > 0) {
						pageIndex = index - 1;
					} else if (index < this.visitedViews.length - 1) {
						pageIndex = index + 1;
					} else {
						pageIndex = -1;
					}
					if (pageIndex >= 0) {
						const page = this.visitedViews[index - 1];
						const toTarget = getToTarget(page);
						await replace(toTarget);
					}
				}
			}
		},
		async bulkCloseTabs(pathList: string[]) {
			this.visitedViews = this.visitedViews.filter(item => !pathList.includes(item.fullPath));
		},
		/** 排序标签页 */
		async sortTabs(oldIndex: number, newIndex: number) {
			const currentTab = this.visitedViews[oldIndex];
			this.visitedViews.splice(oldIndex, 1);
			this.visitedViews.splice(newIndex, 0, currentTab);
			this.lastDragEndIndex = this.lastDragEndIndex + 1;
		},
		/** 关闭左侧标签页 */
		async closeLeftTabs(route: RouteLocationNormalized, router: Router) {
			const index = this.visitedViews.findIndex(item => item.path === route.path);

			if (index > 0) {
				const leftTabs = this.visitedViews.slice(0, index);
				const pathList: string[] = [];
				for (const item of leftTabs) {
					const affix = item?.meta?.affix ?? false;
					if (!affix) {
						pathList.push(item.fullPath);
					}
				}
				this.bulkCloseTabs(pathList);
			}
			this.updateCacheTab();
			handleGotoPage(router);
		},
		/** 关闭右侧标签页 */
		async closeRightTabs(route: RouteLocationNormalized, router: Router) {
			const index = this.visitedViews.findIndex(item => item.fullPath === route.fullPath);

			if (index >= 0 && index < this.visitedViews.length - 1) {
				const rightTabs = this.visitedViews.slice(index + 1, this.visitedViews.length);

				const pathList: string[] = [];
				for (const item of rightTabs) {
					const affix = item?.meta?.affix ?? false;
					if (!affix) {
						pathList.push(item.fullPath);
					}
				}
				this.bulkCloseTabs(pathList);
			}
			this.updateCacheTab();
			handleGotoPage(router);
		},
		/** 关闭其他标签页 */
		async closeOtherTabs(route: RouteLocationNormalized, router: Router) {
			const closePathList = this.visitedViews.map(item => item.fullPath);

			const pathList: string[] = [];

			for (const path of closePathList) {
				if (path !== route.fullPath) {
					const closeItem = this.visitedViews.find(item => item.path === path);
					if (!closeItem) {
						continue;
					}
					const affix = closeItem?.meta?.affix ?? false;
					if (!affix) {
						pathList.push(closeItem.fullPath);
					}
				}
			}
			this.bulkCloseTabs(pathList);
			this.updateCacheTab();
			handleGotoPage(router);
		},
		/** 关闭全部标签页 */
		async closeAllTab(router: Router) {
			this.visitedViews = this.visitedViews.filter(item => item?.meta?.affix ?? false);
			this.clearCacheTabs();
			this.goToPage(router);
		},
		/** 更新标签页Title */
		async setTabTitle(title: string, route: RouteLocationNormalized) {
			const findTab = this.getVisitedViews.find(item => item === route);
			if (findTab) {
				findTab.meta.title = title;
				await this.updateCacheTab();
			}
		},
		/** 更新标签页路径 */
		async updateTabPath(fullPath: string, route: RouteLocationNormalized) {
			const findTab = this.getVisitedViews.find(item => item === route);
			if (findTab) {
				findTab.fullPath = fullPath;
				findTab.path = fullPath;
				await this.updateCacheTab();
			}
		}
	}
});

export function useMultipleTabStoreWithOut(): Store {
	return useMultipleTabStore(store);
}
