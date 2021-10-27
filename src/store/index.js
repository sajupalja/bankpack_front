import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api/api.js';
import axios from 'axios';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName'),
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.userId = id;
      sessionStorage.setItem('userId', id);
    },
    SET_USER_NAME(state, userName) {
      state.userName = userName;
      sessionStorage.setItem('userName', userName);
    },
  },
  actions: {
    testLogin() {
      axios.get('http://bankpack.169.56.174.130.nip.io' + api.testLogin)
        .then(res => {
          this.commit('SET_USER_ID', res.data.userId);
          this.commit('SET_USER_NAME', res.data.userName);
          // eslint-disable-next-line object-curly-newline
          router.push({ name: 'Home' });
        })
        .catch(err => console.error(err));
    },
  },
  modules: {},
});
