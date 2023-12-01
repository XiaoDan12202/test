<template>
  <div>
    下面是子应用form
    <micro-app
      iframe
      name="form"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
      @datachange="handleDataChange"
      url="http://localhost:3004"
    >
    </micro-app>
  </div>
</template>

<script>
export default {
  name: "form",
  data() {
    return {
      microAppData: { msg: "来自基座的数据" }
    };
  },
  methods: {
    handleCreate() {
      console.log("child-vue3 创建了");
    },

    handleBeforeMount() {
      console.log("child-vue3 即将被渲染");
    },

    handleMount() {
      console.log("child-vue3 已经渲染完成");

      setTimeout(() => {
        // @ts-ignore
        this.microAppData = { msg: "来自基座的新数据" };
      }, 2000);
    },

    handleUnmount() {
      console.log("child-vue3 卸载了");
    },

    handleError() {
      console.log("child-vue3 加载出错了");
    },

    handleDataChange(e) {
      console.log("来自子应用 form 的数据:", e.detail.data);
      const data = e.detail.data;
      if (data.myname === "form" && data.path) {
        this.$router.push({
          path: data.path,
          query: data.params || {}
        });
      }
    }
  }
};
</script>

<style></style>
