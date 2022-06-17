<template>
	<div>test plugin</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VTTest",
	setup() {}
});
</script>

<style lang="scss">
@import "./index.scss";
@include b("test") {
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
