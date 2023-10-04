import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const Notification = (text, color) => {
  createToast(text, {
    position: "top-right",
    type: color,
    transition: "bounce",
    timeout: 3000,
  });
};

export default Notification;
