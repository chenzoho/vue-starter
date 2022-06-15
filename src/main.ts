import { createApp } from "vue";
import App from "./App.vue";

import { setupEventBus } from "@/setup/bus";
import { setupDirective } from "@/setup/directive";
import { setupElement } from "@/setup/ele";
import { setupTable } from "@/setup/table";

/**
 * bootstrap/启动
 */
async function bootstrap(): Promise<void> {
	const app = createApp(App);

	//	bus
	setupEventBus(app);
	//	directive
	setupDirective(app);
	//	ele
	setupElement(app);
	//	table
	setupTable(app);

	//	mount
	app.mount("#app");
}

await bootstrap();
