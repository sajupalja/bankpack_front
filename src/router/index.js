import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'BANKPACK | 홈',
    },
  },
  {
    path: '/assets',
    name: 'Assets',
    component: () => import('../views/Asset.vue'),
    meta: {
      title: 'BANKPACK | My 자산',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'BANKPACK | 로그인',
    },
  },
  {
    path: '/my-trips',
    name: 'MyTripList',
    component: () => import('../views/MyTripList.vue'),
    meta: {
      title: 'BANKPACK | My 여행',
    },
  },
  {
    path: '/my-trip/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
    meta: {
      title: 'BANKPACK | 결제내역',
    },
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
        meta: {
          title: 'BANKPACK | 내 여행',
        },
      }, {
        path: 'spending',
        name: 'MyTripSpending',
        component: () => import('../views/MyTripSpending.vue'),
        meta: {
          title: 'BANKPACK | 지출 관리',
        },
      },
    ],
  },
  {
    path: '/reviews',
    name: 'ReviewList',
    component: () => import('../views/ReviewList.vue'),
    meta: {
      title: 'BANKPACK | 후기 검색',
    },
  },
  {
    path: '/reviews/:reviewId',
    name: 'ReviewInfo',
    component: () => import('../views/ReviewInfo.vue'),
    meta: {
      title: 'BANKPACK | 후기',
    },
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    meta: {
      title: 'BANKPACK | 에러',
    },
  },
  {
    path: '/survey',
    name: 'Survey',
    component: () => import('../views/Survey.vue'),
    meta: {
      title: 'BANKPACK | 여행 성향 설문',
    },
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: () => import('../views/Recommendation.vue'),
    meta: {
      title: 'BANKPACK | 추천 결과',
    },
  },
  {
    path: '/recommendation/detail',
    name: 'RecommendationDetail',
    component: () => import('../views/RecommendationDetail.vue'),
    meta: {
      title: 'BANKPACK | 추천 여행지',
    },
  },
  {
    path: '/mytripupdate',
    name: 'MyTripUpdate',
    component: () => import('../views/MyTripUpdate.vue'),
    meta: {
      title: 'BANKPACK | 여행내용 수정',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['Login', 'Home', 'ReviewList'];
  const authPages = ['Login'];

  const authRequired = !publicPages.includes(to.name);
  const unauthRequired = authPages.includes(to.name);
  const isLoggedIn = sessionStorage.getItem('userName');

  // 로그인 이미했는데 로그인 페이지 가려는 경우
  if (unauthRequired && isLoggedIn) {
    // eslint-disable-next-line object-curly-newline
    next({ name: 'Home' });
  }

  // 로그인 안했는데 로그인 필요한 페이지 가려는 경우
  if (authRequired && !isLoggedIn) {
    alert('로그인해주세요.');
    // eslint-disable-next-line object-curly-newline
    next({ name: 'Login' });
  }

  document.title = to.meta.title || 'BANKPACK';
  next();
});

export default router;
