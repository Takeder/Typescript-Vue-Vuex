import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/todos",
    name: "todos",
    component: () => import("../views/TodosView.vue"),
  },
  {
    path: "/todos2",
    name: "todos2",
    component: () => import("../views/Todos2View.vue"),
  },
  {
    path: "/todos3",
    name: "todos3",
    component: () => import("../views/Todos3View.vue"),
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("../views/PostsView.vue"),
  },
  {
    path: "/o-vuex-todos",
    name: "o-vuex-todos",
    component: () => import("../views/OVuexTodosView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
