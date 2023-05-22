<template>
  <div id="main" style="width: auto; height: 600px" />
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

type EChartsOption = echarts.EChartsOption;
onMounted(() => {
  const chartDom = document.getElementById("main");
  const myChart = echarts.init(chartDom);

  const option: EChartsOption = {
    title: {
      text: "重庆各地区工厂数"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: "category",
      data: [
        "渝北区",
        "巴南区",
        "永川区",
        "万州区",
        "黔江区",
        "巫山县",
        "云阳县",
        "合川区",
        "荣昌区",
        "南川区"
      ]
    },
    series: [
      {
        name: "2023年",
        type: "bar",
        data: [230, 350, 150, 300, 100, 120, 90, 160, 198, 221]
      }
    ]
  };

  option && myChart.setOption(option);
});
</script>

<style lang="scss" scoped></style>
