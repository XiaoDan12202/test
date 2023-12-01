<template>
  <div>
    <router-link to="/test">test</router-link>
    <br />
    <router-link to="/">home</router-link>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
