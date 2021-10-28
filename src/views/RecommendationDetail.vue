<template>
  <div class="recommendation-detail">
    <div class="header">
      <img
        class="header-img"
        :src="recommendationItem.imgUrl"
        alt="header-image"
      >
      <div class="trip-destination-overlay">
        <h1 class="trip-destination">{{ recommendationItem.cntryName }} {{ recommendationItem.cityName }}</h1>
      </div>
    </div>

    <div class="body-content">
      <h2>예상 지출 비용</h2>
      <div class="spending-pie-chart-container">
        <pie-chart
          class="spending-pie-chart"
          :chart-data="chartData"
          :options="chartOptions"
        ></pie-chart>
      </div>
      <h3 class="body-title">
        <span>평균지출비용</span>
        <v-spacer></v-spacer>
        <span class="estimated-total-amt">{{ parseInt(recommendationItem.avgTotalPayAmt).toLocaleString({style:'currency'}) }} 원</span>
      </h3>
      <v-treeview
        class="spending-treeview"
        :items="treeviewItems"
        open-on-click
      >
        <template
          slot="label"
          slot-scope="props"
        >
          <div style="display:flex">
            <v-icon class="category-icon" small>{{ props.item.icon }}</v-icon>{{ props.item.name }}<v-spacer></v-spacer>{{ props.item.label }}
          </div>
        </template>
      </v-treeview>

      <h3 class="body-title">
        {{recommendationItem.cntryName}} {{recommendationItem.cityName}} 여행 후기
      </h3>
      <v-divider></v-divider>
      <div
        v-for="item in recommendationItem.travels"
        :key="item.trvlId"
      >
        <router-link
          class="router-link"
          :to="{ name: 'ReviewInfo', params:{ reviewId: item.trvlId} }"
        >
          <v-card class="review">
            <img v-if="item.imgUrl" :src="item.imgUrl" alt="thumbnail-img" class="thumbnail-img">
            <div v-else class="thumbnail-img"></div>
            <div class="review-info">
              <h4 class="review-title">{{ item.trvlName.length > 17 ? item.trvlName.slice(0, 17) + '...' : item.trvlName }}</h4>
              <div class="review-footer">
                <p>{{item.userName}}</p>
                <p><v-icon class="calendar-icon" x-small>mdi-calendar</v-icon> {{ item.trvlStartDt | moment('YYYY.MM.DD') }} ~ {{item.trvlEndDt | moment('YYYY.MM.DD')}}</p>
              </div>
            </div>
          </v-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.js';
import api from '../api/api.js';

export default {
  name: 'RecommendationDetail',
  components: {
    PieChart,
  },
  data() {
    return {
      recommendationItem:{},
      avgSpending:10000,
      chartData: {
        hoverBorderWidth: 10,
        labels: ['식비', '숙박비', '교통비', '활동', '기타'],
        datasets: [
          {
            label: '카테고리별 지출',
            backgroundColor: ['#2878A0', '#FAF8D4', '#BBDDFF', '#EF8354', '#242038'],
            data: [0.1, 0.2, 0.3, 0.3, 0.1],
          },
        ],
      },
      chartOptions: {
        cutoutPercentage: 0,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 15,
            fontFamily: 'paybooc-Medium',
          },
        },
      },
      treeviewItems:[{
        id: 1,
        name:'카테고리별 평균지출 금액',
        children: [

        ],
      }],

    };
  },
  methods: {
    getCurrency(value) {
      // eslint-disable-next-line object-curly-newline
      return value.toLocaleString({style:'currency'});
    },
    fetchRecommendationDetail() {
      this.$axios.post(api.recommendationDetail, {
        cntryId : this.$route.query.cntryId,
        cityId : this.$route.query.cityId,
        clstrLabel : this.$route.query.clstrLabel,
      })
        .then(res => {
          console.log(res.data);
          this.recommendationItem = res.data;
          // ['식비', '숙박비', '교통비', '활동', '기타']
          this.chartData.datasets[0].data = [this.recommendationItem.avgFoodRate, this.recommendationItem.avgRoomRate, this.recommendationItem.avgTrffRate, this.recommendationItem.avgActRate, this.recommendationItem.avgEtcRate ];
          this.treeviewItems[0].children = [
            {
              id: 2, icon: 'mdi-food-drumstick', name: '식비', label: this.getCurrency(this.recommendationItem.avgFoodAmt) + ' 원',
            }, {
              id: 3, icon: 'mdi-bed-empty', name: '숙박비', label: this.getCurrency(this.recommendationItem.avgRoomAmt) + ' 원',
            }, {
              id: 4, icon: 'mdi-bus', name: '교통비', label: this.getCurrency(this.recommendationItem.avgTrffAmt) + ' 원',
            }, {
              id: 5, icon: 'mdi-ticket-confirmation', name: '활동', label: this.getCurrency(this.recommendationItem.avgActAmt) + ' 원',
            }, {
              id: 6, icon: 'mdi-minus', name: '기타', label: this.getCurrency(this.recommendationItem.avgEtcAmt) + ' 원',
            },
          ];
        })
        .catch(err => console.error(err));
    },
  },
  mounted() {
    this.fetchRecommendationDetail();
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

.trip-destination-overlay {
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

.body-content {
  position: relative;
  top: -50px;
  background-color: var(--background);
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 1.6rem;
}

.spending-pie-chart-container {
  margin: 1.4rem auto;
  width: 65vw;
}

.body-title {
  display: flex;
  margin: 0.4rem 0;
  align-items: baseline;
}

.estimated-total-amt {
  font-size: 1.6rem;
}

.spending-treeview {
  padding: 0 !important;
}

.category-icon {
  margin-right: 0.6rem;
}

.review {
  display: flex;
  margin: 1rem 0;
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

.review-info p {
  margin: 0;
  font-size: .8rem;
  color: var(--grey);
}

.thumbnail-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0 !important;
}

</style>