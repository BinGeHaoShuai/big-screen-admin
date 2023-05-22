<template>
  <div>
    <!-- 权限管理页面 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
    </div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="角色" prop="rank" />
      <el-table-column label="姓名" prop="name" />
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

defineOptions({
  name: "Authority"
});

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
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
//是否显示添加人员表格
const isShow = ref<boolean>(false);
const handleAdd = () => {
  isShow.value = !isShow.value;
};
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    rank: "超级管理员",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    rank: "普通管理员",
    name: "John",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    rank: "普通管理员",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    rank: "普通管理员",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles"
  }
];
</script>

<style scoped>
.add-button {
  padding: 10px;
}
</style>
