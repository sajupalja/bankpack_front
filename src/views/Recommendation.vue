<template>
  <div class="recommend">
    <v-container>
        <h3>{{username}}님께 추천드리는 여행지</h3>

        <v-card class="recommend-list-item"
                v-for="(item,i) in RecommendItems"
                :key="i"
              >
            <img class="recommend-item-img" :src="item.thumbnail" alt="thumbnail">
              <div class="recommend-item-content">
                  <div class="recommend-item-title" >
                     {{item.cntry_name}} {{item.city_name}}
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn class="recommend-item-btn">
                    추가
                    </v-btn>
                  </div>
              </div>
        </v-card>
    </v-container>
          <v-btn
        class="recommend-btn"
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
      RecommendItems: [
        {
          cntry_name:'프랑스', city_name:'파리', thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
        }, {
          cntry_name:'일본', city_name:'도쿄', thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
        }, {
          cntry_name:'영국', city_name:'런던', thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
        },
      ],
      trvl_place_id : '',
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
.recommend {
  background-color: var(--background);
  height: 100vh;
}

.displayToggle{
  display : none;
}

.recommend-list-item {
  display: flex;
  padding: 1rem;
  margin: 2vh;
}

.recommend-item-img {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  object-fit: cover;
}

.recommend-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recommend-item-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

 .recommend-item-btn{
  background-color: white;
  font-weight: 600;
  border: solid var(--primary) 2px;
 }

 .recommend-btn {
  margin: 1rem 0;
  background-color: var(--primary) !important;
  font-weight: 600;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

</style>
