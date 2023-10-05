<template>
  <app-modal v-model="dialog">
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
          v-model="forms.description"></textarea>
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
  </app-modal>
</template>

<script setup lang="js">
import Notification from "@/plugins/Notification";
import appModal from "@/ui/app-modal.vue";
import { Form, Field } from "vee-validate";
import http from "../plugins/axios";
import { ref, watch } from "vue";
const dialog = ref(false);
const products = ref([]);

const forms = ref({
  name: "",
  brand: "",
  group: "",
  price: null,
  arrival_price: null,
  selling_price: null,
  description: "",
});

watch(dialog, (value=>{
    if(!value){
        forms.value = {}
    }
}))

const openModal = (value) => {
  if (value) forms.value = {...value};
  console.log("Products value in open model:",  forms.value);
  dialog.value = true;
};

const saveForm = () => {
   http.patch(`http://34.125.211.64:3300/api/products/update/${forms.value._id}`, {
      name: forms.value.name,
      brand: forms.value.brand,
      group: forms.value.group,
      price: forms.value.price,
      arrival_price: forms.value.arrival_price,
      selling_price: forms.value.selling_price,
      description: forms.value.description,
        }).then(res=>{
            console.log("Edited product data:", res.data);
            Notification("New product is edited successfully!", "success");
            dialog.value = false;
            forms.value = {};
            location.reload()

        }).catch(err=>{
            console.log("Error in editing data:", err);
        })

};

defineExpose({ openModal });
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap");

app-modal {
  display: flex;
  align-items: center;
}

h1 {
  text-align: center;
  font-family: sans-serif;
  color: palevioletred;
}
Form {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
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
