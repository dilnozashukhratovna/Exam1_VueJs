<template>
  <table class="custom-table">
    <thead>
      <tr>
        <td
          v-for="(item, index) in props.headers"
          :key="index"
          scope="col"
          class="th">
          {{ item.title }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in props.body" :key="index">
        <td v-for="(item2, index2) in props.headers" :key="index2">
          <slot :name="`body_${item2.value}`" :item="item">{{
            item[item2.value]
          }}</slot>
        </td>
      </tr>
    </tbody>
    <!-- <tbody>
      <tr v-for="(item, index) in props.body" :key="index">
        <td>{{ item }}</td>
      </tr>
    </tbody> -->
  </table>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
  },
  body: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
.custom-table {
  border-collapse: collapse;
  font-family: fantasy;
}

.custom-table .th {
  background-color: palevioletred;
  text-align: left;
  color: white;
  padding: 10px;
}

.custom-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
