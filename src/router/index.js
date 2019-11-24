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
    component: Module,
    props: route => ({
      id: Number.parseInt(route.params.id)
    })
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
    component: Machine,
    props: route => ({
      id: Number.parseInt(route.params.id)
    })
  },
  {
    path: "*",
    name: "notfound",
    component: Error,
    props: {
      title: "404",
      message: "Siden findes ikke."
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
