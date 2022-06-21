<template>
	<router-view v-slot="{ Component, route }">
		<!-- 动画问题:放入mode路由跳转后，页面会空白 -->
		<transition
			:name="
				getTransitionName({
					route,
					enable: true,
					name: '',
					cacheTabs: getCaches
				})
			"
			appear
		>
			<keep-alive :include="getCaches">
				<component :is="Component" :key="route.fullPath" />
			</keep-alive>
		</transition>
	</router-view>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useMultipleTabStore } from "@/store/modules/multipleTab";
import { getTransitionName } from "./transition";

export default defineComponent({
	name: "PageLayout",
	setup() {
		const tabStore = useMultipleTabStore();

		const getCaches = computed((): string[] => {
			return tabStore.getCachedViews;
		});

		return {
			getTransitionName,
			getCaches
		};
	}
});
</script>
