<template>
  <div class="form" v-if="props.isShow">
    <el-form
      label-position="left"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="User Name">
        <el-input
          placeholder="Please input user name"
          v-model="formLabelAlign.name"
        />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          type="password"
          placeholder="Please input password"
          show-password
          v-model="formLabelAlign.password"
        />
      </el-form-item>
      <el-form-item label="Confirm Pwd">
        <el-input
          type="password"
          placeholder="Please input password again"
          show-password
          v-model="formLabelAlign.confirmPwd"
        />
      </el-form-item>
      <el-form-item label="User Rank">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button @click="handleCancel()">取消</el-button>
      <el-button type="primary" @click="handleAdd">确认</el-button>
    </div>
  </div>
  <div class="mask" v-if="props.isShow" />
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["hiden", "add"]);

const value = ref("");
const options = [
  {
    value: "1",
    label: "超级管理员",
    disabled: true
  },
  {
    value: "2",
    label: "普通管理员"
  }
];

const formLabelAlign = reactive({
  name: "",
  password: "",
  confirmPwd: "",
  rank: "普通管理员"
});

const handleCancel = () => {
  emit("hiden", "");
};

const handleAdd = () => {
  const data = {
    rank: formLabelAlign.rank,
    name: formLabelAlign.name,
    pwd: formLabelAlign.password
  };
  emit("add", data);
  emit("hiden", "");
  formLabelAlign.name = "";
  formLabelAlign.password = "";
  formLabelAlign.confirmPwd = "";
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  inset: 0;
  background-color: rgb(221 221 221 / 50%);
}

.form {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  min-width: 500px;
  padding: 30px;
  background-color: #fff;
  transform: translate(-50%, -50%);
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
