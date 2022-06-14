import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupApi } from "@/config/api";
import { setupEventBus } from "@/config/bus";
import { setupDirective } from "@/config/directive";
import { setupElement } from "@/config/ele";
import { setupFilter } from "@/config/filter";
import { setupTable } from "@/config/table";
import { setupStore } from "@/store";
import ElementPlus, { ElMessage } from "element-plus";
import "normalize.css";
import { createGuard } from "@/router/guards";
// import installIcons from "@/icons";
// if you're using CDN, please remove this line. element-plus icon注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import svgIcon from "@/components/SvgIcon/index.vue";
import "virtual:svg-icons-register";

async function bootstrap() {
  const app = createApp(App);

  setupApi(app);
  setupEventBus(app);
  setupDirective(app);
  setupElement(app);
  setupFilter(app);
  setupTable(app);
  setupStore(app);

  createGuard(router);
  app.use(router);
  app.mount("#app");
  app.use(ElementPlus, { size: "small", zIndex: 3000 });
  app.component("svg-icon", svgIcon);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.config.globalProperties.$message = ElMessage;
}

bootstrap();
