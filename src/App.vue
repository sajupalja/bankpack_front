<template>
  <div id="app">

    <!-- header -->
    <div class="navbar">
      <v-img
        class="logo-img"
        src="./assets/icon.png"
        contain
      >
      </v-img>

      <v-btn
       @click="drawer = true"
       icon
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>

    <!-- navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ username }}님
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :to="{ name: item.route }"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      navigationItems: [
        {
          title: '홈', icon: 'mdi-home', route: 'Home',
        }, {
          title: '여행지 추천', icon: 'mdi-airplane', route: 'Home',
        }, {
          title: '후기 검색', icon: 'mdi-forum-outline', route: 'Home',
        }, {
          title: 'My 여행', icon: 'mdi-bag-carry-on', route: 'Home',
        }, {
          title: 'My 자산', icon: 'mdi-cash', route: 'Home',
        },
      ],
      username: '신채원',
    };
  },
};
</script>


<style>
@import './assets/css/style.css';
@font-face {
    font-family: 'paybooc-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff') format('woff');
}

#app {
  font-family: 'paybooc-Bold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
.navbar {
  height: 8vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo-img {
  height: 7vh;
}
</style>
