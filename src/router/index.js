import Vue from "vue";
import VueRouter from "vue-router";

import Store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { path: "/login" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/AuthorisationView"),
    isAuthRequired: true,
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/TodoBoardView.vue"),
    children: [
      {
        path: "",
        name: "createBoard",
        component: () => import("@/components/NoGroups.vue"),
      },
      {
        path: ":path",
        name: "todoBoard",
        component: () => import("@/components/TodoBoard.vue"),
      },
    ],
  },

  {
    path: "*",
    name: "404",
    component: () => import("@/views/NotFoundView"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!Store.state.userId) {
    Store.state.userId = window.localStorage.getItem("userId");
    Store.state.userName = window.localStorage.getItem("userName");
  }
  if (to.name !== "Login" && !Store.state.userId) {
    console.log(Store.state);
    next({ name: "Login" });
    return;
  }
  // if (to.name === "board" && from.name !== "404") {
  //   console.log(to.name);
  //   console.log(from.name);
  //   if (!doesTheGroupPathExist(Store.state.groups, to.params.path)) {
  //     next({ name: "404" });
  //     return;
  //   }
  // }
  next();
});

export default router;
