const Layout = () => import("@/layout/index.vue");

export default {
  path: "/authority",
  name: "AuthorityRank",
  component: Layout,
  redirect: "/authority/index",
  meta: {
    icon: "lollipop",
    title: "权限管理",
    rank: 1
  },
  children: [
    {
      path: "/authority/index",
      name: "Authority",
      component: () => import("@/views/authority/index.vue"),
      meta: {
        title: "权限管理"
      }
    }
  ]
} as RouteConfigsTable;
