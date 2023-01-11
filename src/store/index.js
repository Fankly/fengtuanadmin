import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import users from "./module/users";
import orders from "./module/orders";
import auths from "./module/auths";
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    orders,
    auths,
  },
});
