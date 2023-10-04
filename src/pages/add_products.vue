<template>
  <app-modal v-model="dialog">
    <Form @submit="saveForm">
      <h1>Add User</h1>

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
        :modelValue="forms.surname"
        v-slot="{ errors }"
        name="surname">
        <input type="text" placeholder="LastName..." v-model="forms.surname" />
        <p style="color: crimson" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <Field
        rules="required"
        :modelValue="forms.age"
        v-slot="{ errors }"
        name="age">
        <input type="number" placeholder="Age..." v-model="forms.age" />
        <p style="color: crimson" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <select v-model="forms.is_diploma">
        <option :value="false">false</option>
        <option :value="true">true</option>
      </select>
      <Field
        rules="required"
        :modelValue="forms.address"
        v-slot="{ errors }"
        name="address">
        <input
          type="address"
          placeholder="Address..."
          v-model="forms.address" />
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
const users = ref([]);

const forms = ref({
  name: "",
  surname: "",
  age: null,
  is_diploma: false,
  address: "",
});

watch(dialog, (value=>{
    if(!value){
        forms.value = {}
    }
}))

const openModal = (value) => {
  if (value) forms.value = {...value};
  console.log("Users value in open model:",  forms.value);
  dialog.value = true;
};

const saveForm = () => {
   http.patch(`http://34.125.211.64:3300/api/users/update/${forms.value._id}`, {
      name: forms.value.name,
      surname: forms.value.surname,
      age: forms.value.age,
      is_diploma: forms.value.is_diploma,
      address: forms.value.address,
        }).then(res=>{
            console.log("Edited user data:", res.data);
            Notification("New user is edited successfully!", "success");
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

h2 {
  text-align: center;
  font-family: sans-serif;
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
</style>
