<template>
  <div class="recommendation">
    <v-container>
        <h3>{{username}}님께 추천드리는 여행지</h3>
        <div
            v-for="(item,i) in recommendationItems"
            :key="i">
            <router-link
              class="router-link"
              :to="{ name: 'RecommendationDetail', params:{ recommendationId: item.id} }"
            >
        <v-card class="recommendation-list-item">
            <img class="recommendation-item-img" :src="item.thumbnail" alt="thumbnail">
              <div class="recommendation-item-content">
                  <div class="recommendation-item-title" >
                     {{item.cntry_name}} {{item.city_name}}
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn class="recommendation-item-btn"
                    :to = "{name: 'Survey'}" link>
                    추가
                    </v-btn>
                  </div>
              </div>

        </v-card>
        </router-link>
         </div>
    </v-container>
          <v-btn
        class="recommendation-btn"
        block
        x-large
        :to = "{name: 'Survey'}" link
      >
        다시 추천 받으러 가기
      </v-btn>
  </div>
</template>

<script>

export default {
  name: 'Recommendation',
  data() {
    return {
      username: '지누무주',
      recommendationItems: [
        {
          id:'1', cntry_name:'프랑스', city_name:'파리', thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
        }, {
          id:'2', cntry_name:'일본', city_name:'도쿄', thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
        }, {
          id:'3', cntry_name:'영국', city_name:'런던', thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
        },
      ],
    };
  },
  methods:{
    moveQuestion(btnType){
      this.e6 += btnType;
    },
  },
  watch : {},

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
  padding: 1rem;
  margin: 2vh;
}

.recommendation-item-img {
  width: 100px;
  height: 100px;
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
  margin-bottom: 0.4rem;
}

 .recommendation-item-btn{
  background-color: white;
  font-weight: 600;
  border: solid var(--primary) 2px;
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
