export default {
  path: "/economy",
  redirect: "/economy/data",
  meta: {
    icon: "informationLine",
    title: "城市经济",
    rank: 5
  },
  children: [
    {
      path: "/economy/data",
      name: "EconomyData",
      component: () => import("@/views/economy/economyData.vue"),
      meta: {
        title: "经济数据"
      }
    },
    {
      path: "/economy/distribution",
      name: "EconomyDistribution",
      component: () => import("@/views/economy/distribution.vue"),
      meta: {
        title: "经济分布"
      }
    },
    {
      path: "/economy/policy",
      name: "Policy",
      component: () => import("@/views/economy/policy.vue"),
      meta: {
        title: "经济政策"
      }
    }
  ]
} as RouteConfigsTable;
