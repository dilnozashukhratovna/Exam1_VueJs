<template>
  <div class="box">
    <h1>404 - Not Found</h1>
    <h3>Sorry, the page you are looking for does not exist.</h3>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.box {
  width: 600px;
  height: 100px;
  display: grid;
  place-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: palevioletred;
  margin: auto;
  margin-top: 200px;
}
</style>
