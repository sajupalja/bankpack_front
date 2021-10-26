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
      <span>평균지출비용</span> <v-spacer></v-spacer><span>{{parseInt(recommendationItem.avgSpending).toLocaleString({style:'currency'})}} 원</span>
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
            <img v-if="item.thumbnail" :src="item.thumbnail" alt="" class="thumbnail-img">
            <div v-else class="thumbnail-img"></div>
            <div class="review-info">
              <h3>{{item.trvlName}}</h3>
              <p>{{item.trvlStartDt| moment('YYYY년 MM월 DD일') }}</p>
              <p>{{item.trvlEndDt| moment('YYYY년 MM월 DD일') }}</p>
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
      recommendationItem:{
        cntryName:'',
        cityName:'',
        avgSpending : '100000',
        travels : [],
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
          {
            id: 2, name: '식비', label: 'xx',
          }, {
            id: 3, name: '숙비', label: 'xx', //this.chartData.labels[1],
          }, {
            id: 4, name: '교통비', label: 'xx', //this.chartData.labels[2],
          }, {
            id: 5, name: '활동', label: 'xx', //this.chartData.labels[3],
          }, {
            id: 6, name: '기타', label: 'xx', //this.chartData.labels[4],
          },
        ],
      }],

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