<template>
  <div>
    <!-- 城市经济数据:如地区生产总值、经济结构、就业情况、物价水平等。经济排名 -->
    <div class="add-button">
      <el-button type="primary" @click="shiftShowAdd()">手动添加</el-button>
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
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <add-economy :isShow="isShow" @hiden="shiftShowAdd" @addData="addData" />
    <edit-economy
      :editData="editData"
      :isShow="isShowEdit"
      @hiden="shiftShowEdit"
      @changeData="changeData"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import addEconomy from "./components/addEconomy.vue";
import editEconomy from "./components/editEconomy.vue";

interface Economy {
  id: number;
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
const editData = reactive({
  id: 0,
  address: "",
  gdp_growth: 0,
  revenue: 0,
  expenditure: 0,
  income: 0,
  spend: 0
});

const handleEdit = (index: number, user: User) => {
  // console.log(index, user);
  editData.id = user.id;
  editData.address = user.address;
  editData.gdp_growth = user.gdp_growth;
  editData.revenue = user.revenue;
  editData.expenditure = user.expenditure;
  editData.income = user.income;
  editData.spend = user.spend;
  shiftShowEdit();
};

//是否显示添加表格
const isShow = ref<boolean>(false);
const isShowEdit = ref<boolean>(false);

const shiftShowAdd = () => {
  isShow.value = !isShow.value;
};
const shiftShowEdit = () => {
  isShowEdit.value = !isShowEdit.value;
};

const handleAddByExcel = () => {
  alert("excel上传");
};

//添加表单数据
const addData = data => {
  data.id = tableData.length + 1;
  tableData.push(data);
};
const changeData = data => {
  tableData.map((item, index) => {
    if (item.id === data.id) {
      tableData[index].address = data.address;
      tableData[index].gdp_growth = data.gdp_growth;
      tableData[index].revenue = data.revenue;
      tableData[index].expenditure = data.expenditure;
      tableData[index].income = data.income;
      tableData[index].spend = data.spend;
    }
  });
};

const handleDelete = (index: number, row: User) => {
  tableData.map((item, index) => {
    if (item.id === row.id) {
      tableData.splice(index, 1);
    }
  });
};

const tableData: Economy[] = reactive([
  {
    id: 1,
    address: "渝北区",
    gdp_growth: 1.1,
    revenue: 100,
    expenditure: 150,
    income: 3.38,
    spend: 2.46
  },
  {
    id: 2,
    address: "渝中区",
    gdp_growth: 1.1,
    revenue: 110,
    expenditure: 140,
    income: 3.31,
    spend: 2.46
  },
  {
    id: 3,
    address: "巴南区",
    gdp_growth: 1.1,
    revenue: 130,
    expenditure: 160,
    income: 3.45,
    spend: 2.46
  }
]);
defineOptions({
  name: "EconomyData"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
