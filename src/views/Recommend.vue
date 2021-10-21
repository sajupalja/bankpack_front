<template>
  <div class="recommend">
    <v-container>
        <h3>{{username}}님께 추천드리는 여행지</h3>
        <v-card class="recommendCard"
                v-for="item in RecommendItems"
                :key="item.cntry_name"
              >
                <v-row>
                    <img class="logo-img" src="../assets/icon.png">
              <v-card-title>{{item.cntry_name}} {{item.city_name}}</v-card-title>
                <v-card-actions>
                    <v-btn
                    v-model=item.city_name
                    :to = "{name: 'Recommend'}" link>
                    추가
                    </v-btn>
                </v-card-actions>

                </v-row>
              </v-card>
    </v-container>

  </div>
</template>

<script>

export default {
  name: 'Survey',
  data() {
    return {
      username: '지누무주',
      RecommendItems: [
        {
          cntry_name:'프랑스', city_name:'파리',
        }, {
          cntry_name:'일본', city_name:'도쿄',
        }, {
          cntry_name:'영국', city_name:'런던',
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

.recommendCard {
  background-color: var(--background);
  margin: 5vh;
}


.displayToggle{
  display : none;
}

.logo-img {
  height: 7vh;
}

</style>
