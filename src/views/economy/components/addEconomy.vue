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
      <el-form-item label="GDP同比">
        <el-input v-model="formLabelAlign.gdp_growth" />
      </el-form-item>
      <el-form-item label="财政收入">
        <el-input v-model="formLabelAlign.revenue" />
      </el-form-item>
      <el-form-item label="财政支出">
        <el-input v-model="formLabelAlign.expenditure" />
      </el-form-item>
      <el-form-item label="人均可支配收入">
        <el-input v-model="formLabelAlign.income" />
      </el-form-item>
      <el-form-item label="人均支出">
        <el-input v-model="formLabelAlign.spend" />
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button @click="handleCancel()">取消</el-button>
      <el-button type="primary" @click="addData">确认</el-button>
    </div>
  </div>
  <div class="mask" v-if="props.isShow" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["hiden", "addData"]);

const formLabelAlign = reactive({
  address: "",
  gdp_growth: 0,
  revenue: 0,
  expenditure: 0,
  income: 0,
  spend: 0
});

const addData = () => {
  const data = {
    address: formLabelAlign.address,
    gdp_growth: formLabelAlign.gdp_growth,
    revenue: formLabelAlign.revenue,
    expenditure: formLabelAlign.expenditure,
    income: formLabelAlign.income,
    spend: formLabelAlign.spend
  };
  emit("addData", data);
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
