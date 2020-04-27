import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入布局组件
import Layout from '@/views/Layout'

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: 'index',
    component: Layout,
    meta: {
      name: "控制台",
      icon: 'console'
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/Console/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
