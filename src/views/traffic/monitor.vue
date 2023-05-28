<template>
  <div>
    <!-- 道路监控 -->
    <div class="add-button">
      <el-button type="primary" @click="shiftShowEdit()">手动添加</el-button>
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

    <add-monitor :isShow="isShow" @hiden="shiftShowAdd" @addData="addData" />
    <edit-monitor
      :editData="editData"
      :isShow="isShowEdit"
      @hiden="shiftShowEdit"
      @changeData="changeData"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import addMonitor from "./components/addMonitor.vue";
import editMonitor from "./components/editMonitor.vue";

interface User {
  id: number;
  county: string;
  town: string;
  longitude: string;
  latitude: string;
  state: string;
}

const search = ref("");

const editData = reactive({
  id: 0,
  county: "",
  town: "",
  longitude: "",
  latitude: ""
});

const handleEdit = (index: number, user: User) => {
  // console.log(index, user);
  editData.id = user.id;
  editData.county = user.county;
  editData.town = user.town;
  editData.longitude = user.longitude;
  editData.latitude = user.latitude;
  shiftShowEdit();
};

const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.county.toLowerCase().includes(search.value.toLowerCase())
  )
);

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
      tableData[index].county = data.county;
      tableData[index].town = data.town;
      tableData[index].longitude = data.longitude;
      tableData[index].latitude = data.latitude;
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

const tableData: User[] = reactive([
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
]);
defineOptions({
  name: "Monitor"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
