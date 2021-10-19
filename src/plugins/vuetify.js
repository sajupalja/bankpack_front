import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2878A0',
        secondary: '#FAF8D4',
        accent: '#BBDDFF',
        error: '#EF8354',
        shadow: '#E1E1E1',
        background: '#F1F4F6',
      },
    },
  },
});
