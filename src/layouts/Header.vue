<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global" />
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN">中文</a-menu-item>
        <a-menu-item key="enUS">english</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    localeChange({ key }) {
      this.$router.push({ query: { ...this.$route.query, locale: key } });
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  float: right;
  margin-right: 30px;
}
</style>
