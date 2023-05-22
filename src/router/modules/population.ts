export default {
  path: "/population",
  redirect: "/population/data",
  meta: {
    icon: "informationLine",
    title: "城市人口",
    rank: 3
  },
  children: [
    {
      path: "/population/data",
      name: "PeopleData",
      component: () => import("@/views/population/demographicData.vue"),
      meta: {
        title: "人口数据"
      }
    },
    {
      path: "/population/distribution",
      name: "PeopleDistribution",
      component: () => import("@/views/population/distribution.vue"),
      meta: {
        title: "人口分布"
      }
    }
  ]
} as RouteConfigsTable;
