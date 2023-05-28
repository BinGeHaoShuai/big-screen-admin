<template>
  <div class="form" v-if="props.isShow">
    <el-form
      label-position="left"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="地区">
        <el-input v-model="formLabelAlign.address" />
      </el-form-item>
      <el-form-item label="温度">
        <el-input v-model="formLabelAlign.temp" />
      </el-form-item>
      <el-form-item label="湿度">
        <el-input v-model="formLabelAlign.humidity" />
      </el-form-item>
      <el-form-item label="降雨量">
        <el-input v-model="formLabelAlign.rainfall" />
      </el-form-item>
      <el-form-item label="空气质量">
        <el-input v-model="formLabelAlign.air" />
      </el-form-item>
      <el-form-item label="水质量">
        <el-input v-model="formLabelAlign.water" />
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
    temp: props.editData.temp,
    humidity: props.editData.humidity,
    rainfall: props.editData.rainfall,
    air: props.editData.air,
    water: props.editData.water
  });
});

const changeData = () => {
  const data = {
    id: formLabelAlign.value.id,
    address: formLabelAlign.value.address,
    temp: formLabelAlign.value.temp,
    humidity: formLabelAlign.value.humidity,
    rainfall: formLabelAlign.value.rainfall,
    air: formLabelAlign.value.air,
    water: formLabelAlign.value.water
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
