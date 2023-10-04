export default {
  path: "/:catchAll(.*)",
  name: "not_found",
  component: () => {
    return import("@/views/NotFound");
  },
};
