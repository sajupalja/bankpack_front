<template>
  <div class="myTripUpdate">
    <div class="myTripSurvey">
    <v-form v-model="isFormValid">

          <h3>{{surveySteps[0]}}</h3>
                  <v-text-field
                  v-model="sendingMyTripInfo.trvlName"
                  single-line
                  :rules="[nullRule]"
                />

          <h3>{{surveySteps[1]}}</h3>
                  <v-text-field
                  :value="sendingMyTripInfo.budgetAmt"
                  single-line
                  :rules="[numberRule]"
                  ref = "budgetAmt_form"
                  @input="numFilter"
                  suffix="만원"
                />

         <h3>{{surveySteps[2]}}</h3>
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="true"
              :nudge-left="30"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="sendingMyTripInfo.trvlStartDt"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  solo
                  label="여행시작일"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="sendingMyTripInfo.trvlStartDt"
                color="primary"
                no-title
                scrollable
              >
              </v-date-picker>
              </v-menu>
              <v-menu
              v-model="dateMenu2"
              :close-on-content-click="true"
              :nudge-left="30"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="sendingMyTripInfo.trvlEndDt"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  solo
                  label="여행종료일"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="sendingMyTripInfo.trvlEndDt"
                color="primary"
                no-title
                scrollable
              >
              </v-date-picker>
            </v-menu>

        <h3>{{surveySteps[3]}}</h3>
                    <v-radio-group v-model="sendingMyTripInfo.cmpnType"  class="surveyRadio">
              <v-radio
                v-for="n in 4"
                :key="n"
                :label= cmpnTypeLabels[n-1]
                :value="n"
              ></v-radio>
            </v-radio-group>


            <h3>{{surveySteps[4]}}</h3>
            <v-text-field
              :value="sendingMyTripInfo.cmpnCnt"
              single-line
              :rules="[cmpnCntRule]"
              @input="numFilter2"
              ref = "cmpnCnt_form"
              suffix="명"
            />

        <v-container class="survey-btns">
             <v-row align="center"
              justify="center">
          <v-col>
              <v-btn
            id = "survey-submit-btn"
            @click="goToMyTrip()"
            :disabled="!isFormValid"
          >
            제출
          </v-btn>
          </v-col>
            </v-row>
    </v-container>
  </v-form>
  </div>
</div>

</template>
<script>
import api from '../api/api.js';
export default {
  name: 'MyTripUpdate',
  data() {
    return {
      tripInfo :{},
      surveyResult : {},
      sendingMyTripInfo : {
        'budgetAmt': 1000000,
        'cityId': 275,
        'clstrLabel': '',
        'cmpnCnt': 0,
        'cmpnType': '',
        'cntryId': 0,
        'imgUrl': '',
        'totalPayAmt': 0,
        'trvlEndDt': '',
        'trvlId': null,
        'trvlMainFctr': '',
        'trvlName': '',
        'trvlPd': 0,
        'trvlStartDt': '',
        'useYn': 'Y',
        'userId': 1, //userId로 사용필요
      },
      isFormValid : false,
      dateMenu: false,
      dateMenu2: false,
      surveySteps: [
        '1. 여행 제목', '2. 여행 예산', '3. 여행 일정', '4. 여행 유형', '5. 여행 인원',
      ],
      cmpnTypeLabels : ['가족 여행', '친구 여행', '커플 여행', '혼자 여행'],
      trvlMainfctrLabels : ['식비: 맛있는 음식을 많이 먹는 것이 제일 중요하다', '숙박비: 럭셔리하고 좋은 숙박 시설에 지내는 것이 제일 중요하다.', '교통비: 편하고 빠르게 이동하는 것이 제일 중요하다.', '액티비티비: 최대한 많고 다양한 경험을 하는 것이 제일 중요하다.',
      ],
      continueBtnLabel : '다음',
      cancelBtnLabel : '이전',
      userId : 1,
      budgetAmt : 1000000,
      trvlPd : 3,
      cmpnType : 1,
      cmpnCnt : 2,
      trvlMainFctr : 1,
      numberRule: v => {
        if (isNaN(parseInt(v))) return '값을 입력해주세요';
        if (v <= 0) return '0 이상의 값을 입력해주세요';
        if ((this.e6 == 2 || this.e6 == 4) && ( v > 999)) return '999 이하로 작성해주세요';
        return true;
      },
      cmpnCntRule: v => {
        if (isNaN(parseInt(v))) return '값을 입력해주세요';
        if (v <= 0) return '0 이상의 값을 입력해주세요';
        if ( v > 999) return '999 이하로 작성해주세요';
        return true;
      },
      nullRule: v => {
        if (!v || v.length == 0) return '값을 입력해주세요';
        return true;
      },
      radioRule: v => {
        if (v) return true;
        return '값을 선택해주세요';
      },
    };
  },
  methods:{
    goToMyTrip(){
      if(this.sendingMyTripInfo.trvlId == undefined){
        console.log(this.sendingMyTripInfo);
        this.$axios.post(api.myTripUpdate, {
          ...this.sendingMyTripInfo,
        })
          .then(res => {
            this.tripInfo = res.data;
            this.$router.push({
              name: 'MyTripDetail', params: {
                trvlId: this.tripInfo.trvlId,
              },
            });
          })
          .catch(err => console.error(err));
      }else{
        this.$axios.put(api.myTripUpdate+this.sendingMyTripInfo.trvlId, {
          ...this.sendingMyTripInfo,
        })
          .then(res => {
            this.tripInfo = res.data;
            this.$router.push({
              name: 'MyTripDetail', params: {
                trvlId: this.tripInfo.trvlId,
              },
            });
          })
          .catch(err => console.error(err));
      }


    },

    numFilter(val){
      val = val.replace(/[^0-9]/g, '');
      var field = this.$refs.budgetAmt_form;
      console.log(field);
      this.sendingMyTripInfo.budgetAmt = val;
      field.lazyValue = val;
    },
    numFilter2(val){
      val = val.replace(/[^0-9]/g, '');
      var field = this.$refs.cmpnCnt_form;
      console.log(field);
      this.sendingMyTripInfo.cmpnCnt = val;
      field.lazyValue = val;
    },
  },
  watch: {},
  mounted() {
    if(this.$route.params.tripInfo != undefined){
      this.tripInfo = this.$route.params.tripInfo;
      Object.assign(this.sendingMyTripInfo, this.tripInfo);
    }
    else if(this.$route.params.surveyResult != undefined){
      this.surveyResult = this.$route.params.surveyResult;
      Object.assign(this.sendingMyTripInfo, this.surveyResult);
      this.sendingMyTripInfo.cityId = this.$route.params.cityId;
      this.sendingMyTripInfo.cntryId = this.$route.params.cntryId;
      this.sendingMyTripInfo.clstrLabel = this.$route.params.clstrLabel;
      this.sendingMyTripInfo.imgUrl = this.$route.params.imgUrl;
    }
    if (this.sendingMyTripInfo.cityId == undefined){
      this.$router.go(-1);
    }

  },


};


</script>

<style scoped>
.myTripUpdate {
  background-color: var(--background);
  height: 100vh;

}
.myTripSurvey {
  background-color: var(--background);
  margin: 10px;
}
.surveyStepper{
  height: 60vh;
  background-color: var(--background);
  color: black;
      display: flex;
    align-items: center;
    justify-content: center;
}
.surveyRadio{
  margin: 10px;
}
.survey-btns{
  background-color: var(--background);
}
#survey-next-btn{
  background-color: var(--primary) !important;
  color: white;
  width: 100%;
}

#survey-pre-btn{
  background-color: gray;
  color: white;
  width: 100%;
}
#survey-submit-btn{
  background-color: var(--error) !important;
  color: white;
  width: 100%;
}


.displayToggle{
  display : none;
}

</style>
}