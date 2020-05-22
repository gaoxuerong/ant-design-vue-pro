import Vue from "vue";
import { Button, Layout, Icon } from "ant-design-vue"; // 按需引入
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
