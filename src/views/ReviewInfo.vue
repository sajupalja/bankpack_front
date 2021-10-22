<template>
  <div class="review-detail">
    <div class="title">
      <h2>체코 프라하 3박4일 여행기</h2>
    </div>
    <div class="review-info">
      <v-card class="review-info-left">
        <h5>여행 기간</h5>
        <p>2021-09-28 ~ 2021-10-15</p>
        <h5>여행 인원</h5>
        <p>X 명</p>
        <h5>여행 유형</h5>
        <p>우정여행</p>
      </v-card>
      <div class="review-info-right">
        <div class="review-write-info">
          <p>작성자: 하얀족제비</p>
          <p>작성일: 2021/10/15</p>
        </div>
        <div class="review-expense">
          <h5>총 지출 비용</h5>
          <h2>1000000 원</h2>
        </div>
      </div>
    </div>
    <div class="review-chart">
      <h5 class="chart-title">하얀족제비님의 지출 내역</h5>
      <pie-chart
        :chart-data="chartData"
        :options="chartOptions"
        class="pie-chart"
      />
    </div>
    <div class="review-contents">
      <p>여행 기록</p>
      <hr>
    </div>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.js';

export default {
  name: 'ReviewInfo',
  components: {
    PieChart,
  },
  data () {
    return {
      chartOptions: {
        responsive: true,
        cutoutPercentage: 1,
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            fontFamily: 'paybooc-Medium',
            fontSize: 15,
          },
        },
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
  methods: {},
};
</script>

<style scoped>
.review-detail {
  height: 100%;
  background-color: var(--background);
}

.title {
  margin-top: 2rem;
  margin-left: 2rem;
}

.review-info {
  display: flex;
  justify-content: space-between;
  margin: 2rem;
}

.review-info-left {
  height: 12rem;
  width: 15rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.review-info-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: end;
}

.review-info-left p {
  font-size: .9rem;
}

.review-write-info > p {
  margin: 0;
  color: #8d8d8d;
  font-size: .75rem;
}

.review-expense {
  text-align: end;
}

.review-chart {
  height: 40%;
}

.review-contents {
  margin: 2rem;
}

.pie-chart {
  margin-left: 2rem;
  width: 70vw;
}

.chart-title {
  text-align: center;
  margin-top: 3rem;
}
</style>