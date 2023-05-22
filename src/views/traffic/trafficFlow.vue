<template>
  <div>
    <!-- 交通流量：显示各地段的交通拥堵情况，包括车流量、车速、拥堵长度等 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">手动添加</el-button>
      <el-button color="#626aef" plain @click="handleAddByExcel()"
        >excel文件上传</el-button
      >
    </div>

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="区县" prop="county" />
      <el-table-column label="城镇" prop="town" />
      <el-table-column label="车数" prop="cars" />
      <el-table-column label="拥堵情况" prop="jam" />
      <el-table-column label="交通事故" prop="accident" />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="name to search"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <add-form :isShow="isShow" @hiden="handleAdd" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import addForm from "./components/addForm.vue";

interface Traffic {
  county: string;
  town: string;
  cars: number;
  jam: string;
  accident: number;
}

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.county.toLowerCase().includes(search.value.toLowerCase())
  )
);
//是否显示添加人员表格
const isShow = ref<boolean>(false);
const handleAdd = () => {
  isShow.value = !isShow.value;
};
const handleAddByExcel = () => {
  alert("excel上传");
};

const handleEdit = (index: number, row: Traffic) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Traffic) => {
  console.log(index, row);
};

const tableData: Traffic[] = [
  {
    county: "渝北区",
    town: "龙兴古镇",
    cars: 10000,
    jam: "良好",
    accident: 0
  }
];

defineOptions({
  name: "TrafficFlow"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
