import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
import instance from './api/index';
import VueMoment from 'vue-moment';
// eslint-disable-next-line object-curly-newline
import firebase from 'firebase/compat/app';

Vue.config.productionTip = false;

Vue.prototype.$axios = instance;

Vue.use(VueMoment);

const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'bankpack-95156.firebaseapp.com',
  projectId: 'bankpack-95156',
  storageBucket: 'bankpack-95156.appspot.com',
  messagingSenderId: '349226473644',
  appId: '1:349226473644:web:5716503788b47a8c152709',
  measurementId: 'G-4N6BZN8E9Q',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
