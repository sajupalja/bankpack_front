<template>
  <div class="review-detail">
    <div class="header">
      <img
        class="header-img"
        :src="trvlInfo.imgUrl"
        alt="header-image"
      >
      <v-btn
        class="back-btn"
        @click="goBack"
        icon
      >
        <v-icon large color="font">mdi-chevron-left</v-icon>
      </v-btn>
      <div class="trvl-title">
        <h1 class="trip-destination">{{ trvlInfo.cntryName }} {{ trvlInfo.cityName }}</h1>
      </div>
    </div>

    <div class="body">
      <div class="trip-name">
        <h2>{{ trvlInfo.trvlName }}</h2>
      </div>
      <div class="review-write-info">
        <p>작성자: {{ trvlInfo.userName }}</p>
      </div>

      <div class="review-info-card">
        <div class="trip-start-date" v-if="trvlInfo.trvlStartDt"><span class="trip-info-item">여행 시작일:</span> {{ trvlInfo.trvlStartDt | moment('YYYY년 MM월 DD일') }}</div>
        <div class="trip-end-date" v-if="trvlInfo.trvlStartDt"><span class="trip-info-item">여행 종료일:</span> {{ trvlInfo.trvlEndDt | moment('YYYY년 MM월 DD일') }}</div>
        <div class="trip-ppl-cnt"><span class="trip-info-item">여행 종료일:</span> {{ trvlInfo.cmpnCnt }}</div>
        <div class="trip-type"><span class="trip-info-item">여행 유형:</span> {{ getTripType(trvlInfo.cmpnType) }}</div>
      </div>

      <div class="review-chart">
        <h3 class="chart-title">{{ trvlInfo.userName }}님의 지출 내역</h3>
        <div class="review-expense-info">
          <div class="review-expense">
            <h5>총 지출 비용</h5>
            <h2 v-if="trvlInfo.totalPayAmt">{{ trvlInfo.totalPayAmt.toLocaleString() }} 원</h2>
          </div>
        </div>
        <pie-chart
          :chart-data="chartData"
          :options="chartOptions"
          class="pie-chart"
        />
      </div>

      <v-divider></v-divider>

      <div class="timeline-container">
        <v-timeline
          v-if="trvlInfo.trvVO.length"
          dense
        >
          <v-timeline-item
            class="timeline-item"
            v-for="review in trvlInfo.trvVO"
            :key="review.trvlRevwId"
            small
          >
            <span class="timeline-date">{{ review.trvlDt | moment('YYYY년 MM월 DD일') }}</span>
            <div class="timeline-card">
              <v-img
                v-if="review.imgUrl"
                class="review-img"
                :src="review.imgUrl"
              ></v-img>
              <div
                class="timeline-content"
                v-html="review.revwText"
              ></div>
              <v-divider class="timeline-card-divider"></v-divider>
              <div class="timeline-footer">
                <span>작성일: {{ review.writeDate | moment('YYYY년 MM월 DD일') }}</span>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>

        <div
          class="no-timeline"
          v-else
        >
          <h3>여행 후기가 없네요!</h3>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.js';
import api from '../api/api';

export default {
  name: 'ReviewInfo',
  components: {
    PieChart,
  },
  data () {
    return {
      trvlInfo: {},
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
      chartData: null,
    };
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchData() {
      const reviewId = this.$route.params.reviewId;
      const res = await this.$axios.get(api.fetchReviewUrl + reviewId);
      const reviewDetailData = res.data;
      console.log(reviewDetailData);
      const {
        cntryName,
        cityName,
        trvlName,
        trvlStartDt,
        trvlEndDt,
        cmpnCnt,
        cmpnType,
        userName,
        totalPayAmt,
        totalActRate,
        totalEtcRate,
        totalFoodRate,
        totalRoomRate,
        totalTrffRate,
        imgUrl,
        trvVO,
      } = reviewDetailData;

      const trvlInfo = {
        cntryName,
        cityName,
        trvlName,
        trvlStartDt,
        trvlEndDt,
        cmpnCnt,
        cmpnType,
        userName,
        totalPayAmt,
        imgUrl,
        trvVO,
      };

      const rateList = [totalFoodRate, totalRoomRate, totalTrffRate, totalActRate, totalEtcRate];

      this.trvlInfo = trvlInfo;
      this.updateChartData(rateList);
    },
    getTripType(type) {
      switch (type) {
      case '1':
        return '가족 여행';
      case '2':
        return '친구 여행';
      case '3':
        return '커플 여행';
      case '4':
        return '홀로여행';
      default:
        return '-';
      }
    },
    updateChartData(info) {
      this.chartData = {
        hoverBorderWidth: 10,
        labels: ['식비', '숙박비', '교통비', '활동', '기타'],
        datasets: [
          {
            label: '카테고리별 지출',
            backgroundColor: ['#2878A0', '#FAF8D4', '#BBDDFF', '#EF8354', '#242038'],
            data: info,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.header {
  height: 30vh;
}

.header-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.back-btn {
  position: absolute;
  top: 9vh;
  left: 0.2rem;
}

.trvl-title {
  position: relative;
  top: -110px;
  padding-top: 0.2rem;
  padding-bottom: 1.4rem;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 30%, rgba(74,74,74,0.6) 77%, rgba(147,147,147,0.2) 99%);
}

.trip-destination {
  margin-left: 1rem;
  color: white;
}

.title {
  margin-left: 1rem;
  color: white;
}

.body {
  background-color: var(--background);
  position: relative;
  top: -50px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 1.6rem 1rem 1rem 1rem;
  height: 100%;
}

.trip-name {
  text-align: center;
}

.title > h5 {
  font-size: 1.25rem;
}

.review-write-info {
  text-align: right;
  margin: 1rem 0;
}

.review-write-info > p {
  margin: 0;
  color: var(--grey);
  font-size: 0.8rem;
}

.review-info-card {
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--card-border-radius);
}

.trip-info-item {
  font-weight: 600;
}

.review-expense-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: end;
  margin-top: 1rem;
}

.review-expense {
  text-align: end;
}

.chart-title {
  text-align: center;
  margin-top: 2rem;
}

.pie-chart {
  width: 70vw;
  margin: 0 auto;
}

.review-contents {
  margin: 2rem;
}

.timeline-container {
  margin: 1rem 0;
}

.timeline-date {
  font-size: 0.8rem;
  color: var(--grey);
  margin-left: 0.6rem;
}

.timeline-card {
  margin-left: 0.6rem;
  padding: 1rem 0.8rem 0.4rem 0.8rem;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--card-border-radius);
}

.review-img {
  margin-bottom: 0.6rem;
}

.timeline-card-divider {
  margin: 0.6rem 0 0.4rem 0;
}

.timeline-footer {
  font-size: 0.8rem;
  text-align: right;
}

.no-timeline {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-top: 0.8rem;
}
</style>