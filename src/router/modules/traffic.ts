export default {
  path: "/traffic",
  redirect: "/traffic/monitor",
  meta: {
    icon: "informationLine",
    title: "城市交通",
    rank: 2
  },
  children: [
    {
      path: "/traffic/monitor",
      name: "Monitor",
      component: () => import("@/views/traffic/monitor.vue"),
      meta: {
        title: "道路监控"
      }
    },
    {
      path: "/traffic/trafficFlow",
      name: "TrafficFlow",
      component: () => import("@/views/traffic/trafficFlow.vue"),
      meta: {
        title: "交通流量"
      }
    }
  ]
} as RouteConfigsTable;
