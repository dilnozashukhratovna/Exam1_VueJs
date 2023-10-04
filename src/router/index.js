import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import login from "./login";
import admin from "./admin";
import superadmin from "./superadmin";
import selection from "./selection";
import not_found from "./not_found";

const routes = [login, admin, superadmin, selection, not_found];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("roles");
  console.log(from);
  console.log(to.name);
  console.log(role);
  const arr = ["superadmin", "add_users", "users", "single_user", "selection"];
  const arr2 = ["admin", "products", "single_product"];
  console.log(role && arr.includes(to.name) == arr2.includes(from.name));
  if (!role && (arr.includes(to.name) || arr2.includes(to.name))) {
    console.log(1);
    next(from);
  } else if (role && to.name == "login") {
    console.log(2);
    next(from);
  } else {
    console.log(3);
    next();
  }
});

export default router;
