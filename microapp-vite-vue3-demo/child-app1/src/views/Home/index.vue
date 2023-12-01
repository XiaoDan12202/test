<template>
  <div>
    子应用
    <a href="https://vitejs.dev" target="_blank">
      <img alt="Vite logo" class="logo" src="/vite.svg" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img
        alt="Vue logo"
        class="logo vue"
        :src="getImageUrl('../../assets/vue.svg')"
      />
      <img alt="Vue logo" class="logo vue" src="../../assets/vue.svg" />
    </a>
  </div>
</template>
<script setup>
import { onActivated, onDeactivated } from "vue";
onActivated(() => {
  console.log("activated child1 home");
});
onDeactivated(() => {
  console.log("deactivated child1 home");
});

const getImageUrl = url => {
  return new URL(url, import.meta.url).href;
};
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>
