<template>
  <div class="recommendation">
    <v-container>
        <h3>{{ username }}님께 추천드리는 여행지</h3>
        <div
          v-for="(item,i) in recommendationItems"
          :key="i"
        >
          <router-link
            class="router-link"
            :to="{ name: 'RecommendationDetail', params:{ cityId: item.cityId, cntryId:item.cntryId, clstrLabel:item.clstrLabel,} }"
          >
            <v-card class="recommendation-list-item">
              <img
                class="recommendation-item-img"
                :src="item.imgUrl"
                alt="thumbnail"
              >
              <div class="recommendation-item-content">
                <div class="recommendation-item-title">
                  {{item.cntryName}} {{item.cityName}}
                </div>
              </div>
              <v-btn
                class="recommendation-item-btn"
                :to = "{name: 'MyTripList'}"
                link
              >
                추가
              </v-btn>
            </v-card>
          </router-link>
         </div>
      <v-btn
        class="recommendation-btn"
        block
        x-large
        :to = "{name: 'Survey'}"
        link
      >
        다시 추천 받으러 가기
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import api from '../api/api.js';
export default {
  name: 'Recommendation',
  data() {
    return {
      username: '지누무주',
      recommendationItems: [
      ],
    };
  },
  methods:{
    moveQuestion(btnType){
      this.e6 += btnType;
    },
    fetchRecommendation() {

      this.$axios.post(api.recommendResult, {
        budgetAmt: this.$route.params.budgetAmt,
        cmpnCnt:this.$route.params.cmpnCnt,
        cmpnType:this.$route.params.cmpnType,
        trvlMainFctr:this.$route.params.trvlMainFctr,
        trvlPd:this.$route.params.trvlPd,
        userId:this.$route.params.userId,
      })
        .then(res => {
          console.log(this.$route.params);
          console.log(res.data);
          this.recommendationItems = res.data;
        })
        .catch(err => console.error(err));
    },
  },
  mounted() {
    this.fetchRecommendation();
  },

};
</script>

<style scoped>
.recommendation {
  background-color: var(--background);
  height: 100vh;
}

.displayToggle{
  display : none;
}

.recommendation-list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 2vh 0;
}

.recommendation-item-img {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  object-fit: cover;
}

.recommendation-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recommendation-item-title {
  font-weight: 600;
  font-size: 1.2rem;
}

 .recommendation-item-btn {
  background-color: white;
  font-weight: 600;
  border: solid var(--primary) 2px;
  margin-left: auto;
 }

 .recommendation-btn {
  margin: 1rem 0;
  background-color: var(--primary) !important;
  font-weight: 600;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

</style>
