<template>
  <div class="box">
    <div class="left">
      <h1>Admin Page</h1>
      <Sidebar :items="items" name="admin" />
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import http from "../plugins/axios";
import { ref } from "vue";
import Notification from "../plugins/Notification";
import { useRoute } from "vue-router";
import Sidebar from "../ui/Sidebar.vue";
const route = useRoute();

const items = ref([
  {
    id: 1,
    path: `/products`,
    title: "Products",
    icon: "fa-brands fa-product-hunt",
  },
  {
    id: 2,
    path: `/add_product`,
    title: "Add Product",
    icon: "fa-regular fa-square-plus",
  },
]);
</script>

<style lang="scss" scoped>
h1 {
  font-family: fantasy;
  color: white;
  font-size: 25px;
  text-align: center;
}
.box {
  width: 100%;
  height: 100vh;
  overflow: auto;
  // border: 1px solid red;
  display: flex;
}

.left {
  width: 21%;
  height: 100%;
  background-color: rgb(222, 167, 176);
}

.right {
  width: 79%;
  // border: 1px solid purple;
  margin-left: 40px;
}
</style>
