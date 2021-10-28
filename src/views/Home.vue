<template>
  <div class="home">
    <div class="home-header">
      <img
        class="ad-img"
        src="../assets/img/main_ad.gif"
        alt="ad_image"
      >
      <!-- <v-carousel
        class="ad_carousel"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          class="ad_img"
          v-for="(slide, i) in slides"
          :key="i"
          :src="slide"
        >
        </v-carousel-item>
      </v-carousel> -->
    </div>

    <v-container class="home-body">
      <div
        class="budget-card"
        v-if="userName"
      >
        <h3 class="budget-card-header">
          여행 예산
        </h3>
        <div class="budget-card-body">
          <h1 class="travel-budget">{{ travelBudget.toLocaleString({style:'currency'}) }}원</h1>
          <span
            class="more-btn"
            @click="goToAssets"
          >더보기</span>
        </div>
      </div>

      <v-btn
        class="recommend-btn"
        @click="goToSurvey"
        block
        x-large
      >
        여행지 추천 받으러 가기
      </v-btn>

      <div
        class="my-trip-card"
        v-if="userName"
      >
        <div class="my-trip-card-header">
          <span>나의 여행지 목록</span>
          <span
            class="more-btn"
            @click="goToMyTrip"
          >더보기</span>
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
              <div class="my-trip-item-title">{{ item.cntryName }} {{ item.cityName }}</div>
              <div class="my-trip-item-date"> {{ item.trvlStartDt | moment('YYYY.MM.DD') }} - {{ item.trvlEndDt | moment('YYYY.MM.DD') }} </div>
            </div>
            <v-spacer></v-spacer>
            <div class="my-trip-item-arrow">
              <v-icon>mdi-arrow-right</v-icon>
            </div>
          </div>
        </div>
      </div>

      <div
        class="review-list"
        v-else
      >
        <h3 class="review-list-title">최근 후기</h3>
        <div
          v-for="review in reviewItems"
          :key="review.trvlId"
        >
          <router-link
            class="router-link"
            :to="{ name: 'ReviewInfo', params:{ reviewId: review.trvlId } }"
          >
            <v-card class="review">
              <img
                :src="review.imgUrl"
                alt="thumbnail-img"
                class="thumbnail-img"
              >
              <div class="review-info">
                <h4 class="review-title">{{ review.trvlName.length > 17 ? review.trvlName.slice(0, 17) + '...' : review.trvlName }}</h4>
                <div class="review-footer">
                  <p>{{review.userName}}</p>
                  <p><v-icon class="calendar-icon" x-small>mdi-calendar</v-icon> {{ review.trvlStartDt | moment('YYYY.MM.DD') }} ~ {{review.trvlEndDt | moment('YYYY.MM.DD')}}</p>
                </div>
              </div>
            </v-card>
          </router-link>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from '../api/api.js';
// eslint-disable-next-line object-curly-newline
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      travelBudget: 0,
      tripItems: [],
      reviewItems: [],
      slides: ['../assets/img/main_ad.gif', '../assets/img/main_ad2.jpeg'],
    };
  },
  computed: {
    ...mapState(['userName']),
  },
  methods: {
    goToTrip(trvlId) {
      // eslint-disable-next-line object-curly-newline
      this.$router.push({ name: 'MyTripInfo', params: { trvlId: trvlId } });
    },
    goToAssets() {
      // eslint-disable-next-line object-curly-newline
      this.$router.push({ name: 'Assets' });
    },
    goToMyTrip() {
      // eslint-disable-next-line object-curly-newline
      this.$router.push({ name: 'MyTripList' });
    },
    goToSurvey() {
      if (this.userName) {
        // eslint-disable-next-line object-curly-newline
        this.$router.push({ name: 'Survey' });
      } else {
        // eslint-disable-next-line object-curly-newline
        this.$router.push({ name: 'Login' });
      }
    },
    fetchRecentTrips() {
      this.$axios.get(api.myTripList)
        .then(res => this.tripItems = res.data.slice(0, 5))
        .catch(err => console.error(err));
    },
    fetchMyTripAsset() {
      this.$axios.get(api.fetchMyTripAsset)
        .then(res => this.travelBudget = res.data)
        .catch(err => {
          console.error(err);
          this.goToErrorPage;
        });
    },
    goToErrorPage() {
      this.$router.push({
        name: 'Error',
      });
    },
    async fetchReviewData () {
      try {
        const fetchReviewData = await this.$axios.get(api.fetchAllReviewsUrl);
        this.reviewItems = fetchReviewData.data;
      } catch (error) {
        this.$router.push({
          name: 'Error',
        });
      }
    },
  },
  mounted() {
    if (this.userName) {
      this.fetchRecentTrips();
      this.fetchMyTripAsset();
    } else {
      this.fetchReviewData();
    }
  },
};
</script>

<style scoped>
.home {
  background-color: var(--background);
  padding-bottom: 2rem;
}

.home-header {
  background-color: var(--background);
}

.ad-img {
  object-fit: cover;
  width: 100%;
}

.budget-card {
  background-color: white;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: var(--card-border-radius);
}

.budget-card-header {
  padding-top: 1rem;
  padding-bottom: 1.8rem;
}

.budget-card-body {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.travel-budget {
  margin-bottom: 0.6rem;
}

.more-btn {
  font-size: 0.8rem;
  font-weight: 500;
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
  border-radius: var(--card-border-radius);
}

.my-trip-card-header {
  font-weight: 600;
  font-size: 1.4rem;
  padding: 2rem 1rem 1.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 80px;
  height: 80px;
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

.review-list {
  padding-top: 0.6rem;
  padding-bottom: 2rem;
}

.review-list-title {
  margin-left: 1rem;
}

.review {
  display: flex;
  margin: 1rem;
  padding: 1rem;
  align-items: center;
  cursor: pointer;
}

.review-info {
  margin-left: 1rem;
  width: 100%;
}

.review-footer {
  margin-top: 0.4rem;
}

.review-footer > p {
  margin: 0;
}

.review-footer > p:nth-child(2) {
  margin-top: 0.4rem;
  color: gray;
  font-size: 0.8rem;
}

.review-footer > p:nth-child(1) {
  font-size: 0.8rem;
  color: black;
}

.calendar-icon {
  margin-right: 0.2rem;
}

.thumbnail-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0 !important;
}
</style>
