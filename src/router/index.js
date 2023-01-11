import Vue from "vue";
import VueRouter from "vue-router";

/* 解决Vue中的同级目录报错的情况 */
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
}; */

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/login/sms",
    component: () => import("@/views/login/components/Sms.vue"),
  },
  {
    path: "/login/token",
    component: () => import("@/views/login/components/Token.vue"),
  },
  {
    name: "admin",
    path: "/",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "welcome",
        alias: "/",
        component: () => import("@/views/Welcome.vue"),
        meta: { name1: "后台首页", name2: "欢迎页" },
      },
      /*
      {
        path: "users/history",
        component: () => import("@/views/users/History.vue"),
        meta: { name1: "后台首页", name2: "访客记录" },
      },
      {
        path: "users",
        component: () => import("@/views/users/Users.vue"),
        meta: { name1: "用户管理", name2: "用户列表" },
      },
      {
        path: "users/create",
        component: () => import("@/views/users/Create.vue"),
        meta: { name1: "用户管理", name2: "用户创建" },
      },
      {
        path: "roles",
        component: () => import("@/views/roles/Roles.vue"),
        meta: { name1: "角色管理", name2: "角色列表" },
      },
      {
        path: "roles/create",
        component: () => import("@/views/roles/Create.vue"),
        meta: { name1: "角色管理", name2: "角色创建" },
      },
      {
        path: "auths",
        component: () => import("@/views/auths/Auths.vue"),
        meta: { name1: "权限管理", name2: "权限列表" },
      },
      {
        path: "auths/create",
        component: () => import("@/views/auths/Create.vue"),
        meta: { name1: "权限管理", name2: "权限创建" },
      },
      {
        path: "cates",
        component: () => import("@/views/cates/Cates.vue"),
        meta: { name1: "分类管理", name2: "分类列表" },
      },
      {
        path: "cates/create",
        component: () => import("@/views/cates/Create.vue"),
        meta: { name1: "分类管理", name2: "分类创建" },
      },
      {
        path: "stores",
        component: () => import("@/views/stores/Stores.vue"),
        meta: { name1: "门店管理", name2: "门店列表" },
      },
      {
        path: "stores/create",
        component: () => import("@/views/stores/Create.vue"),
        meta: { name1: "门店管理", name2: "门店创建" },
      },
      {
        path: "goods",
        component: () => import("@/views/goods/Goods.vue"),
        meta: { name1: "商品管理", name2: "商品列表" },
      },
      {
        path: "goods/create",
        component: () => import("@/views/goods/Create.vue"),
        meta: { name1: "商品管理", name2: "商品创建" },
      },
      {
        path: "orders",
        component: () => import("@/views/orders/Orders.vue"),
        meta: { name1: "订单管理", name2: "订单列表" },
      },
      {
        path: "orders/total",
        component: () => import("@/views/orders/Total.vue"),
        meta: { name1: "订单管理", name2: "订单统计" },
      }, */
      {
        path: "test",
        component: () => import("@/views/test/Test.vue"),
        meta: { name1: "测试管理", name2: "测试列表" },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
