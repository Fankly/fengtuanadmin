import {
  postLoginApi,
  postMobileApi,
  postSmsAPi,
  postTokenAPi,
} from "@/api/login";

export default {
  namespaced: true,
  state: {
    uname: localStorage.getItem("uname") || "",
    roleName: localStorage.getItem("roleName") || "",
    token: localStorage.getItem("token") || "",
    mobile: "",
  },
  getters: {},
  mutations: {
    USER_LOGIN(state, payload) {
      state.uname = payload.uname;
      state.token = payload.token;
      state.roleName = payload.roleName;
      localStorage.setItem("uname", state.uname);
      localStorage.setItem("roleName", state.roleName);
      localStorage.setItem("token", state.token);
    },
    MOBILE_SEND_SMS(state, payload) {
      state.mobile = payload.mobile;
    },
  },
  actions: {
    async MB_USERS_LOGIN(context, payload) {
      let res = await postLoginApi(payload);
      if (res.meta.state === 200) {
        context.commit("USER_LOGIN", res.data);
      }
      return res;
    },
    async MOBILE_USERS_LOGIN(context, payload) {
      let res = await postMobileApi(payload);
      if (res.meta.state === 200) {
        context.commit("USER_LOGIN", res.data);
      }
      return res;
    },
    async MOBILE_USERS_TOKEN(context, payload) {
      let res = await postTokenAPi(payload);
      if (res.meta.state === 200) {
        context.commit("USER_LOGIN", res.data);
      }
      return res;
    },
    async MOBILE_SEND(context, payload) {
      let res = await postSmsAPi(payload);
      if (res.meta.state === 200) {
        context.commit("MOBILE_SEND_SMS", res.data);
      }
      return res;
    },
  },
};
