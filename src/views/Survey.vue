<template>
  <div class="survey">
    <v-stepper
      v-model="e6"
    >

     <v-stepper-content step="1" class="surveyStepper"
      >
          <h3>{{surveySteps[e6-1]}}</h3>
        <v-text-field
                  v-model="budget_amt"
                  hide-details
                  single-line
                  type="number"
                  suffix="만원"
                />
        </v-stepper-content>
          <v-stepper-content step="2"
           class="surveyStepper"
          >
          <h3>{{surveySteps[e6-1]}}</h3>
            <v-text-field
              v-model="trvl_pd"
              hide-details
              single-line
              type="number"
              suffix="일"
            />
        </v-stepper-content>

        <v-stepper-content step="3"
         class="surveyStepper">
         <h3>{{surveySteps[e6-1]}}</h3>
            <v-radio-group v-model="cmpn_type">
              <v-radio
                v-for="n in 4"
                :key="n"
                :label= cmpnTypeLabels[n-1]
                :value="n"
              ></v-radio>
            </v-radio-group>
        </v-stepper-content>

        <v-stepper-content step="4"
        class="surveyStepper">
        <h3>{{surveySteps[e6-1]}}</h3>
            <v-text-field
              v-model="cmpn_cnt"
              hide-details
              single-line
              type="number"
              suffix="명"
            />
        </v-stepper-content>

        <v-stepper-content step="5"
         class="surveyStepper">
            <h3>{{surveySteps[e6-1]}}</h3>
            <v-radio-group v-model="trvl_main_fctr">
              <v-radio
                v-for="n in 4"
                :key="n"
                :label= trvlMainfctrLabels[n-1]
                :value="n"
              ></v-radio>
            </v-radio-group>
        </v-stepper-content>

    </v-stepper>
        <v-container>
             <v-row align="center"
              justify="center">
          <v-col  v-if="e6 > 1">
          <v-btn
          id = "survey-pre-btn"
          @click="moveQuestion(-1)"
          >
            {{cancelBtnLabel}}
          </v-btn>
          </v-col>
          <v-col>
          <v-btn  v-if="e6 < 5"
            id = "survey-next-btn"
            @click="moveQuestion(1)"
          >
            {{continueBtnLabel}}
          </v-btn>
              <v-btn v-if="e6 == 5"
            id = "survey-next-btn"
            :to = "{name: 'Recommend'}" link
          >
            제출
          </v-btn>
          </v-col>
            </v-row>
    </v-container>

  </div>


</template>
<script>

export default {
  name: 'Survey',
  data() {
    return {
      e6: 1,
      surveySteps: [
        'Q1. 예상하는 여행 예산은 얼마인가요?', 'Q2. 예상하는 여행 기간은 어느정도인가요?', 'Q3. 이번 여행 유형은 어떤가요?', 'Q4. 이번 여행을 같이 가는 사람은 몇명인가요?', 'Q5. 여행에서 가장 중요한 요소가 무엇인가요?',
      ],
      cmpnTypeLabels : ['가족 여행', '친구 여행', '커플 여행', '혼자 여행'],
      trvlMainfctrLabels : ['식비: 맛있는 음식을 많이 먹는 것이 제일 중요하다', '숙박비: 럭셔리하고 좋은 숙박 시설에 지내는 것이 제일 중요하다.', '교통비: 편하고 빠르게 이동하는 것이 제일 중요하다.', '액티비티비: 최대한 많고 다양한 경험을 하는 것이 제일 중요하다.',
      ],
      continueBtnLabel : '다음',
      cancelBtnLabel : '이전',
      budget_amt : '',
      trvl_pd : '',
      cmpn_type : '',
      cmpn_cnt : '',
      trvl_main_fctr : '',
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
.survey {
  background-color: var(--background);
  height: 100vh;
}

.surveyStepper{
  height: 60vh;
  background-color: var(--background);
  color: black;
      display: flex;
    align-items: center;
    justify-content: center;
}

#survey-next-btn{
  background-color: var(--primary) !important;
  color: white;
  width: 100%;
}

#survey-pre-btn{
  background-color: gray;
  width: 100%;
}


.displayToggle{
  display : none;
}

</style>
}