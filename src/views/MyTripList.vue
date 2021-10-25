<template>
  <div class="my-trip-list">
    <v-container class="my-trip-list-container">
      <h2>나의 여행들</h2>

      <div
        class="my-trip-list-item"
        v-for="(item, i) in tripItems"
        :key="i"
      >
        <router-link
          class="router-link"
          :to="{ name: 'MyTripInfo', params:{ trvlId: item.trvlId } }"
        >
          <div class="my-trip-card">
            <img
              class="my-trip-card-img"
              :src="item.imgUrl"
              alt="thumbnail"
            >
            <div class="my-trip-card-content">
              <div class="my-trip-card-title">{{ item.cntryName }} {{ item.cityName }}</div>
              <div class="my-trip-card-date"> {{ item.trvlStartDt | moment('YYYY.MM.DD') }} - {{ item.trvlEndDt | moment('YYYY.MM.DD') }} </div>
            </div>
          </div>
        </router-link>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from '../api/api.js';

export default {
  name: 'MyTripList',
  data() {
    return {
      tripItems: [],
    };
  },
  methods: {
    fetchMyTrips() {
      this.$axios.get(api.myTripList)
        .then(res => this.tripItems = res.data)
        .catch(err => console.error(err));
    },
  },
  mounted() {
    this.fetchMyTrips();
  },
};
</script>

<style scoped>
.my-trip-list {
  background-color: var(--background);
  padding-bottom: 2rem;
}

.my-trip-list-container {
  padding: 1.4rem;
}

.my-trip-card {
  display: flex;
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: var(--card-border-radius);
}

.my-trip-card:hover {
  cursor: pointer;
}

.my-trip-card:active {
  background-color: var(--background);
}

.my-trip-card-img {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  object-fit: cover;
}

.my-trip-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--font);
}

.my-trip-card-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

.my-trip-card-date {
  font-size: 0.8rem;
}
</style>