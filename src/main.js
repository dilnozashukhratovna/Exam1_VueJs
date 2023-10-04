import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import validation from "@/plugins/vee-validate";

createApp(App).use(store).use(validation).use(router).mount("#app");
