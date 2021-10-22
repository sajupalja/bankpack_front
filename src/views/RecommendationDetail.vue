<template>
  <div class="recommendation-detail">
    <div class="header">
      <img
        class="header-img"
        src="https://lp-cms-production.imgix.net/2021-03/shutterstock_304631102.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850"
        alt="header-image"
      >
    </div>
    <div class="body-content">
        <h3 id="recommend-title">
        {{recommendationItem.cntry_name}} {{recommendationItem.city_name}}
        </h3>
    <div class="spending-pie-chart-container">
      <pie-chart
        class="spending-pie-chart"
        :chart-data="chartData"
        :options="chartOptions"
      ></pie-chart>
    </div>
    <h4>
        {{recommendationItem.cntry_name}} {{recommendationItem.city_name}}의 추천 후기
    </h4>
    <hr>
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
import PieChart from '../components/PieChart.js';

export default {
  name: 'RecommendationDetail',
  components: {
    PieChart,
  },
  data() {
    return {
      recommendationItem:{
        cntry_name:'프랑스',
        city_name:'파리',
      },
      chartData: {
        hoverBorderWidth: 10,
        labels: ['식비', '숙비', '교통비', '활동', '기타'],
        datasets: [
          {
            label: '카테고리별 지출',
            backgroundColor: ['#2878A0', '#FAF8D4', '#BBDDFF', '#EF8354', '#242038'],
            data: [0.1, 0.2, 0.3, 0.3, 0.1],
          },
        ],
      },
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
.recommendation-detail {
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

#recommend-title{
    position: relative;
    color: whitesmoke;
    text-shadow:1px 1px 1px #000;
    top: -4vh;
}
.body-content {
  position: relative;
  top: -5vh;
  background-color: var(--background);
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}

.spending-pie-chart-container {
  margin: 1.4rem auto;
  width: 65vw;
}

.review {
  display: flex;
  margin: 20px;
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  transition: .2s ease;
}

.review:hover {
  background-color: var(--shadow);
  transform: scale(1.05);
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

.thumbnail-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}

</style>