import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  }, {
    path: '/my-trips',
    name: 'MyTripList',
    component: () => import('../views/MyTripList.vue'),
  }, {
    path: '/my-trips/:trvlId',
    name: 'MyTripDetail',
    component: () => import('../views/MyTripDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
