import { createApp } from "vue";
import "./style.css";
import router from "./router.js";
import App from "./App.vue";
import microApp from "@micro-zoe/micro-app";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

microApp.start({
  "disable-memory-router": true, // 关闭虚拟路由系统
  "disable-patch-request": true, // 关闭对子应用请求的拦截
  plugins: {
    modules: {}
  }
});

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(router);
app.mount("#app");

microApp.router.afterEach((to, from, appName) => {
  // console.log('全局后置守卫 afterEach: ', to, appName)
});
