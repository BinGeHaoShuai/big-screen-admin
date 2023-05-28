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
          v-model="formLabelAlign.pwd"
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
      <el-button type="primary" @click="editConfirm">确认</el-button>
    </div>
  </div>
  <div class="mask" v-if="props.isShow" />
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  editData: Object
});

const emit = defineEmits(["hiden", "editConfirm"]);

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

const formLabelAlign = computed(() => {
  return reactive({
    name: props.editData.name,
    pwd: props.editData.pwd,
    rank: props.editData.rank
  });
});

const handleCancel = () => {
  emit("hiden", "");
};

const editConfirm = () => {
  emit("editConfirm", formLabelAlign);
  emit("hiden", "");
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
