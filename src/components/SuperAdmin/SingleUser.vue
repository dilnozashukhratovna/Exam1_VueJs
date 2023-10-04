<template>
  <add_user ref="usersModal" />
  <div class="user-box" v-if="user">
    <button class="back" @click="back">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <h2>User details with id {{ user._id }}:</h2>
    <p><span>firstName:</span> {{ user.name }}</p>
    <p><span>lastName:</span> {{ user.surname }}</p>
    <p><span>Age:</span> {{ user.age }}</p>
    <p><span>is_diploma:</span> {{ user.is_diploma }}</p>
    <p><span>address:</span> {{ user.address }}</p>
    <div class="buttons">
      <button class="btn delete" @click="deleteUser">
        <i class="fa-solid fa-trash-can"></i>Delete User
      </button>
      <button class="btn edit" @click="editUser(user)">
        <i class="fa-solid fa-pen-to-square"></i> Edit User
      </button>
    </div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import http from "../../plugins/axios";
import add_user from "@/pages/add_users.vue";
import Notification from "../../plugins/Notification";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const userId = route.params.id;
const user = ref();
const usersModal = ref();

const getUserById = () => {
  http
    .get(`http://34.125.211.64:3300/api/users/${userId}`)
    .then((res) => {
      user.value = res.data.user;
      console.log("SingleUser:", user.value);
    })
    .catch((err) => {
      console.log("Error in getting user by id:", err);
      Notification("Error occured", "danger");
    });
};
getUserById();

const back = () => {
  router.push({ name: "users" });
};

const editUser = (user) => {
  console.log("User id in edit button:", user);
  usersModal.value.openModal(user);
};

const deleteUser = () => {
  http
    .delete(`http://34.125.211.64:3300/api/users/${userId}`)
    .then((res) => {
      Notification("User successfully deleted", "success");
      back();
    })
    .catch((err) => {
      console.log("Error deleting user");
      Notification("Error occured", "danger");
    });
};
</script>

<style lang="scss" scoped>
.user-box {
  margin: auto;
  margin-top: 50px;
  padding: 50px;
  display: flex;
  border: 2px solid palevioletred;
  width: 70%;
  font-family: fantasy;
  flex-direction: column;
  border-radius: 10px;
  // position: relative;
}

span {
  color: palevioletred;
  font-size: 20px;
  margin-right: 10px;
}

.buttons {
  // border: 1px solid red;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.btn {
  width: 48%;
  padding: 13px 15px;
  border-radius: 30px;
  color: white;
  border: none;
  font-size: 17px;
  transition: all 0.2s linear;
  background-color: palevioletred;
}

.back {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  color: white;
  border: none;
  background-color: palevioletred;
  // position: absolute;
  font-size: 25px;
  margin-left: 104%;
  margin-top: -9%;
  transition: all 0.2s linear;
}

.back:hover {
  background-color: crimson;
}

.edit:hover {
  background-color: rgb(246, 193, 94);
}
.delete:hover {
  background-color: rgb(233, 58, 93);
}

.fa-pen-to-square,
.fa-trash-can {
  font-size: 20px;
  margin-right: 10px;
}
</style>
