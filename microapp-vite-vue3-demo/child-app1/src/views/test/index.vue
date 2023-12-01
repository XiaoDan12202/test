<template>
  <p>test vite-vue3</p>
</template>
<script setup>
import { onActivated, onDeactivated } from "vue";
onActivated(() => {
  console.log("activated child1 test");
});
onDeactivated(() => {
  console.log("deactivated child1 test");
});
</script>
