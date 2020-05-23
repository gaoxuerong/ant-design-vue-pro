import Vue from "vue";
import { Button, Layout, Icon, Drawer, Radio, Menu } from "ant-design-vue"; // 按需引入

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Auth from "@/components/Auth";
import AUTH from "@/directives/auth";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component("Auth", Auth); // 注册全局组件
Vue.use(AUTH); // 注册全局指令

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
