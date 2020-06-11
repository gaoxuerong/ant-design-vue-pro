<template>
  <div>
    <div>basic form</div>
    <router-link to="step-form/info">baidu</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$router);
    console.log(this.$route);
    console.log(this.$routes);
    console.log("");
    this.$router.push({ path: "step-form/info" });
  }
};
</script>
<style lang="less" scoped></style>
