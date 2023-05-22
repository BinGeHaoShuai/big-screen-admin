<template>
  <div>
    <!-- 道路监控 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">手动添加</el-button>
      <el-button color="#626aef" plain @click="handleAddByExcel()"
        >excel文件上传</el-button
      >
    </div>

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="摄像头ID" prop="id" />
      <el-table-column label="区县" prop="county" />
      <el-table-column label="城镇" prop="town" />
      <el-table-column label="经度" prop="longitude" />
      <el-table-column label="纬度" prop="latitude" />
      <el-table-column label="状态" prop="state" />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="name to search"
          />
        </template>
        <template #default="scope">
          <div style="display: flex">
            <el-button size="small" type="primary">查看</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <add-form :isShow="isShow" @hiden="handleAdd" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import addForm from "./components/addForm.vue";

interface User {
  date: string;
  name: string;
  address: string;
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

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    id: 1,
    county: "渝北区",
    town: "龙兴古镇",
    longitude: "131.22",
    latitude: "36.11",
    state: "正常"
  },
  {
    id: 2,
    county: "渝北区",
    town: "沙坪镇",
    longitude: "121.22",
    latitude: "26.31",
    state: "故障"
  }
];
defineOptions({
  name: "Monitor"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
