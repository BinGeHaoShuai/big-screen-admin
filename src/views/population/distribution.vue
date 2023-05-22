<template>
  <div>
    <!-- 人口分布：显示人口分布情况，包括人口密度、人口聚集区、人口流动方向等 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">手动添加</el-button>
      <el-button color="#626aef" plain @click="handleAddByExcel()"
        >excel文件上传</el-button
      >
    </div>

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="地区" prop="address" />
      <el-table-column label="人口数" prop="population" />
      <el-table-column label="相比上个月人口变化" prop="changes" />
      <el-table-column label="人均收入（元）" prop="income" />
      <el-table-column label="性别比例（男/女）" prop="sex_ratio" />
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

interface County {
  address: string;
  population: number;
  changes: number;
  income: number;
  sex_ratio: string;
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

const handleEdit = (index: number, row: County) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: County) => {
  console.log(index, row);
};

const tableData: County[] = [
  {
    address: "渝北区",
    population: 125220,
    changes: 3000,
    income: 10000,
    sex_ratio: "12/11"
  },
  {
    address: "渝中区",
    population: 136220,
    changes: -1000,
    income: 12000,
    sex_ratio: "15/11"
  },
  {
    address: "巴南区",
    population: 131115,
    changes: 3500,
    income: 9500,
    sex_ratio: "16/15"
  }
];
defineOptions({
  name: "PeopleDistribution"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
