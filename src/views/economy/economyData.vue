<template>
  <div>
    <!-- 城市经济数据:如地区生产总值、经济结构、就业情况、物价水平等。经济排名 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">手动添加</el-button>
      <el-button color="#626aef" plain @click="handleAddByExcel()"
        >excel文件上传</el-button
      >
    </div>

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="地区" prop="address" />
      <el-table-column label="GDP同比（年度）" prop="gdp_growth" />
      <el-table-column label="财政收入（亿）" prop="revenue" />
      <el-table-column label="财政支出（亿）" prop="expenditure" />
      <el-table-column label="人均可支配收入（万）" prop="income" />
      <el-table-column label="人均支出（万）" prop="spend" />
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
        </template>
      </el-table-column>
    </el-table>

    <add-form :isShow="isShow" @hiden="handleAdd" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import addForm from "./components/addForm.vue";

interface Economy {
  address: string;
  gdp_growth: number;
  revenue: number;
  expenditure: number;
  income: number;
  spend: number;
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

const handleEdit = (index: number, row: Economy) => {
  console.log(index, row);
};

const tableData: Economy[] = [
  {
    address: "渝北区",
    gdp_growth: 1.1,
    revenue: 100,
    expenditure: 150,
    income: 3.38,
    spend: 2.46
  },
  {
    address: "渝中区",
    gdp_growth: 1.1,
    revenue: 110,
    expenditure: 140,
    income: 3.31,
    spend: 2.46
  },
  {
    address: "巴南区",
    gdp_growth: 1.1,
    revenue: 130,
    expenditure: 160,
    income: 3.45,
    spend: 2.46
  }
];
defineOptions({
  name: "EconomyData"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
