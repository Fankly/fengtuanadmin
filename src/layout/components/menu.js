export default [
  {
    name: "后台首页",
    children: [
      { name: "欢迎页", path: "/Welcome" },
      { name: "访客记录", path: "/users/history" },
    ],
  },
  {
    name: "分类管理",
    children: [
      { name: "分类列表", path: "/cates" },
      { name: "分类创建", path: "/cates/create" },
    ],
  },
  {
    name: "门店管理",
    children: [
      { name: "门店列表", path: "/stores" },
      { name: "门店创建", path: "/stores/create" },
    ],
  },
  {
    name: "商品管理",
    children: [
      { name: "商品列表", path: "/goods" },
      { name: "商品创建", path: "/goods/create" },
    ],
  },
  {
    name: "订单管理",
    children: [
      { name: "订单列表", path: "/orders" },
      { name: "订单统计", path: "/orders/total" },
    ],
  },
  {
    name: "用户管理",
    children: [
      { name: "用户列表", path: "/users" },
      { name: "用户创建", path: "/users/create" },
    ],
  },
  {
    name: "角色管理",
    children: [
      { name: "角色列表", path: "/roles" },
      { name: "角色创建", path: "/roles/create" },
    ],
  },
  {
    name: "权限管理",
    children: [
      { name: "权限列表", path: "/auths" },
      { name: "权限创建", path: "/auths/create" },
    ],
  },
];
