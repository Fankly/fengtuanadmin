import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";

const whiteList = ["/login", "/404", "/login/sms", "/login/token"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (whiteList.includes(to.path)) {
    next();
  } else {
    const token = store.state.users.token;
    if (token) {
      if (!store.state.auths.menu.length) {
        store.dispatch("auths/MENU_SHOW");
      }
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
