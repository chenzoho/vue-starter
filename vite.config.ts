import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import vueJsx from "@vitejs/plugin-vue-jsx";

//	see https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src")
		}
	},
	server: {
		open: true,
		cors: true
	},
	css: {
		//	css预处理
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@/styles/config.scss" as *;'
			}
		}
	}
});
