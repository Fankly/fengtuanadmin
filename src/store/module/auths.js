import { getMenuApi } from "@/api/auths";
import router from "@/router";
export default {
  namespaced: true,
  state: {
    menu: [],
  },
  mutations: {
    MENU_AUTHS_SHOW(state, payload) {
      // 1 保存数据
      //   state.menu = payload ? payload : [];
      state.menu = payload || [];
      // 2 动态路由
      payload.forEach((oneMenu) => {
        if (oneMenu.children && oneMenu.children.length > 0) {
          oneMenu.children.forEach((twoMenu) => {
            router.addRoute("admin", {
              path: twoMenu.url,
              component: () => import("@/views/" + twoMenu.component),
              meta: {
                name1: twoMenu.auth_pname,
                name2: twoMenu.auth_name,
                keep_alive: twoMenu.keep_alive,
              },
            });
          });
        }
      });

      router.addRoute({
        path: "*",
        component: () => import("@/views/404"),
      });
    },
  },
  actions: {
    async MENU_SHOW(context) {
      let res = await getMenuApi();
      context.commit("MENU_AUTHS_SHOW", res.data);
    },
  },
};
