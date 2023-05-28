<template>
  <div class="form" v-if="props.isShow">
    <el-form
      label-position="left"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="区县">
        <el-input placeholder="区县名称" v-model="formLabelAlign.county" />
      </el-form-item>
      <el-form-item label="城镇">
        <el-input placeholder="城镇名称" v-model="formLabelAlign.town" />
      </el-form-item>
      <el-form-item label="车数">
        <el-input placeholder="汽车数量" v-model="formLabelAlign.cars" />
      </el-form-item>
      <el-form-item label="交通事故">
        <el-input
          placeholder="交通事故数量"
          v-model="formLabelAlign.accident"
        />
      </el-form-item>
      <el-form-item label="拥堵情况">
        <el-select v-model="jam" placeholder="请选择">
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
    id: props.editData.id,
    county: props.editData.county,
    town: props.editData.town,
    cars: props.editData.cars,
    accident: props.editData.accident,
    state: ""
  });
});

const jam = ref("");
const options = [
  {
    value: "1",
    label: "故障"
  },
  {
    value: "2",
    label: "良好"
  }
];
const changeData = () => {
  const data = {
    id: formLabelAlign.value.id,
    county: formLabelAlign.value.county,
    town: formLabelAlign.value.town,
    cars: formLabelAlign.value.cars,
    accident: formLabelAlign.value.accident,
    jam: jam.value == 1 ? "故障" : "良好"
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
