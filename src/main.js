import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
import Vant from "vant";
import "vant/lib/index.less";
import TouTiaoIcon from "@/components/TouTiaoIcon";
import "amfe-flexible";
// 测试接口是否有用
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});
Vue.use(Vant);
Vue.component("TouTiaoIcon", TouTiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
