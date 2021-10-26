<template>
  <div class="recommendation-detail">
    <div class="header">
      <img
        class="header-img"
        :src="recommendationItem.imgUrl"
        alt="header-image"
      >
    </div>
    <div class="body-content">
        <h3 id="recommend-title">
        {{recommendationItem.cntryName}} {{recommendationItem.cityName}}
        </h3>
    <div class="spending-pie-chart-container">
      <pie-chart
        class="spending-pie-chart"
        :chart-data="chartData"
        :options="chartOptions"
      ></pie-chart>
    </div>
    <h3 class="body-title">
      <span>평균지출비용</span> <v-spacer></v-spacer><span>{{parseInt(recommendationItem.avgTotalPayAmt).toLocaleString({style:'currency'})}} 원</span>
    </h3>
    <v-treeview :items="treeviewItems" open-on-click>
      <template  slot="label" slot-scope="props">
        <div  style="display:flex">
        {{props.item.name}}<v-spacer></v-spacer>{{props.item.label}}
        </div>
      </template>
       </v-treeview>
    <h4  class="body-title">
        {{recommendationItem.cntryName}} {{recommendationItem.cityName}}의 추천 후기
    </h4>
    <v-divider></v-divider>
        <div
        v-for="item in recommendationItem.travels"
        :key="item.trvlId">
        <router-link
          class="router-link"
          :to="{ name: 'ReviewInfo', params:{ reviewId: item.trvlId} }"
        >
          <v-card class="review">
            <img v-if="item.imgUrl" :src="item.imgUrl" alt="" class="thumbnail-img">
            <div v-else class="thumbnail-img"></div>
            <div class="review-info">
              <h3>{{item.trvlName}}</h3>
              <p>{{item.trvlStartDt| moment('YYYY년 MM월 DD일') }} - {{item.trvlEndDt| moment('YYYY년 MM월 DD일') }}</p>
              <!--<p>{{item.trvlEndDt| moment('YYYY년 MM월 DD일') }}</p>-->
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
    fetchRecommendationDetail() {
      this.$axios.post(api.recommendationDetail, {
        cntryId : this.$route.params.cntryId,
        cityId : this.$route.params.cityId,
        clstrLabel : this.$route.params.clstrLabel,
      })
        .then(res => {
          console.log(res.data);
          this.recommendationItem = res.data;
          // ['식비', '숙박비', '교통비', '활동', '기타']
          this.chartData.datasets[0].data = [this.recommendationItem.avgFoodRate, this.recommendationItem.avgRoomRate, this.recommendationItem.avgTrffRate, this.recommendationItem.avgActRate, this.recommendationItem.avgEtcRate ];
          this.treeviewItems[0].children = [
            {
              id: 2, name: '식비', label: this.recommendationItem.avgFoodAmt,
            }, {
              id: 3, name: '숙박비', label: this.recommendationItem.avgRoomAmt,
            }, {
              id: 4, name: '교통비', label: this.recommendationItem.avgTrffAmt,
            }, {
              id: 5, name: '활동', label: this.recommendationItem.avgActAmt,
            }, {
              id: 6, name: '기타', label: this.recommendationItem.avgEtcAmt,
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

#recommend-title{
    position: relative;
    color: whitesmoke;
    text-shadow:1px 1px 1px #000;
    top: -4vh;
    margin : 5px;
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

.body-title{
  display:flex;
  margin:10px;
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
  font-size: .5rem;
}


.thumbnail-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}

</style>