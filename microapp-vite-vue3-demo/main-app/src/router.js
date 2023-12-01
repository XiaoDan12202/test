import Home from "./view/Home/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    // 因为主应用为history路由，appname-vite子应用是hash路由，这里配置略微不同
    path: "/system:page*",
    name: "system",
    component: () => import("./view/child/system.vue")
  },
  {
    // 因为主应用为history路由，appname-vite子应用是hash路由，这里配置略微不同
    path: "/form:page*",
    name: "form",
    component: () => import("./view/child/form.vue")
  },
  {
    // 因为主应用为history路由，appname-vite子应用是hash路由，这里配置略微不同
    path: "/vite:page*",
    name: "vite",
    component: () => import("./view/child/vite.vue")
  },
  {
    path: "/vue3",
    name: "vue3",
    component: () => import("./view/child/vue3.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
