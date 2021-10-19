<template>
  <div id="app">

    <router-view/>
  </div>
</template>

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
