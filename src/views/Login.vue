<template>
  <Form @submit="login">
    <h1>LogIn</h1>
    <Field
      rules="required"
      :modelValue="form.username"
      v-slot="{ errors }"
      name="username">
      <input
        type="text"
        placeholder="username..."
        v-model.trim="form.username"
        required />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="form.password"
      v-slot="{ errors }"
      name="password">
      <input
        type="password"
        placeholder="Password..."
        v-model.trim="form.password"
        required />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>

    <button type="submit">Send</button>
  </Form>
</template>

<script setup>
import http from "@/plugins/axios";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Notification from "../plugins/Notification";
import { Form, Field } from "vee-validate";
const router = useRouter();
const form = ref({
  username: "",
  password: "",
});

const login = () => {
  http
    .post("http://34.125.211.64:3300/api/admins/login", {
      username: form.value.username,
      password: form.value.password,
    })
    .then((res) => {
      const data = res.data;
      console.log("Data:", data);
      console.log("Token:", data.token);
      console.log("Roles:", data.roles);
      if (data.token && data.roles) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        if (data.roles.includes("admin") && data.roles.includes("superadmin")) {
          router.push({ name: "selection" });
        } else if (data.roles.includes("admin")) {
          router.push({ name: "admin" });
        } else if (data.roles.includes("superadmin")) {
          router.push({ name: "superadmin" });
        } else {
          Notification("Something incorrect with role", "danger");
        }
      }
    })
    .catch((err) => {
      console.log("Error in AdminLogin:", err);
      Notification("Error in Login", "danger");
    });
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap");

Form {
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
}

Form h1 {
  font-size: 45px;
}

input {
  width: 80%;
  padding: 15px 15px;
  color: #000;
  margin-top: 30px;
  border: 1px solid palevioletred;
  border-radius: 15px;
  font-family: sans-serif;
  outline: none;
}

input::placeholder {
  font-size: 15px;
  font-family: sans-serif;
}

button {
  width: 510px;
  padding: 1px 15px;
  color: #000;
  margin-bottom: 70px;
  border-radius: 15px;
  background-color: palevioletred;
  color: white;
  font-family: "Sue Ellen Francisco", cursive;
  border: none;
  font-size: 25px;
  transition: all 0.2s linear;
  margin-top: 30px;
}

button:hover {
  background-color: white;
  color: palevioletred;
  border: 2px solid palevioletred;
}

p {
  font-family: sans-serif;
}
</style>
