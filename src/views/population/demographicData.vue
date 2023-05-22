<template>
  <div>
    <!-- 人口数据：显示城市人口数据，包括人口数量、年龄结构、性别比例、教育程度、就业情况等 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">手动添加</el-button>
      <el-button color="#626aef" plain @click="handleAddByExcel()"
        >excel文件上传</el-button
      >
    </div>

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="身份证">
        <template #default="scope">
          <div class="userId">{{ scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column label="教育程度" prop="education" />
      <el-table-column label="居住地" prop="address" />
      <el-table-column label="户籍" prop="register" />
      <el-table-column label="职业" prop="career" />
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

interface User {
  name: string;
  id: string;
  age: number;
  sex: string;
  education: string;
  address: string;
  register: string;
  career: string;
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
const handleAddByExcel = () => {
  alert("excel上传");
};

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    name: "廖飞",
    id: "500235199902021052",
    age: 24,
    sex: "男",
    education: "本科",
    address: "渝北区",
    register: "重庆市",
    career: "程序员"
  },
  {
    name: "黄飞鸿",
    id: "500235200104021152",
    age: 22,
    sex: "男",
    education: "本科",
    address: "渝北区",
    register: "广东省",
    career: "程序员"
  },
  {
    name: "渣渣汇",
    id: "500235200004121156",
    age: 23,
    sex: "男",
    education: "硕士",
    address: "渝北区",
    register: "福建省",
    career: "学生"
  }
];
defineOptions({
  name: "PeopleData"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}

.userId {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
