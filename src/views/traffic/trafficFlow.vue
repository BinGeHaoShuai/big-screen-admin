<template>
  <div>
    <!-- 交通流量：显示各地段的交通拥堵情况，包括车流量、车速、拥堵长度等 -->
    <div class="add-button">
      <el-button type="primary" @click="shiftShowAdd()">手动添加</el-button>
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

    <add-traffic-flow
      :isShow="isShow"
      @hiden="shiftShowAdd"
      @addData="addData"
    />
    <edit-traffic-flow
      :editData="editData"
      :isShow="isShowEdit"
      @hiden="shiftShowEdit"
      @changeData="changeData"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import addTrafficFlow from "./components/addTrafficFlow.vue";
import editTrafficFlow from "./components/editTrafficFlow.vue";

interface Traffic {
  id: number;
  county: string;
  town: string;
  cars: number;
  jam: string;
  accident: number;
}

const search = ref("");

const editData = reactive({
  id: 0,
  county: "",
  town: "",
  cars: 0,
  jam: "",
  accident: 0
});

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

const handleEdit = (index: number, user: User) => {
  // console.log(index, user);
  editData.id = user.id;
  editData.county = user.county;
  editData.town = user.town;
  editData.cars = user.cars;
  editData.jam = user.jam;
  editData.accident = user.accident;
  shiftShowEdit();
};

//按条件查找
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.county.toLowerCase().includes(search.value.toLowerCase())
  )
);

//添加表单数据
const addData = data => {
  console.log(data, 123);
  data.id = tableData.length + 1;
  tableData.push(data);
};
//修改表单数据
const changeData = data => {
  tableData.map((item, index) => {
    if (item.id === data.id) {
      tableData[index].county = data.county;
      tableData[index].town = data.town;
      tableData[index].cars = data.cars;
      tableData[index].jam = data.jam;
      tableData[index].accident = data.accident;
    }
  });
};
//删除数据
const handleDelete = (index: number, row: User) => {
  tableData.map((item, index) => {
    if (item.id === row.id) {
      tableData.splice(index, 1);
    }
  });
};

const tableData: Traffic[] = reactive([
  {
    id: 0,
    county: "渝北区",
    town: "龙兴古镇",
    cars: 10000,
    jam: "良好",
    accident: 0
  },
  {
    id: 1,
    county: "江北区",
    town: "江北镇",
    cars: 20000,
    jam: "良好",
    accident: 1
  }
]);

defineOptions({
  name: "TrafficFlow"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
