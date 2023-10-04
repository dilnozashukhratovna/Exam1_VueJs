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

export default router;
