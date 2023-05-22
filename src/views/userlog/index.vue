<script setup lang="ts">
import { computed, ref } from "vue";

interface User {
  date: string;
  name: string;
  address: string;
  ip: string;
}

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const tableData: User[] = [
  {
    date: "2023-05-03 12:05:26",
    name: "admin",
    address: "重庆市",
    ip: "103.168.155.41"
  },
  {
    date: "2023-05-02 15:15:26",
    name: "admin",
    address: "广东省",
    ip: "103.168.155.31"
  }
];
defineOptions({
  name: "UserLog"
});
</script>

<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="时间" prop="date" />
      <el-table-column label="用户" prop="name" />
      <el-table-column label="地址" prop="address" />
      <el-table-column label="IP" prop="ip" />
    </el-table>
  </div>
</template>

<style scoped></style>
