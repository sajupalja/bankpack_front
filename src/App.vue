<template>
  <v-app id="app">
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
      <div
        class="drawer-header"
        v-if="!isLoggedIn"
      >
        <router-link
          class="login-btn"
          :to="{ name: 'Login' }"
        >로그인하기</router-link>
      </div>

      <div
        class="drawer-header"
        v-else
      >
        {{ username }}님
      </div>

      <v-divider></v-divider>

      <div
        v-for="item in navigationItems"
        :key="item.title"
      >
        <router-link
          :to="{ name: item.route }"
          class="navigation-list-item"
        >
          <v-list-item-icon>
            <v-icon class="navigation-list-icon">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </router-link>
      </div>
    </v-navigation-drawer>

    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      isLoggedIn: false,
      navigationItems: [
        {
          title: '홈', icon: 'mdi-home', route: 'Home',
        }, {
          title: '여행지 추천', icon: 'mdi-airplane', route: 'Survey',
        }, {
          title: '후기 검색', icon: 'mdi-forum-outline', route: 'ReviewList',
        }, {
          title: 'My 여행', icon: 'mdi-bag-carry-on', route: 'MyTripList',
        }, {
          title: 'My 자산', icon: 'mdi-cash', route: 'Assets',
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
    font-family: 'paybooc-Medium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Medium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'paybooc-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

#app {
  font-family: 'paybooc-Medium';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
.smoke-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 9999;
  background-color: white;
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
  z-index: 999;
}

.logo-img {
  height: 7vh;
  margin-left: 7vw;
}

.drawer-header {
  padding: 1.6rem 1.6rem;
}

.login-btn {
  text-decoration: none;
  color: var(--font);
}

.login-btn:hover {
  cursor: pointer;
}

.login-btn:active {
  color: var(--background);
}

.navigation-list-item {
  text-decoration: none;
  color: var(--font);
  display: flex;
  padding-left: 1rem;
}

.navigation-list-item:hover {
  cursor: pointer;
}

.navigation-list-item:active {
  background-color: var(--background);
}

.navigation-list-icon {
  margin-right: 1rem;
}

@media screen and (max-width: 600px) {
  .smoke-screen {
    display: none;
  }
}
</style>
