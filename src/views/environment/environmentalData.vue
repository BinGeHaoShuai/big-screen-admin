<template>
  <div>
    <!-- 环境数据:包括空气质量、水质量、噪声、温度、湿度等。 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">手动添加</el-button>
      <el-button color="#626aef" plain @click="handleAddByExcel()"
        >excel文件上传</el-button
      >
    </div>

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="地区" prop="address" />
      <el-table-column label="温度(°C)" prop="temp" />
      <el-table-column label="湿度(%)" prop="humidity" />
      <el-table-column label="降雨量(毫米)" prop="rainfall" />
      <el-table-column label="空气质量" prop="air" />
      <el-table-column label="水质量" prop="water" />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="address to search"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
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

interface Evn {
  address: string;
  temp: number;
  humidity: number;
  rainfall: number;
  air: string;
  water: string;
}

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.address.toLowerCase().includes(search.value.toLowerCase())
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

const handleEdit = (index: number, row: Evn) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Evn) => {
  console.log(index, row);
};

const tableData: Evn[] = [
  {
    address: "渝北区",
    temp: 30,
    humidity: 59,
    rainfall: 96.1,
    air: "优",
    water: "优"
  },
  {
    address: "渝中区",
    temp: 35,
    humidity: 50,
    rainfall: 80.1,
    air: "中度",
    water: "中度"
  },
  {
    address: "巴南区",
    temp: 32,
    humidity: 59,
    rainfall: 96.1,
    air: "优",
    water: "优"
  }
];
defineOptions({
  name: "EnvData"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
