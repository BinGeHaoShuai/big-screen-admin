export default {
  path: "/env",
  redirect: "/env/data",
  meta: {
    icon: "informationLine",
    title: "环境管理",
    rank: 4
  },
  children: [
    {
      path: "/env/data",
      name: "EnvData",
      component: () => import("@/views/environment/environmentalData.vue"),
      meta: {
        title: "环境数据"
      }
    },
    {
      path: "/env/envDistribution",
      name: "EnvDistribution",
      component: () => import("@/views/environment/distribution.vue"),
      meta: {
        title: "污染源分布"
      }
    }
  ]
} as RouteConfigsTable;
