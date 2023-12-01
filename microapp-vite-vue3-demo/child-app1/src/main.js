import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// 与基座进行数据交互
function handleMicroData(router) {
  function dataListener(data) {
    // console.log('来自主应用的数据', data.path)
    router.push({
      path: data.path,
      query: data.obj
    });
  }
  window.microApp && window.microApp.addDataListener(dataListener);
}

// ----------分割线---umd模式--------------- //
let app = null;
// 将渲染操作放入 mount 函数
import router, { history, clear } from "./router.js";

function mount() {
  app = createApp(App);
  app.use(router);
  app.mount("#system-app");
  console.log("微应用child-vite渲染了");
  handleMicroData(router);
}

// 将卸载操作放入 unmount 函数
function unmount() {
  app?.unmount();
  history?.destroy();
  // 卸载所有数据监听函数
  // window.eventCenterForAppNameSystem?.clearDataListener();
  app = null;
  clear();
  window.microApp.clearDataListener();
  // router = null
  // history = null
  console.log("微应用child-vite卸载了");
}
// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  window["micro-app-system"] = { mount, unmount };
} else {
  // 非微前端环境直接渲染
  mount();
}
