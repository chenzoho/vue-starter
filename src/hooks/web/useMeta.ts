import { watch } from "vue";
import { useMetaStore } from "@/store/modules/meta";

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
	const appStore = useMetaStore();
	watch(
		[() => appStore],
		() => {
			document.title = `${appStore.title}`;
			document.querySelector('meta[name="keywords"]')?.setAttribute("content", appStore.keywords);
			document.querySelector('meta[name="description"]')?.setAttribute("content", appStore.description);
			document.querySelector('link[rel="rel="icon""]')?.setAttribute("content", appStore.description);
		},
		{ immediate: true, deep: true }
	);
}
