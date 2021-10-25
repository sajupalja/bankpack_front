<template>
  <div class="review-list">
    <div class="search-input-box">
      <v-text-field
        solo
        label="search"
        class="search-input"
      ></v-text-field>
    </div>
    <div class="review-list-box">
      <div
        v-for="item in reviewItems"
        :key="item.id">
        <router-link
          class="router-link"
          :to="{ name: 'ReviewInfo', params:{ reviewId: item.id} }"
        >
          <v-card class="review">
            <img v-if="item.thumbnail" :src="item.thumbnail" alt="" class="thumbnail-img">
            <div v-else class="thumbnail-img"></div>
            <div class="review-info">
              <h2>{{item.title}}</h2>
              <p>{{item.date}}</p>
              <p>{{item.desc}}</p>
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
          id: 1, title: '프라하 여행', thumbnail: 'https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_22175/20200403063015_QVE1e/jpg', date: '2021-02-03', desc: 'no contents',
        }, {
          id: 2, title: '미국 여행', thumbnail: '', date: '2021-02-03', desc: 'no contents',
        }, {
          id: 3, title: '런던 여행', thumbnail: '', date: '2021-02-03', desc: 'no contents',
        },
      ],
    };
  },
};
</script>

<style scoped>
.review-list {
  height: 100%;
  background-color: var(--background);
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
  font-size: .5rem;
}

.search-input-box {
  margin: 20px;
}

.thumbnail-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}
</style>