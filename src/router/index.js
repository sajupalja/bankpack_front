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
    path: '/assets',
    name: 'Assets',
    component: () => import('../views/Asset.vue'),
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  }, {
    path: '/my-trips',
    name: 'MyTripList',
    component: () => import('../views/MyTripList.vue'),
  }, {
    path: '/my-trip/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
  }, {
    path: '/my-trips/:trvlId',
    name: 'MyTripDetail',
    component: () => import('../views/MyTripDetail.vue'),
    children: [
      {
        path: 'info',
        name: 'MyTripInfo',
        component: () => import('../views/MyTripInfo.vue'),
      }, {
        path: 'spending',
        name: 'MyTripSpending',
        component: () => import('../views/MyTripSpending.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
