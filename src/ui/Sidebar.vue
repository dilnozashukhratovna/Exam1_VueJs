<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />
  <div class="container">
    <div class="div">
      <router-link :to="item.path" v-for="(item, index) in items" :key="index"
        ><button>
          <span><i :class="item.icon"></i></span> {{ item.title }}
        </button></router-link
      >
    </div>
    <div class="div2">
      <button @click="logout">
        <span><i class="fa-solid fa-right-from-bracket"></i></span> Log Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  items: {
    type: Array,
  },
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
}
button {
  padding: 15px 15px;
  background: white;
  text-align: left;
  border-radius: 5px;
  width: 90%;
  border: none;
  font-size: 18px;
  font-family: sans-serif;
  margin-top: 20px;
  margin-left: 17px;
  color: palevioletred;
  font-family: fantasy;
  transition: all 0.2s linear;
}

button:hover {
  scale: 0.9;
  cursor: pointer;
}
span {
  margin-right: 15px;
  margin-left: 30px;
}
</style>
