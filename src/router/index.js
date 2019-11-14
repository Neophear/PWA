import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import SpareParts from "../views/SpareParts";
import SparePart from "../views/SparePart";
import Error from "../views/Error";
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
    path: "/error",
    name: "error",
    component: Error,
    props: true
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
