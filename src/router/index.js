import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import SpareParts from "../views/SpareParts";
import SparePart from "../views/SparePart";
import Modules from "../views/Modules";
import Module from "../views/Module";
import Error from "../views/Error";
import Machine from "../views/Machine";
import Machines from "../views/Machines";
import store from "../store";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/spareparts",
    name: "spareparts",
    component: SpareParts
  },
  {
    path: "/sparepart/:id",
    name: "sparepart",
    component: SparePart
  },
  {
    path: "/modules",
    name: "modules",
    component: Modules
  },
  {
    path: "/module/:id",
    name: "module",
    component: Module
  },
  {
    path: "/error",
    name: "error",
    component: Error,
    props: true
  },
  {
    path: "/machines",
    name: "machines",
    component: Machines
  },
  {
    path: "/machine/:id",
    name: "machine",
    component: Machine
  },
  {
    path: "*",
    name: "notfound",
    component: Error,
    props: {
      title: "404",
      message: "Siden findes ikke."
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
