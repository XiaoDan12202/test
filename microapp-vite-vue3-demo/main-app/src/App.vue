<template>
  <div class="box">
    <div class="left">
      <router-link to="/">首页</router-link>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :uniqueOpened="false"
        :defaultActive="activeMenu"
        @select="handleMenuSelect"
      >
        <el-sub-menu
          :index="item.id + ''"
          v-for="item in menus"
          :key="item.name"
        >
          <template #title v-if="item.children">
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group v-if="item.children">
            <el-menu-item
              :index="part.path"
              v-for="part in item.children"
              :key="part.name"
              >{{ part.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import microApp, { getActiveApps } from "@micro-zoe/micro-app";
import { watch } from "vue";
const router = useRouter();
const route = useRoute();
const menus = [
  {
    name: "子应用 system",
    id: 1,
    children: [
      {
        name: "home",
        path: "/",
        appName: "system",
        title: "home"
      },
      {
        name: "test",
        path: "/test",
        appName: "system",
        title: "test"
      }
    ]
  },
  {
    name: "子应用 form",
    id: 2,
    children: [
      {
        name: "form",
        path: "/form",
        appName: "form",
        title: "form"
      },
      {
        name: "demo",
        path: "/demo",
        appName: "form",
        title: "demo"
      }
    ]
  }
];
const activeMenu = computed(() => {
  const { path, hash, name } = router.currentRoute.value;

  return path;
});
const curMenu = ref({});
watch(
  () => router.currentRoute.value,
  newValue => {
    // console.log(router.currentRoute.value.query, 'query 参数')
  }
);
const handleMenuSelect = index => {
  //跳转页面
  getCurrentMenu(menus, index);
  const { appName, path, title } = curMenu.value;
  // console.log(curMenu.value,112233)
  pushState(appName, path, { title }, "push");
};

const pushState = (appName, url, obj, type) => {
  /**
   * 当子应用还未渲染，通过基座控制路由跳转，子应用在初始化时会自己根据url渲染对应的页面
   * 当子应用已经渲染，则直接控制子应用进行内部跳转
   *
   * getActiveApps: 用于获取正在运行的子应用
   */
  // console.log(getActiveApps(),appName,url,obj,111111)
  if (!getActiveApps().includes(appName)) {
    // 主应用跳转
    // console.log('主应用')
    microApp.router.setDefaultPage({ name: appName, path: `/#${url}` });
    router.push({
      path: `/${appName}#${url}`,
      query: obj
    });
  } else {
    // console.log('子应用')
    // 主应用通过下发data数据控制子应用跳转
    microApp.setData(appName, { path: url, obj });
  }
};
const getCurrentMenu = (list, path) => {
  const arr = list.filter(item => item.path == path);
  if (arr?.length) {
    curMenu.value = arr[0];
  } else {
    list.forEach(item => {
      if (item.children?.length) {
        getCurrentMenu(item.children, path);
      }
    });
  }
};
</script>
<style>
.box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 300px;
  height: 100%;
  border-right: 1px solid #e6e6fa;
  box-sizing: border-box;
  padding: 60px 20px 20px;
}

.left a {
  display: inline-block;
  margin-bottom: 20px;
}

.right {
  width: calc(100% - 200px);
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
