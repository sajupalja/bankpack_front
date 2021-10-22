import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/assets',
    name: 'Assets',
    component: () => import('../views/Asset.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/my-trips',
    name: 'MyTripList',
    component: () => import('../views/MyTripList.vue'),
  },
  {
    path: '/my-trip/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
  },
  {
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
  {
    path: '/reviews',
    name: 'ReviewList',
    component: () => import('../views/ReviewList.vue'),
  },
  {
    path: '/reviews/:reviewId',
    name: 'ReviewInfo',
    component: () => import('../views/ReviewInfo.vue'),
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/Error.vue'),
  },
  {
    path: '/survey',
    name: 'Survey',
    component: () => import('../views/Survey.vue'),
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: () => import('../views/Recommendation.vue'),
  },
  {
    path: '/recommendation/:recommendationId',
    name: 'RecommendationDetail',
    component: () => import('../views/RecommendationDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
