<script setup lang="ts">
import { computed, ref, reactive, onMounted } from "vue";

interface User {
  date: string;
  name: string;
  address: string;
  ip: string;
}

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const tableData: User[] = [
  {
    date: "2023-05-03 12:05:26",
    name: "admin",
    address: "重庆市",
    ip: "103.168.155.41"
  },
  {
    date: "2023-05-02 15:15:26",
    name: "admin",
    address: "广东省",
    ip: "103.168.155.31"
  }
];

const state = reactive({
  ip: ""
});
onMounted(() => {
  //获取ip
  getUserIP(ip => {
    state.ip = ip;
    console.log(ip);
    console.log(state.ip);
  });
  fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;
      console.log(ip);
      //通过ip地址获取所在地
      fetch(`getIP/api/IPdata?ip=${ip}`).then(res =>
        res.json().then(data => {
          console.log(data);
        })
      );
    })
    .catch(error => {
      console.error(error);
    });
});
//获取用户本地ip的方法
const getUserIP = onNewIP => {
  const MyPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  const pc = new MyPeerConnection({
    iceServers: []
  });
  const noop = () => {};
  const localIPs = {};
  const ipRegex =
    /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  const iterateIP = ip => {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  };
  pc.createDataChannel("");
  pc.createOffer()
    .then(sdp => {
      sdp.sdp.split("\n").forEach(function (line) {
        if (line.indexOf("candidate") < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });
      pc.setLocalDescription(sdp, noop, noop);
    })
    .catch(error => {
      console.log(error);
    });
  pc.onicecandidate = ice => {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
};

defineOptions({
  name: "UserLog"
});
</script>

<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="时间" prop="date" />
      <el-table-column label="用户" prop="name" />
      <el-table-column label="地址" prop="address" />
      <el-table-column label="IP" prop="ip" />
    </el-table>
  </div>
</template>
