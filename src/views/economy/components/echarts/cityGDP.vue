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
      text: "重庆市GDP"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022"
      ]
    },
    yAxis: {
      name: "万亿",
      type: "value"
    },
    series: [
      {
        name: "重庆市",
        type: "line",
        stack: "Total",
        data: [
          0.67, 0.81, 1.02, 1.16, 1.3, 1.46, 1.6, 1.8, 2.01, 2.16, 2.36, 2.5,
          2.81, 2.91
        ]
      }
    ]
  };

  option && myChart.setOption(option);
});
</script>

<style lang="scss" scoped></style>
