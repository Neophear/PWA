import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Users from "../views/Users";
import SpareParts from "../views/SpareParts";
import SparePart from "../views/SparePart";
import Error from "../views/Error";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/users",
    name: "users",
    component: Users
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
