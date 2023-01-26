import { createRouter as createVueRouter, createWebHistory } from "vue-router";
import Home from "./pages/HomePage.vue";
import Auth from "./pages/AuthPage.vue";
import NotFound from "./pages/NotFound.vue";
import Report from "./pages/ReportPage.vue";
import { PathsOfRoutes } from "./types";
import { App } from "vue";
import { createAuthGuard } from "@auth0/auth0-vue";

export const createRouter = (app: App) =>
  createVueRouter({
    history: createWebHistory(),
    routes: [
      { path: PathsOfRoutes.AUTH, component: Auth },
      {
        path: PathsOfRoutes.HOME,
        component: Home,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: PathsOfRoutes.REPORT,
        component: Report,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: PathsOfRoutes.NOTFOUND,
        name: "NotFound",
        component: NotFound,
      },
    ],
  });
