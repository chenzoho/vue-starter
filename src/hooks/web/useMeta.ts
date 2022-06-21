import { watch } from "vue";
import { useMetaStore } from "@/store/modules/meta";

/** 注册元数据设置 */
export function useMeta() {
	const appStore = useMetaStore();
	watch(
		[() => appStore],
		() => {
			document.title = `${appStore.title}`;
			document.querySelector('meta[name="keywords"]')?.setAttribute("content", appStore.keywords);
			document.querySelector('meta[name="description"]')?.setAttribute("content", appStore.description);
			document.querySelector('link[rel="icon"]')?.setAttribute("href", "/favicon.ico");
		},
		{ immediate: true, deep: true }
	);
}
