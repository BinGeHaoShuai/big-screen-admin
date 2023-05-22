export default {
  path: "/userlog",
  redirect: "/userlog/index",
  meta: {
    icon: "informationLine",
    title: "日志监控",
    rank: 6
  },
  children: [
    {
      path: "/userlog/index",
      name: "UserLog",
      component: () => import("@/views/userlog/index.vue"),
      meta: {
        title: "日志监控"
      }
    }
  ]
} as RouteConfigsTable;
