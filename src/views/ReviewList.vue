<template>
  <div class="review-list">
    <div class="search-input-box">
      <v-text-field
        solo
        hide-details
        label="후기를 검색해보세요"
        class="search-input"
      ></v-text-field>
      <v-icon
        large
        class="search-icon"
      >
        mdi-magnify
      </v-icon>
    </div>

    <div class="review-list-box">
      <h3 class="review-list-title">최근 작성 후기</h3>
      <div
        v-for="review in reviewItems"
        :key="review.trvlId"
      >
        <router-link
          class="router-link"
          :to="{ name: 'ReviewInfo', params:{ reviewId: review.trvlId } }"
        >
          <v-card class="review">
            <img src="/" alt="" class="thumbnail-img">
            <div class="review-info">
              <h3>{{review.trvlName}}</h3>
              <p>{{review.trvlEndDt.slice(0,10)}}</p>
              <p>{{review.userName}}</p>
            </div>
          </v-card>
        </router-link>
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
    };
  },
  async mounted () {
    try {
      const fetchReviewData = await this.$axios.get(api.fetchAllReviewsUrl);
      this.reviewItems = fetchReviewData.data;
    } catch (error) {
      this.$router.push({
        name: 'Error',
      });
    }

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
}

.review-list {
  padding-bottom: 2rem;
  background-color: var(--background);
  height: 92vh;
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

.review-info p {
  margin: 0;
}

.review-info > p:nth-child(2) {
    color: gray;
    font-size: .5rem;
}

.thumbnail-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}
</style>