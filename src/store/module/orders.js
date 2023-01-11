import { totalOrdersApi } from "@/api/orders";

export default {
  namespaced: true,
  state: {
    consignee: "",
    startTime: "",
    end_time: "",
  },
  getters: {},
  mutations: {
    TOTAL_ORDERS(state, payload) {
      state.consignee = payload.consignee;
      state.startTime = payload.startTime;
      state.end_time = payload.end_time;
    },
  },
  actions: {
    async TOTAL_ORDERS_API(context, payload) {
      let res = await totalOrdersApi(payload);
      if (res.meta.state === 200) {
        context.commit("TOTAL_ORDERS", res.data);
      }
      return res;
    },
  },
};
