<template>
  <div id="app">

    <!-- smoke screen for screens wider than 600px -->
    <div class="smoke-screen">
      <img
        class="smoke-screen-logo"
        src="./assets/icon.png"
      >
      <h3>뱅팩은 모바일에 최적화된 서비스입니다.</h3>
      <h5>모바일 크기 화면에서 봐주세요!</h5>
    </div>

    <!-- header -->
    <div class="navbar">
      <div></div>
      <img
        class="logo-img"
        src="./assets/icon.png"
      >
      <v-btn
        @click="drawer = !drawer"
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
      <v-list-item 
        v-if="!isLoggedIn"
        :to="{ name: 'Login' }"
        link
      >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            로그인하기
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-else>
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
      isLoggedIn: false,
      drawer: false,
      navigationItems: [
        { title: '홈', icon: 'mdi-home', route: 'Home' },
        { title: '여행지 추천', icon: 'mdi-airplane', route: 'Home' },
        { title: '후기 검색', icon: 'mdi-forum-outline', route: 'Home' },
        { title: 'My 여행', icon: 'mdi-bag-carry-on', route: 'Home' },
        { title: 'My 자산', icon: 'mdi-cash', route: 'Home' },
      ],
      username: '신채원',
    }
  },
}
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
.smoke-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 9999;
}

.smoke-screen-logo {
  width: 200px;
}

.navbar {
  height: 8vh;
	position: sticky;
	top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}

.logo-img {
  height: 7vh;
  margin-left: 7vw;
}

@media screen and (max-width: 600px) {
  .smoke-screen {
    display: none;
  }
}
</style>
