<template>
  <div>
    <!-- 城市经济政策情况:如财政政策、货币政策、税收政策等。 -->
    <div class="add-button">
      <el-button type="primary" @click="handleAdd()">编辑上传</el-button>
    </div>

    <el-table :data="filterTableData" style="width: 100%" table-layout="auto">
      <el-table-column label="时间" prop="time" />
      <el-table-column label="标题" prop="title" />
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="true"
      layout="prev, pager, next, jumper"
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- <add-form :isShow="isShow" @hiden="handleAdd" /> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
// import addForm from "./components/addForm.vue";

interface Policy {
  time: string;
  title: string;
  content: string;
}

const search = ref("");

const currentPage = ref(5);
const pageSize = ref(10);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  )
);
//是否显示添加人员表格
const isShow = ref<boolean>(false);
const handleAdd = () => {
  isShow.value = !isShow.value;
};

const tableData: Policy[] = [
  {
    time: "2023-04-28",
    title: "袁家军胡衡华在京走访国家发展改革委和农业农村部",
    content:
      "4月27日，市委书记袁家军，市委副书记、市长胡衡华在北京走访国家发展改革委和农业农村部并召开工作座谈会，加强工作对接，积极争取支持。国家发展改革委党组书记、主任郑栅洁；中央农办主任，农业农村部党组书记、部长唐仁健分别参加座谈。"
  },
  {
    time: "2023-04-30",
    title: "胡衡华会见萨尔瓦多驻华大使阿尔瓦雷斯",
    content:
      "4月28日，市委副书记、市长胡衡华会见了来渝参加重庆国际咖啡节的萨尔瓦多驻华大使阿尔瓦雷斯一行。副市长张国智，市政府秘书长罗清泉参加。"
  },
  {
    time: "2023-05-04",
    title:
      "中共重庆市委办公厅 重庆市人民政府办公厅印发《关于新时代进一步加强科学技术普及工作的实施方案》",
    content:
      "为深入贯彻落实《中共中央办公厅、国务院办公厅印发〈关于新时代进一步加强科学技术普及工作的意见〉的通知》精神，推动全市科学技术普及（以下简称科普）事业高质量发展，结合实际，制定本实施方案。"
  }
];
defineOptions({
  name: "Policy"
});
</script>

<style lang="scss" scoped>
.add-button {
  padding: 10px;
}
</style>
