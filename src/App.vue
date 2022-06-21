<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<TsxDemo />
	<CountComp msg="Vue 3 + TypeScript + Vite + Tsx" />
	<VTTest></VTTest>
</template>

<script setup lang="ts">
import CountComp from "./components/Count.vue";
import TsxDemo from "./components/TsxTest";
import { useTitle } from "@/hooks/web/useMeta";
useTitle();
</script>
<style lang="scss">
#app {
	margin-top: 60px;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	text-align: center;
}

@include b("app-logo") {
	display: flex;
	align-items: center;
	height: 32px;
	padding: 8px 4px 8px 10px;
	cursor: pointer;
	transition: all 0.2s ease;

	@include e("image") {
		width: 32px;
		height: 32px;
	}

	@include e("title") {
		margin-left: 8px;
		font-size: 16px;
		font-weight: 700;
		line-height: normal;
		color: #ffffff;
		opacity: 0;
		transition: all 0.5s;

		@include when("visiable") {
			opacity: 1;
		}
	}
}
</style>
