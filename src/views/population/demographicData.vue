<template>
  <div>
    <!-- 人口数据：显示城市人口数据，包括人口数量、年龄结构、性别比例、教育程度、就业情况等 -->
    <div class="add-button">
      <el-button type="primary" @click="shiftShowAdd()">手动添加</el-button>
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

    <add-person :isShow="isShow" @hiden="shiftShowAdd" @addData="addData" />
    <edit-person
      :editData="editData"
      :isShow="isShowEdit"
      @hiden="shiftShowEdit"
      @changeData="changeData"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import addPerson from "./components/addPerson.vue";
import editPerson from "./components/editPerson.vue";

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
const editData = reactive({
  name: "",
  id: "",
  age: 0,
  sex: "",
  education: "",
  address: "",
  register: "",
  career: ""
});

const handleEdit = (index: number, user: User) => {
  // console.log(index, user);
  editData.id = user.id;
  editData.name = user.name;
  editData.age = user.age;
  editData.sex = user.sex;
  editData.education = user.education;
  editData.address = user.address;
  editData.register = user.register;
  editData.career = user.career;
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
      tableData[index].name = data.name;
      tableData[index].age = data.age;
      tableData[index].sex = data.sex;
      tableData[index].education = data.education;
      tableData[index].address = data.address;
      tableData[index].register = data.register;
      tableData[index].career = data.career;
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
]);
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
