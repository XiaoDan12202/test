import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/test",
    name: "test",
    component: () => import("./views/test/index.vue")
  }
];
export let history = createWebHashHistory();

let router = createRouter({
  history,
  routes
});
export const clear = () => {
  //卸载子应用清空历史路由
  history = null;
  router = null;
};
export default router;
