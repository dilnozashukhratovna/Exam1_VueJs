<template>
  <div v-if="users" style="overflow: auto">
    <h1>All Users</h1>
    <div class="users-box">
      <ol class="users-list">
        <li v-for="item in users" :key="item._id">
          <div class="list-item">
            <p>{{ item.name }} {{ item.surname }}</p>
            <button @click="showMore(item._id)">Show More</button>
          </div>
          <hr style="border: 1px solid palevioletred" />
        </li>
      </ol>
    </div>
  </div>
  <div v-else class="loading"><h1>Loading...</h1></div>
</template>

<script setup>
import http from "../../plugins/axios";
import Notification from "../../plugins/Notification";
import { ref } from "vue";
//   import add_user from "@/pages/add_user.vue";
import { useRouter } from "vue-router";
import not_found from "../../router/not_found";
const router = useRouter();

const users = ref([]);
const usersModal = ref();
const userId = ref();

const showMore = (id) => {
  router.push({ name: "single_user", params: { id: id } });
};

const getAllUsers = () => {
  http
    .get("http://34.125.211.64:3300/api/users")
    .then((res) => {
      users.value = res.data.users;
      console.log("Users data:", users.value);
    })
    .catch((err) => {
      if (err.response.status == "404") {
        router.push({ name: "not_found" });
      }
      console.log("Error in getAllUsers", err);
      Notification("Error occured", "danger");
    });
};

getAllUsers();
</script>

<style lang="scss" scoped>
.users-box {
  display: grid;
  place-items: center;
  width: 700px;
  //   border: 1px solid red;
  margin: auto;
  font-family: fantasy;
}

.loading {
  // border: 1px solid black;
  width: 200px;
  height: 200px;
  display: grid;
  place-items: center;
  margin: auto;
  margin-top: 200px;
  font-family: fantasy;
  color: palevioletred;
}

.users-list {
  display: grid;
  place-items: left;
  gap: 15;
  //   border: 1px solid green;
}

.list-item {
  display: flex;
  justify-content: space-between;
  width: 600px;
}

.list-item button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s linear;
  font-family: fantasy;
  margin-left: 20px;
  background-color: white;
  color: palevioletred;
  border: 1px solid palevioletred;
}
.list-item button:hover {
  scale: 1.1;
  background-color: palevioletred;
  color: white;
}

h1 {
  font-size: 40px;
  font-family: fantasy;
  color: palevioletred;
  text-align: center;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s linear;
  font-family: fantasy;
}

.btn:hover {
  scale: 1.1;
}

.delete {
  background-color: crimson;
  color: white;
}
.edit {
  background-color: orange;
  color: white;
}

.create-btn {
  width: 200px;
  padding: 10px 15px;
  color: #000;
  margin-bottom: 30px;
  border-radius: 15px;
  background-color: palevioletred;
  color: white;
  font-family: fantasy;
  border: none;
  font-size: 18px;
  transition: all 0.2s linear;
  margin-top: 70px;
}

.create-btn:hover {
  background-color: white;
  color: palevioletred;
  border: 2px solid palevioletred;
}
</style>
