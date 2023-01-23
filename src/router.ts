import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/HomePage.vue";
import Auth from "./pages/AuthPage.vue";
import NotFound from "./pages/NotFound.vue";
import { PathsOfRoutes } from "./types";

const routes = [
  { path: PathsOfRoutes.HOME, component: Home },
  { path: PathsOfRoutes.AUTH, component: Auth },
  {
    path: PathsOfRoutes.NOTFOUND,
    name: "NotFound",
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
