import not_found from "./not_found";

export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => {
    return import("../views/SuperAdmin.vue");
  },
  children: [
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("@/components/SuperAdmin/Users");
      },
    },
    {
      path: "/add_user",
      name: "/add_user",
      component: () => {
        return import("@/components/SuperAdmin/AddUser");
      },
    },
    {
      path: "/single_user/:id",
      name: "single_user",
      component: () => {
        return import("@/components/SuperAdmin/SingleUser");
      },
    },
    not_found,
  ],
};
