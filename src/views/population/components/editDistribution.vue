<template>
  <div class="form" v-if="props.isShow">
    <el-form
      label-position="left"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="地区">
        <el-input placeholder="地区名称" v-model="formLabelAlign.address" />
      </el-form-item>
      <el-form-item label="人口数">
        <el-input
          placeholder="请输入人口数量"
          v-model="formLabelAlign.population"
        />
      </el-form-item>
      <el-form-item label="人口变化">
        <el-input placeholder="人口变化" v-model="formLabelAlign.changes" />
      </el-form-item>
      <el-form-item label="人均收入">
        <el-input placeholder="人均收入" v-model="formLabelAlign.income" />
      </el-form-item>
      <el-form-item label="性别比例">
        <el-input placeholder="性别比例" v-model="formLabelAlign.sex_ratio" />
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
import { reactive, computed } from "vue";

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
    id: props.editData.id,
    address: props.editData.address,
    population: props.editData.population,
    changes: props.editData.changes,
    income: props.editData.income,
    sex_ratio: props.editData.sex_ratio
  });
});

const changeData = () => {
  const data = {
    id: formLabelAlign.value.id,
    address: formLabelAlign.value.address,
    population: formLabelAlign.value.population,
    changes: formLabelAlign.value.changes,
    income: formLabelAlign.value.income,
    sex_ratio: formLabelAlign.value.sex_ratio
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
