<template>
  <div class="my-trip-detail">
    <div class="header">
      <img
        class="header-img"
        :src="tripInfo.imgUrl"
        alt="header-image"
      >
      <v-btn
        class="back-btn"
        @click="goBack"
        icon
      >
        <v-icon large color="font">mdi-chevron-left</v-icon>
      </v-btn>
      <div class="trip-destination-overlay">
        <h1 class="trip-destination">{{ tripInfo.cntryName }} {{ tripInfo.cityName }}</h1>
      </div>
    </div>
    <div class="body">
      <v-tabs
        class="tabs"
        v-model="tab"
        grow
      >
        <v-tabs-slider color="primary"></v-tabs-slider>
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
      <router-view :trip-info="tripInfo" :chart-data="chartData" @fetch="fetchTripInfo"></router-view>
    </div>
  </div>
</template>

<script>
import api from '../api/api.js';

export default {
  name: 'MyTripDetail',
  data() {
    return {
      tab: this.$route.name === 'MyTripInfo' ? 0 : 1,
      tripInfo: [],
      chartData: null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchTripInfo() {
      this.$axios.get(api.myTripDetail + this.$route.params.trvlId)
        .then(res => {
          console.log(res.data);
          this.chartData = {
            hoverBorderWidth: 10,
            labels: ['식비', '숙박비', '교통비', '활동', '기타'],
            datasets: [
              {
                label: '카테고리별 지출',
                backgroundColor: ['#2878A0', '#FAF8D4', '#BBDDFF', '#EF8354', '#242038'],
                data: [res.data.totalFoodRate, res.data.totalRoomRate, res.data.totalTrffRate, res.data.totalActRate, res.data.totalEtcRate],
              },
            ],
          };
          this.tripInfo = res.data;
        })
        .catch(err => console.error(err));
    },
  },
  mounted() {
    this.fetchTripInfo();
  },
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

.back-btn {
  position: absolute;
  top: 9vh;
  left: 0.2rem;
}

.trip-destination-overlay {
  position: relative;
  top: -110px;
  padding-top: 0.2rem;
  padding-bottom: 1.4rem;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 30%, rgba(74,74,74,0.6) 77%, rgba(147,147,147,0.2) 99%);
}

.trip-destination {
  margin-left: 1rem;
  color: white;
}

.body {
  position: relative;
  top: -50px;
  background-color: var(--background);
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}

.tabs {
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
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
  font-weight: 600;
}

.router-link {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font);
}
</style>