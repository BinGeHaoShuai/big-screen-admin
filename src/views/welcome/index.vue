<script setup lang="ts">
import axios from "axios";
import * as echarts from "echarts";
import { onMounted } from "vue";

// const ROOT_PATH = "https://echarts.apache.org/examples";
type EChartsOption = echarts.EChartsOption;

onMounted(() => {
  const chartDom = document.getElementById("main");
  const myChart = echarts.init(chartDom);

  let option: EChartsOption;

  myChart.showLoading();

  // axios.get("/api/data/asset/geo/HK.json").then((geoJson: any) => {
  axios.get("/datav/areas_v3/bound/500000_full.json").then((geoJson: any) => {
    myChart.hideLoading();

    echarts.registerMap("CQ", geoJson.data);

    myChart.setOption(
      (option = {
        title: {
          text: "重庆市人口密度（2023）"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} (p / km2)"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 800,
          max: 50000,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"]
          }
        },
        series: [
          {
            name: "重庆市人口密度",
            type: "map",
            map: "CQ",
            label: {
              show: true
            },
            data: [
              { name: "万州区", value: 20057.34 },
              { name: "云阳县", value: 15477.48 },
              { name: "渝北区", value: 31686.1 },
              { name: "渝中区", value: 6992.6 },
              { name: "巴南区", value: 44045.49 },
              { name: "涪陵区", value: 40689.64 },
              { name: "九龙城", value: 37659.78 },
              { name: "丰都县", value: 45180.97 },
              { name: "大足区", value: 55204.26 },
              { name: "江津区", value: 21900.9 },
              { name: "忠县", value: 4918.26 },
              { name: "合川区", value: 5881.84 },
              { name: "铜梁区", value: 4178.01 },
              { name: "南川区", value: 2227.92 },
              { name: "垫江县", value: 2180.98 },
              { name: "奉节县", value: 9172.94 },
              { name: "巫溪县", value: 3368 },
              { name: "开州区", value: 806.98 },
              { name: "梁平区", value: 806.98 },
              { name: "城口县", value: 806.98 },
              { name: "巫山县", value: 1000 },
              { name: "黔江区", value: 8000 },
              { name: "长寿区", value: 4000 },
              { name: "武隆区", value: 6000 },
              { name: "永川区", value: 7000 },
              { name: "荣昌区", value: 10000 },
              { name: "潼南区", value: 13000 },
              { name: "綦江区", value: 5000 },
              { name: "璧山区", value: 1500 },
              { name: "九龙坡区", value: 10000 },
              { name: "沙坪坝区", value: 10000 },
              { name: "江北区", value: 20000 },
              { name: "北碚区", value: 15000 },
              { name: "南岸区", value: 20000 },
              { name: "酉阳土家族苗族自治县", value: 1200 },
              { name: "秀山土家族苗族自治县", value: 600 },
              { name: "石柱土家族自治县", value: 500 },
              { name: "彭水苗族土家族自治县", value: 2100 }
            ],
            // 自定义名称映射
            nameMap: {}
          }
        ]
      })
    );
  });

  option && myChart.setOption(option);
});
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <div style="padding: 5px">
    <div id="main" />
  </div>
</template>

<style scoped>
#main {
  display: flex;
  justify-content: center;
  width: auto;
  height: 610px;
}
</style>
