<template>
  <div class="survey">
    <h1>여행 설문 조사</h1>    
    <v-stepper 
      v-model="e6"
      vertical
      >
        <v-stepper-step
          :complete="e6 > 1"
          step="1"
        >
          {{surveySteps[0]}}
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>
  
          <v-btn
            color="primary"
            @click="e6 = 2"
          >
            {{continueBtnLabel}}
          </v-btn>
  
          <v-btn text>
            {{cancelBtnLabel}}
          </v-btn>
        </v-stepper-content>

        <v-divider></v-divider>
  
        <v-stepper-step
          :complete="e6 > 2"
          step="2"
        >
          {{surveySteps[1]}}
        </v-stepper-step>

          <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>
  
          <v-btn
            color="primary"
            @click="e6 = 3"
          >
            {{continueBtnLabel}}
          </v-btn>
  
          <v-btn text>
            {{cancelBtnLabel}}
          </v-btn>
        </v-stepper-content>
  
        <v-divider></v-divider>
  
        <v-stepper-step           
          step="3">
          {{surveySteps[2]}}
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>
  
          <v-btn
            color="primary"
            @click="e6 = 1"
          >
            {{continueBtnLabel}}
          </v-btn>
  
          <v-btn text>
            {{cancelBtnLabel}}
          </v-btn>
        </v-stepper-content>
    </v-stepper>
  </div>



</template>

<script>

export default {
  name: 'Survey',
  data() {
    return {
      e6: 1,
      surveySteps: [
        "Q1. 예상하는 여행 예산은 얼마인가요? (단윈: 만원)",
        "Q2. 예상하는 여행 기간은 어느정도인가요?",
        "Q3. 이번 여행 유형은 어떤가요?",
        "Q4. 이번 여행을 같이 가는 사람은 몇명인가요?",
        "Q5. 여행에서 가장 중요한 요소가 무엇인가요?"

      ],
      continueBtnLabel : "다음",
      cancelBtnLabel : "취소",
    }
  },
}
</script>

<style scoped>
.survey {
  background-color: var(--background);
  height: 100vh;
}
</style>
