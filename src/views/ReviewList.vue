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
              <img :src="review.imgUrl" alt="" class="thumbnail-img">
              <div class="review-info">
                <h5>{{review.trvlName}}</h5>
                <p>{{review.trvlEndDt.slice(0,10)}}</p>
                <p>{{review.userName}}</p>
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
}

.review-list-title {
  margin-left: 1rem;
}

.review {
  display: flex;
  margin: 20px;
  padding: 1rem;
  align-items: center;
  cursor: pointer;
}

.review-info {
  margin-left: 1.5rem;
}

.review-info > p {
  margin: 0;
  color: gray;
  font-size: 0.25rem;
}

.review-info > p:nth-child(3) {
  color: black;
}

.thumbnail-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}
</style>