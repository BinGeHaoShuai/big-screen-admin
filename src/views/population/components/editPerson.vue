<template>
  <div class="form" v-if="props.isShow">
    <el-form
      label-position="left"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="formLabelAlign.id" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.age" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="sex" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="教育程度">
        <el-input v-model="formLabelAlign.education" />
      </el-form-item>
      <el-form-item label="居住地">
        <el-input v-model="formLabelAlign.address" />
      </el-form-item>
      <el-form-item label="户籍">
        <el-input v-model="formLabelAlign.register" />
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="formLabelAlign.career" />
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button @click="handleCancel()">取消</el-button>
      <el-button type="primary" @click="changeData">确认</el-button>
    </div>
  </div>
  <div class="mask" v-if="props.isShow" />
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  editData: Object
});
const emit = defineEmits(["hiden", "changeData"]);

const formLabelAlign = computed(() => {
  return reactive({
    name: props.editData.name,
    id: props.editData.id,
    age: props.editData.age,
    sex: props.editData.sex,
    education: props.editData.education,
    address: props.editData.address,
    register: props.editData.register,
    career: props.editData.career
  });
});

const sex = ref("");
const options = [
  {
    value: "1",
    label: "男"
  },
  {
    value: "2",
    label: "女"
  }
];
const changeData = () => {
  const data = {
    name: formLabelAlign.value.name,
    id: formLabelAlign.value.id,
    age: formLabelAlign.value.age,
    sex: sex.value == 1 ? "男" : "女",
    education: formLabelAlign.value.education,
    address: formLabelAlign.value.address,
    register: formLabelAlign.value.register,
    career: formLabelAlign.value.career
  };
  emit("changeData", data);
  emit("hiden", "");
};

const handleCancel = () => {
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
