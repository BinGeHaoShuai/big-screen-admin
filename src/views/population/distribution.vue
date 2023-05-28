<template>
  <div>
    <!-- 人口分布：显示人口分布情况，包括人口密度、人口聚集区、人口流动方向等 -->
    <div class="add-button">
      <el-button type="primary" @click="shiftShowAdd()">手动添加</el-button>
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

    <add-distribution
      :isShow="isShow"
      @hiden="shiftShowAdd"
      @addData="addData"
    />
    <edit-distribution
      :editData="editData"
      :isShow="isShowEdit"
      @hiden="shiftShowEdit"
      @changeData="changeData"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import addDistribution from "./components/addDistribution.vue";
import editDistribution from "./components/editDistribution.vue";

interface County {
  id: number;
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

const editData = reactive({
  id: 0,
  address: "",
  population: 0,
  changes: 0,
  income: 0,
  sex_ratio: ""
});

const handleEdit = (index: number, user: User) => {
  // console.log(index, user);
  editData.id = user.id;
  editData.address = user.address;
  editData.population = user.population;
  editData.changes = user.changes;
  editData.income = user.income;
  editData.sex_ratio = user.sex_ratio;
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
      tableData[index].population = data.population;
      tableData[index].changes = data.changes;
      tableData[index].income = data.income;
      tableData[index].sex_ratio = data.sex_ratio;
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

const tableData: County[] = reactive([
  {
    id: 1,
    address: "渝北区",
    population: 125220,
    changes: 3000,
    income: 10000,
    sex_ratio: "12/11"
  },
  {
    id: 2,
    address: "渝中区",
    population: 136220,
    changes: -1000,
    income: 12000,
    sex_ratio: "15/11"
  },
  {
    id: 3,
    address: "巴南区",
    population: 131115,
    changes: 3500,
    income: 9500,
    sex_ratio: "16/15"
  }
]);
defineOptions({
  name: "PeopleDistribution"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
