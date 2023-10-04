export default {
  path: "/",
  name: "login",
  component: () => {
    return import("../views/Login.vue");
  },
};
