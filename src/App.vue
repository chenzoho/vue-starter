<script setup lang="ts">
import CountComp from "./components/Count.vue";
import TsxDemo from "./components/TsxTest";
</script>

<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<TsxDemo />
	<CountComp msg="Vue 3 + TypeScript + Vite + Tsx" />
</template>

<style>
#app {
	margin-top: 60px;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	text-align: center;
}
</style>
