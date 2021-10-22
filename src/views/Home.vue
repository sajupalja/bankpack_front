<template>
  <div class="home">
    <div class="home-header">
      <h2>여기는 배너...?</h2>
    </div>

    <v-container class="home-body">
      <div class="budget-card">
        <div class="budget-card-header">
          여행 예산
        </div>
        <div class="budget-card-body">
          <span class="travel-budget">{{ travelBudget }}원</span>
          <span
            class="more-btn"
            @click="goToAssets"
          >더보기</span>
        </div>
      </div>

      <v-btn
        class="recommend-btn"
        :to="{ name: 'Survey' }"
        block
        x-large
      >
        여행지 추천 받으러 가기
      </v-btn>

      <div class="my-trip-card">
        <div class="my-trip-card-header">
          나의 여행지 목록
        </div>

        <div class="my-trip-list">
          <div
            class="my-trip-list-item"
            v-for="item in tripItems"
            :key="item.trvlId"
            @click="goToTrip(item.trvlId)"
          >
            <img
              class="my-trip-item-img"
              :src="item.imgUrl"
              alt="thumbnail"
            >
            <div class="my-trip-item-content">
              <div class="my-trip-item-title">{{ item.trvlName }}</div>
              <div class="my-trip-item-date"> {{ item.trvlStartDt }} - {{ item.trvlEndDt }} </div>
            </div>
            <v-spacer></v-spacer>
            <div class="my-trip-item-arrow">
              <v-icon>mdi-arrow-right</v-icon>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      travelBudget: '1,000,000,000',
      tripItems: [
        {
          trvlId: 1,
          imgUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          trvlName: '프랑스 파리',
          trvlStartDt: '2021.11.27',
          trvlEndDt: '2021.12.2',
        }, {
          trvlId: 1,
          imgUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          trvlName: '일본 오사카',
          trvlStartDt: '2021.11.27',
          trvlEndDt: '2021.12.2',
        },
      ],
    };
  },
  methods: {
    goToTrip(trvlId) {
      // eslint-disable-next-line object-curly-newline
      this.$router.push({ name: 'MyTripDetail', params: { trvlId: trvlId } });
    },
    goToAssets() {
      // eslint-disable-next-line object-curly-newline
      this.$router.push({ name: 'Assets' });
    },
  },
};
</script>

<style scoped>
.home {
  background-color: var(--background);
  padding-bottom: 2rem;
}

.home-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: var(--secondary);
}

.budget-card {
  background-color: white;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.budget-card-header {
  font-weight: 600;
  font-size: 1.4rem;
  padding-top: 1rem;
  padding-bottom: 1.8rem;
}

.budget-card-body {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.travel-budget {
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
}

.more-btn {
  font-size: 0.8rem;
}

.more-btn:hover {
  cursor: pointer;
}

.more-btn:active {
  color: var(--background);
}

.recommend-btn {
  margin: 1rem 0;
  background-color: var(--primary) !important;
  font-weight: 600;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.my-trip-card {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.my-trip-card-header {
  font-weight: 600;
  font-size: 1.4rem;
  padding: 2rem 1rem 1.2rem 1rem;
}

.my-trip-list-item {
  display: flex;
  padding: 1rem;
}

.my-trip-list-item:hover {
  cursor: pointer;
}

.my-trip-list-item:active {
  background-color: var(--background);
}

.my-trip-item-img {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  object-fit: cover;
}

.my-trip-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-trip-item-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

.my-trip-item-date {
  font-size: 0.8rem;
}

.my-trip-item-arrow {
  display: flex;
  justify-content: center;
}
</style>
