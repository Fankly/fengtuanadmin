import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 配置 ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

// 导入混入
import "@/utils/mixins";
//导入过滤器
import "@/utils/filters";
//导入自定义命令
import "@/utils/directives";
//导入自定义公共组件
import qfCard from "@/components/qf-card/Index";

import qfForm from "@/components/qf-form/Index";

import qfTable from "@/components/qf-table/Index";

// VUe.use使用可以解决重复定义,增强代码可读性
Vue.use((Vue) => {
  Vue.component("qf-card", qfCard);
  Vue.component("qf-table", qfTable);
  Vue.component("qf-form", qfForm);
});

import "@/permission";

//导入qfTable公共组件
/*import qfTable from "@/components/qf-table/Index";

Vue.use((Vue) => {
  Vue.component("qf-table", qfTable);
});*/
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
