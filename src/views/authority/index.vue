<template>
  <div>
    <!-- 权限管理页面 -->
    <div class="add-button">
      <el-button type="primary" @click="shiftShow()">添加</el-button>
    </div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="角色" prop="rank" />
      <el-table-column label="姓名" prop="name" />
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

    <add-form :isShow="isShow" @hiden="shiftShow" @add="addData" />
    <edit-form
      :editData="editData"
      :isShow="isShowEdit"
      @hiden="shiftShowEdit"
      @editConfirm="editConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import addForm from "./components/addForm.vue";
import editForm from "./components/editForm.vue";

defineOptions({
  name: "Authority"
});

interface User {
  rank: number;
  name: string;
  pwd: string;
}

const search = ref("");
const editData = reactive({ rank: "普通管理员", name: "", pwd: "" });

const tableData: User[] = reactive([
  {
    rank: "超级管理员",
    name: "admin",
    pwd: "123456"
  },
  {
    rank: "普通管理员",
    name: "John",
    pwd: "123456"
  },
  {
    rank: "普通管理员",
    name: "Morgan",
    pwd: "123456"
  },
  {
    rank: "普通管理员",
    name: "Jessy",
    pwd: "123456"
  }
]);
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
//是否显示添加人员表格
const isShow = ref<boolean>(false);
const isShowEdit = ref<boolean>(false);
//切换显示
const shiftShow = () => {
  isShow.value = !isShow.value;
};
const shiftShowEdit = () => {
  isShowEdit.value = !isShowEdit.value;
};
//添加表单数据
const addData = data => {
  tableData.push(data);
};

/**
 * 编辑user信息
 * @param index 编辑对象下标
 * @param user 被编辑用户
 */
const handleEdit = (index: number, user: User) => {
  // console.log(index, user);
  editData.name = user.name;
  editData.pwd = user.pwd;
  shiftShowEdit();
};

const editConfirm = (user: User) => {
  tableData.map((item, index) => {
    if (item.name === user.name) {
      tableData[index].pwd = user.pwd;
    }
  });
};

const handleDelete = (index: number, row: User) => {
  // console.log(index, row);
  tableData.map((item, index) => {
    if (item.name === row.name) {
      tableData.splice(index, 1);
    }
  });
};
</script>

<style scoped>
.add-button {
  padding: 10px;
}
</style>
