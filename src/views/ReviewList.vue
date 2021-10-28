<template>
  <div class="review-list">
    <div class="search-input-box">
      <v-text-field
        solo
        hide-details
        label="후기를 검색해보세요"
        class="search-input"
        v-model="keyword"
        @keyup.enter='searching'
      ></v-text-field>
      <v-icon
        large
        class="search-icon"
        @click="searching"
      >
        mdi-magnify
      </v-icon>
    </div>

    <div class="review-list-box">
      <div v-if="searchResult" class="search-fail-box">
        <p class="search-message">{{searchResult}}</p>
        <v-btn
          class="go-back-btn"
          elevation="2"
          @click="fetchData"
        >
          돌아가기
        </v-btn>
      </div>
      <div v-else>
        <h3 class="review-list-title">{{ searchState ? '검색 결과' : '최근 후기' }}</h3>
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
                  <p><v-icon class="calendar-icon" x-small>mdi-calendar</v-icon> {{ review.trvlStartDt| moment('YYYY.MM.DD') }} ~ {{review.trvlEndDt| moment('YYYY.MM.DD')}}</p>
                </div>
              </div>
            </v-card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  name: 'ReviewList',
  data () {
    return {
      reviewItems: [],
      keyword:'',
      searchResult: '',
      searchState: false,
    };
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    async fetchData () {
      try {
        const fetchReviewData = await this.$axios.get(api.fetchAllReviewsUrl);
        this.reviewItems = fetchReviewData.data;
        this.searchResult = '';
        this.keyword = '';
      } catch (error) {
        this.$router.push({
          name: 'Error',
        });
      }
    },
    async searching() {
      if (!this.keyword) return;

      try {
        const res = await this.$axios.get(api.searchReviewsUrl + this.keyword);
        const searchList = res.data;
        console.log(searchList);
        if (searchList.length === 0) {
          this.reviewItems = [];
          this.searchResult = '검색 결과가 없습니다.';
        } else {
          this.reviewItems = searchList;
          this.searchResult = '';
          this.searchState = true;
        }
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: 'Error',
        });
      }

    },
  },
};
</script>

<style scoped>
.search-input-box {
  margin: 20px;
  position: relative;
}

.search-icon {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}

.search-fail-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.review-list {
  padding-bottom: 2rem;
  background-color: var(--background);
  height: 100%;
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
  display: flex;
  justify-content: space-between;
}

.review-footer > p {
  margin: 0;
}

.review-footer > p:nth-child(2) {
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