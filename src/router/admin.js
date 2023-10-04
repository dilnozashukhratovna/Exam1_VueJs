export default {
  path: "/admin",
  name: "admin",
  component: () => {
    return import("../views/Admin.vue");
  },
  children: [
    {
      path: "/products",
      name: "products",
      component: () => {
        return import("@/components/Admin/Products");
      },
    },
    {
      path: "/add_product",
      name: "/add_product",
      component: () => {
        return import("@/components/Admin/AddProduct");
      },
    },
    {
      path: "/single_product/:id",
      name: "single_product",
      component: () => {
        return import("@/components/Admin/SingleProduct");
      },
    },
  ],
};
