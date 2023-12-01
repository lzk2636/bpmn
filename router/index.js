import Vue from "vue";
import VueRouter from "vue-router";
// import Layout from "@/Layout";
// import { getQueryObject } from "@/utils";

Vue.use(VueRouter);
// 路由报错解决方案
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [

  {
    path: "/",
    meta: {
      title: "首页",
    },
    name: "index",
    component: () => import(/* webpackChunkName: "about" */ "../examples/flow.vue"),
  },
  {//examples\swiper.vue
    path: "/swiper",
    name: "swiper",
    meta: {
      title: "swiper",
    },
    component: () => import(/* webpackChunkName: "about" */ "../examples/swiper.vue"),
  },
   {//examples\swiper.vue
    path: "/world",
    name: "world",
    meta: {
      title: "world",
    },
    component: () => import(/* webpackChunkName: "about" */ "../examples/world.vue"),
  },
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
// 页面切换显示标题
router.afterEach((to) => {
  if (to.meta.title == "404") {
    document.title = to.meta.title;
  }
});

router.beforeEach((form, to, next) => {
  next();
});
export default router;
