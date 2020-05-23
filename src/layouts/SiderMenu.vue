<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.key, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from "@/utils/auth";
export default {
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      selectedKeys: this.selectedKeysMap[this.$route.path], // 当前选中的路由二级路由
      openKeys: [], // 数组 eg: ["/", "/dashboard", "/dashboard/analysis"]
      menuData
    };
  },
  components: {
    "sub-menu": SubMenu
  },
  methods: {
    // 处理路由，根据实际情况再做改动
    // 拿到路由菜单[],做递归遍历
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let element of routes) {
        if (element.meta && element.meta.auth && !check(element.meta.auth)) {
          break;
        }
        if (element.name && !element.hideInMenu) {
          this.openKeysMap[element.path] = parentKeys;
          this.selectedKeysMap[element.path] = [selectedKey || element.path];
          const newItem = { ...element };
          delete newItem.children;
          if (element.children && !element.hideChildrenInMenu) {
            newItem.children = this.getMenuData(element.children, [
              ...parentKeys,
              element.path
            ]);
          } else {
            this.getMenuData(
              element.children,
              selectedKey ? parentKeys : [...parentKeys, element.path],
              selectedKey || element.path
            );
          }
          menuData.push(newItem);
        } else if (
          !element.hideInMenu &&
          !element.hideChildrenInMenu &&
          element.children
        ) {
          // 递归children
          menuData.push(
            ...this.getMenuData(element.children, [...parentKeys, element.path])
          );
        }
      }
      return menuData;
    }
  }
};
</script>
