<template>
  <div class="survey">
    <v-form v-model="isFormValid">
      <v-stepper
        v-model="e6"
        style="box-shadow: none;"
      >
        <v-stepper-content
          step="1"
          class="surveyStepper"
        >
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_OdVhgq.json"
            background="transparent"
            speed="1"
            class="question-lottie"
            loop
            autoplay
          ></lottie-player>
          <h3 class="question-text">{{surveySteps[e6-1]}}</h3>
          <v-text-field
            class="question-text-field"
            :value="surveyResult.budgetAmt"
            single-line
            :rules="[numberRule]"
            ref = "budgetAmt_form"
            @input="numFilter"
            suffix="원"
          />
        </v-stepper-content>
        <v-stepper-content
          step="2"
          class="surveyStepper"
        >
          <lottie-player
            src="https://assets10.lottiefiles.com/private_files/lf30_8ry7qrbu.json"
            background="transparent"
            speed="1"
            class="question-lottie"
            loop
            autoplay
          ></lottie-player>
          <h3 class="question-text">{{surveySteps[e6-1]}}</h3>
          <v-text-field
            class="question-text-field"
            :value="surveyResult.trvlPd"
            single-line
            :rules="[numberRule]"
            @input="numFilter"
            ref = "trvlPd_form"
            suffix="일"
          />
        </v-stepper-content>

        <v-stepper-content
          step="3"
          class="surveyStepper"
        >
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_ogx9s7qo.json"
            background="transparent"
            speed="1"
            class="question-lottie"
            loop
            autoplay
          ></lottie-player>
          <h3 class="question-text">{{surveySteps[e6-1]}}</h3>
          <v-radio-group
            v-model="surveyResult.cmpnType"
            class="surveyRadio"
          >
            <v-radio
              v-for="n in 4"
              :key="n"
              :label= cmpnTypeLabels[n-1]
              :value="n"
            ></v-radio>
          </v-radio-group>
        </v-stepper-content>

        <v-stepper-content
          step="4"
          class="surveyStepper"
        >
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_5e7wgehs.json"
            background="transparent"
            speed="1"
            class="question-lottie"
            loop
            autoplay
          ></lottie-player>
          <h3 class="question-text">{{surveySteps[e6-1]}}</h3>
          <v-text-field
            class="question-text-field"
            :value="surveyResult.cmpnCnt"
            single-line
            :rules="[numberRule]"
            @input="numFilter"
            ref = "cmpnCnt_form"
            suffix="명"
          />
        </v-stepper-content>

        <v-stepper-content
          step="5"
          class="surveyStepper"
        >
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_x9h8ar8l.json"
            background="transparent"
            speed="1"
            class="question-lottie"
            loop
            autoplay
          ></lottie-player>
          <h3 class="question-text">{{surveySteps[e6-1]}}</h3>
            <v-radio-group
              v-model="surveyResult.trvlMainFctr"
              class="surveyRadio"
            >
              <v-radio
                v-for="n in 4"
                :key="n"
                :label= trvlMainfctrLabels[n-1]
                :value="n"
              ></v-radio>
            </v-radio-group>
        </v-stepper-content>
      </v-stepper>

      <div class="survey-btns">
        <v-row
          align="center"
          justify="center"
        >
          <v-col v-if="e6 > 1">
            <v-btn
              id = "survey-pre-btn"
              @click="moveQuestion(-1)"
              :disabled="!isFormValid"
              color="grey"
              large
            >
              {{cancelBtnLabel}}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              v-if="e6 < 5"
              id = "survey-next-btn"
              @click="moveQuestion(1)"
              :disabled="!isFormValid"
              color="primary"
              large
            >
              {{continueBtnLabel}}
            </v-btn>
            <v-btn
              v-if="e6 == 5"
              id = "survey-submit-btn"
              :to="{ name: 'Recommendation', params:{ surveyResult: this.surveyResult } }"
              :disabled="!isFormValid"
              color="error"
              large
            >
              제출
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>
<script>

export default {
  name: 'Survey',
  data() {
    return {
      e6: 1,
      isFormValid : false,
      surveySteps: [
        'Q1. 예상하는 여행 예산은 얼마인가요?', 'Q2. 예상하는 여행 기간은 어느정도인가요?', 'Q3. 이번 여행 유형은 무엇인가요?', 'Q4. 여행을 같이 가는 사람은 몇 명인가요?', 'Q5. 여행에서 가장 중요한 요소가 무엇인가요?',
      ],
      cmpnTypeLabels : ['가족 여행', '친구 여행', '커플 여행', '혼자 여행'],
      trvlMainfctrLabels : ['음식: 맛있는 음식을 많이 먹는 것이 제일 중요하다.', '숙소: 럭셔리하고 좋은 숙박 시설에 지내는 것이 제일 중요하다.', '이동수단: 편하고 빠르게 이동하는 것이 제일 중요하다.', '경험: 최대한 많고 다양한 경험을 하는 것이 제일 중요하다.',
      ],
      continueBtnLabel : '다음',
      cancelBtnLabel : '이전',
      userId : 1,
      surveyResult : {
        budgetAmt : 1000000,
        trvlPd : 3,
        cmpnType : 1,
        cmpnCnt : 2,
        trvlMainFctr : 1,
      }
      ,
      numberRule: v => {
        if (isNaN(parseInt(v))) return '값을 입력해주세요';
        if (v <= 0) return '0 이상의 값을 입력해주세요';
        if ((this.e6 == 2 || this.e6 == 4) && ( v > 999)) return '999 이하로 작성해주세요';
        return true;
      },
      radioRule: v => {
        if (v) return true;
        return '값을 선택해주세요';
      },
    };
  },
  methods:{
    moveQuestion(btnType){
      this.e6 += btnType;
    },

    numFilter(val){
      val = val.replace(/[^0-9]/g, '');
      var field = this.$refs.budgetAmt_form;
      switch (this.e6){
      case 1:
        this.surveyResult.budgetAmt = val;
        break;
      case 2:
        field = this.$refs.trvlPd_form;
        this.surveyResult.trvlPd = val;
        break;
      case 4:
        field = this.$refs.cmpnCnt_form;
        this.surveyResult.cmpnCnt = val;
        break;

      }

      console.log(field);
      field.lazyValue = val;
    },
  },
};
</script>

<style scoped>
.survey {
  background-color: var(--background);
  height: 92vh;
}

.surveyStepper {
  height: 80vh;
  background-color: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-text {
  margin-top: 1.6rem;
}

.question-text-field {
  width: 80%;
  margin: auto;
}

.question-text-field >>> input {
  text-align: center;
}

.question-lottie {
  width: 240px;
  height: 240px;
  margin: auto;
}

.surveyRadio {
  margin: 10px;
}

.survey-btns {
  margin: 0 2rem;
}

#survey-next-btn{
  color: white;
  width: 100%;
  font-weight: 600;
}

#survey-pre-btn{
  color: white;
  width: 100%;
  font-weight: 600;
}
#survey-submit-btn{
  color: white;
  width: 100%;
  font-weight: 600;
}
</style>