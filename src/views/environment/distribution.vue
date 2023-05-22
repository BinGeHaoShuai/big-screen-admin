<template>
  <div>
    <!-- 污染源分布情况:包括工厂、汽车、河流等。 -->
    <env-echarts />
  </div>
</template>

<script lang="ts" setup>
import envEcharts from "./components/envEcharts.vue";
defineOptions({
  name: "EnvDistribution"
});
</script>

<style lang="scss" scoped></style>
