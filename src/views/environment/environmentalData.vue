<template>
  <div>
    <!-- 环境数据:包括空气质量、水质量、噪声、温度、湿度等。 -->
    <div class="add-button">
      <el-button type="primary" @click="shiftShowAdd()">手动添加</el-button>
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

    <add-env :isShow="isShow" @hiden="shiftShowAdd" @addData="addData" />
    <edit-env
      :editData="editData"
      :isShow="isShowEdit"
      @hiden="shiftShowEdit"
      @changeData="changeData"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import addEnv from "./components/addEnv.vue";
import editEnv from "./components/editEnv.vue";

interface Evn {
  id: number;
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

const editData = reactive({
  id: 0,
  address: "",
  temp: 0,
  humidity: 0,
  rainfall: 0,
  air: "",
  water: ""
});

//是否显示添加表格
const isShow = ref<boolean>(false);
const isShowEdit = ref<boolean>(false);

const handleEdit = (index: number, data: User) => {
  // console.log(index, user);
  editData.id = data.id;
  editData.address = data.address;
  editData.temp = data.temp;
  editData.humidity = data.humidity;
  editData.rainfall = data.rainfall;
  editData.air = data.air;
  editData.water = data.water;
  shiftShowEdit();
};

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
      tableData[index].temp = data.temp;
      tableData[index].humidity = data.humidity;
      tableData[index].rainfall = data.rainfall;
      tableData[index].air = data.air;
      tableData[index].water = data.water;
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

const tableData: Evn[] = reactive([
  {
    id: 1,
    address: "渝北区",
    temp: 30,
    humidity: 59,
    rainfall: 96.1,
    air: "优",
    water: "优"
  },
  {
    id: 2,
    address: "渝中区",
    temp: 35,
    humidity: 50,
    rainfall: 80.1,
    air: "中度",
    water: "中度"
  },
  {
    id: 3,
    address: "巴南区",
    temp: 32,
    humidity: 59,
    rainfall: 96.1,
    air: "优",
    water: "优"
  }
]);
defineOptions({
  name: "EnvData"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
