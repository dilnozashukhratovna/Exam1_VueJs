import {
  createRouter,
  createWebHistory,
} from "vue-router";
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
  const arr = ["superadmin", "add_users", "users", "single_user", "selection"];
  const arr2 = ["admin", "products", "single_product"];
  if (!role && (arr.includes(to.name) || arr2.includes(to.name))) {
    next(from);
  } else if (role && to.name == "login") {
    next(from);
  } else {
    next();
  }
});

export default router;
