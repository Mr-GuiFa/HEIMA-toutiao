import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    component: () => import("@/views/Login"),
    name: "Login",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
