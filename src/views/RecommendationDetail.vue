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

</style>