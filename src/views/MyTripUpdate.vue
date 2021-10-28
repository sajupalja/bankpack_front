<template>
  <div class="my-trip-update">
    <div class="header">
      <img
        class="header-img"
        :src="sendingMyTripInfo.imgUrl"
        alt="header-image"
      >
      <div class="trip-destination-overlay">
        <h1 class="trip-destination">{{ sendingMyTripInfo.cntryName }} {{ sendingMyTripInfo.cityName }}</h1>
      </div>
    </div>
    <v-form
      class="form-container"
      v-model="isFormValid"
    >
      <h3 class="form-title">{{surveySteps[0]}}</h3>
      <v-text-field
        class="form-text-field"
        v-model="sendingMyTripInfo.trvlName"
        single-line
        :rules="[nullRule]"
        placeholder="제목을 입력해주세요"
      />

      <h3 class="form-title">{{surveySteps[1]}}</h3>
      <v-text-field
        class="form-text-field"
        :value="sendingMyTripInfo.budgetAmt"
        single-line
        :rules="[numberRule]"
        ref = "budgetAmt_form"
        @input="numFilter"
        suffix="원"
      />

        <h3 class="form-title">{{surveySteps[2]}}</h3>
          <div class="trip-date">
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
                  class="form-text-field date-text-field"
                  v-model="sendingMyTripInfo.trvlStartDt"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  placeholder="여행 시작일"
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
            <span class="date-tilde"> ~ </span>
            <v-menu
              v-model="dateMenu2"
              :close-on-content-click="true"
              transition="scale-transition"
              :nudge-left="120"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="form-text-field date-text-field"
                  v-model="sendingMyTripInfo.trvlEndDt"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  placeholder="여행 종료일"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="sendingMyTripInfo.trvlEndDt"
                color="primary"
                :min="sendingMyTripInfo.trvlStartDt"
                no-title
                scrollable
              >
              </v-date-picker>
            </v-menu>
          </div>

          <h3 class="form-title">{{surveySteps[3]}}</h3>
          <v-radio-group
            v-model="sendingMyTripInfo.cmpnType"
            class="surveyRadio"
          >
            <v-radio
              v-for="n in 4"
              :key="n"
              :label= cmpnTypeLabels[n-1]
              :value="n"
            ></v-radio>
          </v-radio-group>

          <h3 class="form-title">{{surveySteps[4]}}</h3>
          <v-text-field
            class="form-text-field"
            :value="sendingMyTripInfo.cmpnCnt"
            single-line
            :rules="[cmpnCntRule]"
            @input="numFilter2"
            ref = "cmpnCnt_form"
            suffix="명"
          />

          <v-container class="survey-btns">
            <v-row
              align="center"
              justify="center"
            >
              <v-col>
                <v-btn
                  id = "survey-submit-btn"
                  color="error"
                  @click="goToMyTrip()"
                  :disabled="!isFormValid"
                  large
                >
                  제출
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
    </v-form>

  </div>
</template>

<script>
import api from '../api/api.js';

export default {
  name: 'MyTripUpdate',
  data() {
    return {
      tripInfo :{},
      surveyResult: {},
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
        'cityName': '',
        'cntryName': '',
        'userId': 1, //userId로 사용필요
      },
      isFormValid : false,
      dateMenu: false,
      dateMenu2: false,
      cmpnTypeLabels : ['가족 여행', '친구 여행', '커플 여행', '혼자 여행'],
      surveySteps: [
        '1. 여행 제목', '2. 여행 예산', '3. 여행 일정', '4. 여행 유형', '5. 여행 인원',
      ],
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
      } else {
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
      this.sendingMyTripInfo.cityName = this.$route.params.cityName;
      this.sendingMyTripInfo.cntryName = this.$route.params.cntryName;
    }
    if (this.sendingMyTripInfo.cityId == undefined){
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped>
.my-trip-update {
  background-color: var(--background);
  height: 100%;
  padding-bottom: 2rem;
}

.header {
  height: 30vh;
}

.header-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.trip-destination-overlay {
  position: relative;
  top: -80px;
  padding-top: 0.4rem;
  padding-bottom: 1.2rem;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 30%, rgba(74,74,74,0.6) 77%, rgba(147,147,147,0.2) 99%);
}

.trip-destination {
  margin-left: 1rem;
  color: white;
}

.form-container {
  padding: 1.6rem;
}

.form-title {
  margin-top: 0.6rem;
}

.form-text-field {
  width: 90%;
  margin: auto;
  padding-top: 0.4rem;
}

.form-text-field >>> input {
  text-align: center;
}

.trip-date {
  display: flex;
  padding-bottom: 1.6rem;
  justify-content: center;
  align-items: center;
}

.date-text-field {
  width: 45%;
}

.date-tilde {
  font-weight: 600;
  margin: 0 0.8rem;
}

.surveyRadio {
  margin: 10px;
}

#survey-submit-btn {
  width: 100%;
}


.displayToggle {
  display : none;
}
</style>
