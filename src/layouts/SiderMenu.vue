<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
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
// const SubMenu = {
//   template: `
//       <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
//         <span slot="title">
//           <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
//         </span>
//         <template v-for="item in menuInfo.children">
//           <a-menu-item v-if="!item.children" :key="item.key">
//             <a-icon type="pie-chart" />
//             <span>{{ item.title }}</span>
//           </a-menu-item>
//           <sub-menu v-else :key="item.key" :menu-info="item" />
//         </template>
//       </a-sub-menu>
//     `,
//   name: "SubMenu",
//   // must add isSubMenu: true
//   isSubMenu: true,
//   props: {
//     ...Menu.SubMenu.props,
//     // Cannot overlap with properties within Menu.SubMenu.props
//     menuInfo: {
//       type: Object,
//       default: () => ({})
//     }
//   }
// };
export default {
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData
    };
  },
  components: {
    "sub-menu": SubMenu
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // 处理路由，根据实际情况再做改动
    getMenuData(routes) {
      const menuData = [];
      routes.forEach(element => {
        if (element.name && !element.hideInMenu) {
          const newItem = { ...element };
          delete newItem.children;
          if (element.children && !element.hideChildrenInMenu) {
            newItem.children = this.getMenuData(element.children);
          }
          menuData.push(newItem);
        } else if (
          !element.hideInMenu &&
          !element.hideChildrenInMenu &&
          element.children
        ) {
          // 递归children
          menuData.push(...this.getMenuData(element.children));
        }
      });
      return menuData;
    }
  }
};
</script>
