<template>
  <Form @submit="saveForm">
    <h1>Add Product</h1>

    <Field
      rules="required"
      :modelValue="forms.name"
      v-slot="{ errors }"
      name="name">
      <input type="text" placeholder="Name..." v-model="forms.name" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.brand"
      v-slot="{ errors }"
      name="brand">
      <input type="text" placeholder="Brand..." v-model="forms.brand" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.group"
      v-slot="{ errors }"
      name="group">
      <input type="text" placeholder="Group..." v-model="forms.group" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.price"
      v-slot="{ errors }"
      name="price">
      <input type="number" placeholder="Price..." v-model="forms.price" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.arrival_price"
      v-slot="{ errors }"
      name="arrival_price">
      <input
        type="number"
        placeholder="ArrivalPrice..."
        v-model="forms.arrival_price" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.selling_price"
      v-slot="{ errors }"
      name="selling_price">
      <input
        type="number"
        placeholder="SellingPrice..."
        v-model="forms.selling_price" />
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>
    <Field
      rules="required"
      :modelValue="forms.description"
      v-slot="{ errors }"
      name="description">
      <textarea
        type="text"
        placeholder="Description..."
        v-model="forms.description"
        
        ></textarea>
      <!-- <input
        type="text"
        placeholder="Description..."
        v-model="forms.description" /> -->
      <p style="color: crimson" v-if="errors && errors.length">
        {{ errors[0] }}
      </p>
    </Field>

    <button type="submit">Save</button>
  </Form>
</template>

<script setup>
import http from "../../plugins/axios";
import Notification from "../../plugins/Notification";
import { ref } from "vue";
import appTable from "@/ui/app-table.vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
const router = useRouter();

const forms = ref({
  name: "",
  brand: "",
  group: "",
  price: null,
  arrival_price: null,
  selling_price: null,
  description: "",
});

const saveForm = () => {
  http
    .post("http://34.125.211.64:3300/api/products/add", {
      name: forms.value.name,
      brand: forms.value.brand,
      group: forms.value.group,
      price: forms.value.price,
      arrival_price: forms.value.arrival_price,
      selling_price: forms.value.selling_price,
      description: forms.value.description,
    })
    .then((res) => {
      router.push({ name: "products" });
      Notification("New product is successfully added", "success");
      console.log(res.data);
      forms.value = {};
    })
    .catch((err) => {
      console.log("Error occured in adding Product!", err);
      Notification("Error occured", "danger");
    });
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
  font-family: fantasy;
  color: palevioletred;
  text-align: center;
}

Form {
  width: 60%;
  display: flex;
  flex-direction: column;
  border: 1px solid palevioletred;
  padding: 40px;
  margin-left: 100px;
  margin-top: 50px;
}

input,
select {
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 15px;
  border: 1px solid #b8b2b2;
  color: #605656;
  outline: none;
}

input::placeholder {
  color: #605656;
}

button {
  width: 100%;
  padding: 10px 15px;
  color: #000;
  margin-bottom: 50px;
  border-radius: 15px;
  background-color: palevioletred;
  color: white;
  font-family: sans-serif;
  border: none;
  font-size: 18px;
  transition: all 0.2s linear;
  margin-top: 25px;
}

button:hover {
  background-color: white;
  color: palevioletred;
  border: 2px solid palevioletred;
}

p {
  font-size: 15px;
  font-family: sans-serif;
  margin-top: 10px;
}

textarea {
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 15px;
  border: 1px solid #b8b2b2;
  color: #605656;
  outline: none;
  height: 100px;
  resize: none;
}

textarea::placeholder {
  color: #605656;
  font-family: sans-serif;
}
</style>
