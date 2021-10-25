import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
import instance from './api/index';

Vue.config.productionTip = false;

Vue.prototype.$axios = instance;

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
