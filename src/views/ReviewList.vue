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
        v-for="item in reviewItems"
        :key="item.id"
      >
        <router-link
          class="router-link"
          :to="{ name: 'ReviewInfo', params:{ reviewId: item.id} }"
        >
          <v-card class="review">
            <img v-if="item.thumbnail" :src="item.thumbnail" alt="" class="thumbnail-img">
            <div v-else class="thumbnail-img"></div>
            <div class="review-info">
              <h3>{{item.title}}</h3>
              <p>{{item.date}}</p>
              <p>{{item.writer}}</p>
            </div>
          </v-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewList',
  data () {
    return {
      reviewItems: [
        {
          id: 1, title: '프라하 여행', thumbnail: 'https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_22175/20200403063015_QVE1e/jpg', date: '2021-02-03', writer: '하얀족제비',
        }, {
          id: 2, title: '미국 여행', thumbnail: '', date: '2021-02-03', writer: '까만 족제비',
        }, {
          id: 3, title: '런던 여행', thumbnail: '', date: '2021-02-03', writer: '무지개 족제비',
        },
      ],
    };
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
  font-size: .8rem;
}

.thumbnail-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}
</style>