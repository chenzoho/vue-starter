declare namespace Setting {
	/**主题设置 */
	export interface ThemeSetting {
		/**主题名称 */
		theme: string;
	}

	/**背景色设置 */
	export interface BgSetting {
		/**背景颜色 */
		bgColor: string;
	}

	/**固定设置 */
	export interface FixedSetting {
		/**是否固定 */
		fixed: boolean;
	}

	/**固定宽度设置 */
	export interface FixedWidthSetting extends FixedSetting {
		/**宽度 */
		width: number;
	}

	/**头部设置 */
	export interface IHeaderSetting extends FixedSetting {
		/**是否显示 */
		show: boolean;
		/**是否显示全屏 */
		showFullScreen: boolean;
		/**是否显示锁屏 */
		useLock: boolean;
		/**是否显示文档 */
		showDoc: boolean;
		/**是否显示通知 */
		showNotice: boolean;
		/**是否显示搜索 */
		showSearch: boolean;
	}

	/**标签页设置 */
	export interface ITabsSetting {
		/**是否缓存 */
		keeplive: boolean;
		/**是否拖拽 */
		drag: boolean;
		/**是否显示全屏 */
		showFullScreen: boolean;
	}

	/**菜单设置 */
	export interface IMenuSetting extends FixedWidthSetting {
		/**是否折叠 */
		collapse: boolean;
		/**是否手风琴模式 */
		accordion: boolean;
		/**是否显示Logo */
		showLogo: boolean;
	}

	/**动画设置 */
	export interface ITransitionSetting {
		/**是否开启 */
		enable: boolean;
		/**动画名称 */
		transition: string;
		/**是否显示加载 */
		loading: boolean;
		/**是否显示进度条 */
		progress: boolean;
	}

	/**内容设置 */
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IContentSetting extends FixedSetting {}

	/**元数据设置 */
	export interface IMetaSetting {
		/**标题 */
		title: string;
		/**logo */
		logo: string;
		/**icon */
		icon: string;
		/**简称 */
		shortTitle: string;
		/**描述 */
		description: string;
		/**关键字 */
		keywords: string;
	}

	/**布局设置 */
	export interface IFullConfig extends ThemeSetting, BgSetting {
		/**头部设置 */
		headerSetting: IHeaderSetting;
		/**菜单设置 */
		menuSetting: IMenuSetting;
		/**标签页设置 */
		multiTabsSetting: ITabsSetting;
		/**动画设置 */
		transitionSetting: ITransitionSetting;
		/**元数据设置 */
		metaSetting: IMetaSetting;
		/**内容设置 */
		contentSetting: IContentSetting;
	}
}
