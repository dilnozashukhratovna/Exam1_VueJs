<template>
  <div class="box">
    <h1>Choose role:</h1>
    <button @click="admin">Admin</button>
    <button @click="superadmin">SuperAdmin</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const admin = () => {
  router.push({ name: "admin" });
};
const superadmin = () => {
  router.push({ name: "superadmin" });
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap");

.box {
  width: 40%;
  height: 50%;
  border: 2px solid palevioletred;
  margin: auto;
  margin-top: 130px;
  font-family: "Sue Ellen Francisco", cursive;
  color: palevioletred;
  display: grid;
  place-items: center;
  border-radius: 15px;
  font-size: 30px;
}

button {
  width: 300px;
  padding: 2px 15px;
  color: #000;
//   margin-bottom: 30px;
  border-radius: 15px;
  background-color: palevioletred;
  color: white;
  font-family: "Sue Ellen Francisco", cursive;
  border: none;
  font-size: 23px;
  transition: all 0.2s linear;
  margin-top: 30px;
}

button:nth-child(3){
    margin-bottom: 50px;
}

button:hover {
  background-color: white;
  color: palevioletred;
  border: 2px solid palevioletred;
}
</style>
