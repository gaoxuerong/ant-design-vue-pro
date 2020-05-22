<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <template>
        <h2>整体风格定制</h2>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          v-model="navTheme"
          @change="e => onChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">dark</a-radio>
          <a-radio value="light">light</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          v-model="navLayout"
          @change="e => onChange('navLayout', e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </template>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "dark",
      navLayout: "left"
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>
<style lang="less" scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  height: 48px;
  width: 48px;
  background: #1890ff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 3px 0;
  cursor: pointer;
}
</style>
