<template>
  <div class="my-trip-detail">
    <div class="header">
      <img
        class="header-img"
        src="https://lp-cms-production.imgix.net/2021-03/shutterstock_304631102.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850"
        alt="header-image"
      >
    </div>
    <div class="body">
      <v-tabs
        class="tabs"
        v-model="tab"
        grow
      >
        <v-tabs-slider class="tab-slider"></v-tabs-slider>
        <v-tab
          class="tab trip-info-tab"
          active-class="active-tab"
        >
          <router-link
            class="router-link"
            :to="{ name: 'MyTripInfo' }"
          >내 여행</router-link>
        </v-tab>
        <v-tab
          class="tab trip-spending-tab"
          active-class="active-tab"
        >
          <router-link
            class="router-link"
            :to="{ name: 'MyTripSpending' }"
          >지출 관리</router-link>
        </v-tab>
      </v-tabs>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTripDetail',
};
</script>

<style scoped>
.my-trip-detail {
  background-color: var(--background);
}

.header {
  height: 30vh;
}

.header-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.body {
  position: relative;
  top: -50px;
  height: 1000px;
  background-color: var(--background);
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}

.tabs {
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}

.tab-slider {
  color: var(--primary);
}

.tab {
  background-color: var(--background);
  font-size: 1rem;
}

.tab:focus {
  background-color: var(--background);
  font-size: 1rem;
}

.trip-info-tab {
  border-top-left-radius: 25px;
}

.trip-spending-tab {
  border-top-right-radius: 25px;
}

.active-tab {
  background-color: var(--background);
  color: var(--primary) !important;
}

.router-link {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>