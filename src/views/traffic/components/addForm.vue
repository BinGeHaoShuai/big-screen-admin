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
      <el-button type="primary">确认</el-button>
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
const emit = defineEmits(["hiden"]);

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
  confirmPwd: ""
});

const handleCancel = () => {
  emit("hiden", "");
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(221, 221, 221, 0.5);
}

.form {
  position: absolute;
  padding: 30px;
  min-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 999;
}

.bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
