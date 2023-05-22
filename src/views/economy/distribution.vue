<template>
  <div>
    <!-- 城市经济分布情况:如商业区、工业区、农业区等。 -->
    <cityGDP />
  </div>
</template>

<script lang="ts" setup>
import cityGDP from "./components/echarts/cityGDP.vue";
defineOptions({
  name: "EconomyDistribution"
});
</script>

<style lang="scss" scoped></style>
