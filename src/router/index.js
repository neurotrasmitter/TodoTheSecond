import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { path: "/login" },
  },
  {
    path: "/login",
    name: "Логин",
    component: () => import("@/views/AuthorisationView"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("@/components/NoGroups"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/NotFoundView"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
