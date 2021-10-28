<template>
  <div class="my-trip-info">

    <div class="trip-name">
      <h2>{{ tripInfo.trvlName }}</h2>
    </div>

    <div class="trip-info-card">
      <div class="trip-start-date">
        <span class="trip-info-label">여행 시작일:</span> {{ tripInfo.trvlStartDt | moment('YYYY년 MM월 DD일') }}
      </div>
      <div class="trip-end-date">
        <span class="trip-info-label">여행 종료일:</span>  {{ tripInfo.trvlEndDt | moment('YYYY년 MM월 DD일') }}
      </div>
      <div class="trip-ppl-cnt">
        <span class="trip-info-label">여행 인원:</span> {{ tripInfo.cmpnCnt }}
      </div>
      <div class="trip-type">
        <span class="trip-info-label">여행 유형:</span> {{ getTripType(tripInfo.cmpnType) }}
      </div>
    </div>

    <v-divider class="divider"></v-divider>

    <div class="timeline-container">
      <v-timeline
        v-if="reviewList.length"
        dense
      >
        <v-timeline-item
          class="timeline-item"
          v-for="review in reviewList"
          :key="review.trvlRevwId"
          small
        >
          <span class="timeline-date">{{ review.trvlDt | moment('YYYY년 MM월 DD일') }}</span>
          <div class="timeline-card">
            <v-img
              v-if="review.imgUrl"
              class="review-img"
              :src="review.imgUrl"
            ></v-img>
            <div
              class="timeline-content"
              v-html="review.revwText"
            ></div>
            <v-divider class="timeline-card-divider"></v-divider>
            <div class="timeline-footer">
              <span>작성일: {{ review.writeDate | moment('YYYY년 MM월 DD일') }}</span>
              <v-btn
                color="error"
                class="review-delete-btn"
                @click="deleteReview(review.trvlRevwId)"
                icon
                x-small
              >
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>

      <div
        class="no-timeline"
        v-else
      >
        <h3>여행 후기가 없네요!</h3>
      </div>
    </div>

    <div class="editor-container">
      <v-menu
        v-model="dateMenu"
        :close-on-content-click="true"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="reviewEntry.trvlDt"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            placeholder="여행 날짜"
            hide-details
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="reviewEntry.trvlDt"
          color="primary"
          no-title
          scrollable
        >
        </v-date-picker>
      </v-menu>
      <v-file-input
        class="img-file-input"
        accept="image/*"
        placeholder="사진 첨부 (선택)"
        clear-icon="mdi-close"
        @change="showUploadedFile"
        @click:clear="clearImg"
        v-model="reviewImg"
        hide-details
        show-size
      ></v-file-input>
      <v-img
        class="img-preview"
        v-if="uploadedFileUrl"
        :src="uploadedFileUrl"
      ></v-img>
      <div class="editor">
        <VueTrix
          v-model="reviewEntry.revwText"
          placeholder="후기를 작성해주세요"
        />
        <v-btn
          class="write-btn"
          color="primary"
          @click="createReview"
          block
        >
          작성
        </v-btn>
      </div>
    </div>

    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
      <h3 class="loading-msg">업로드 중</h3>
    </v-overlay>
  </div>
</template>

<script>
import VueTrix from 'vue-trix';
import api from '../api/api.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

export default {
  name: 'MyTripInfo',
  components: {
    VueTrix,
  },
  props: ['tripInfo'],
  data() {
    return {
      dateMenu: false,
      reviewList: [],
      reviewImg: null,
      uploadedFileUrl: null,
      reviewEntry: {
        revwText: null,
        trvlDt: null,
        imgUrl: null,
      },
      loading: false,
    };
  },
  methods: {
    getTripType(type) {
      if (type === '1') {
        return '가족 여행';
      } else if (type === '2') {
        return '친구 여행';
      } else if (type === '3') {
        return '커플 여행';
      } else {
        return '홀로 여행';
      }
    },
    showUploadedFile() {
      this.uploadedFileUrl = URL.createObjectURL(this.reviewImg);
    },
    createReview() {
      console.log(this.reviewEntry);
      this.loading = true;
      this.reviewEntry.trvlId = this.tripInfo.trvlId;
      this.reviewEntry.userId = 1;
      if (this.uploadedFileUrl) {
        const date = new Date();
        const id = date.getTime();
        const storageRef = firebase.storage().ref();
        storageRef.child(`user${this.tripInfo.userId}`).child(`trip${this.tripInfo.trvlId}`).child(`${id}_${this.reviewImg.name}`).put(this.reviewImg)
          .then(() => {
            storageRef.child(`user${this.tripInfo.userId}`).child(`trip${this.tripInfo.trvlId}`).child(`${id}_${this.reviewImg.name}`).getDownloadURL()
              .then(url => {
                this.reviewEntry.imgUrl = url;
              })
              .then(() => {
                this.$axios.post(api.myReview, this.reviewEntry)
                  .then(() => {
                    this.loading = false;
                    this.fetchReviews();
                    this.clearEditor();
                    this.clearImg();
                  })
                  .catch(err => console.error(err));
              });
          });
      } else {
        this.$axios.post(api.myReview, this.reviewEntry)
          .then(() => {
            this.loading = false;
            this.fetchReviews();
            this.clearEditor();
            this.clearImg();
          })
          .catch(err => console.error(err));
      }
    },
    fetchReviews() {
      this.$axios.get(api.myReviewList + this.$route.params.trvlId)
        .then(res => this.reviewList = res.data.trvVO)
        .catch(err => console.error(err));
    },
    clearImg() {
      this.reviewImg = null;
      this.uploadedFileUrl = null;
    },
    clearEditor() {
      this.reviewEntry.revwText = null;
      this.reviewEntry.trvlDt = null;
      this.reviewEntry.imgUrl = null;
    },
    deleteReview(id) {
      this.$axios.delete(api.myReview + `/${id}`)
        .then(() => this.fetchReviews())
        .catch(err => console.error(err));
    },
  },
  mounted() {
    this.fetchReviews();
  },
};
</script>

<style scoped>
.my-trip-info {
  padding: 1.6rem;
}

.trip-info-label {
  font-weight: 600;
}

.trip-name {
  text-align: center;
}

.trip-info-card {
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--card-border-radius);
}

.divider {
  margin: 1rem 0;
}

.timeline-container {
  margin: 1rem 0;
}

.timeline-date {
  font-size: 0.8rem;
  color: var(--grey);
  margin-left: 0.6rem;
}

.timeline-card {
  margin-left: 0.6rem;
  padding: 1rem 0.8rem 0.4rem 0.8rem;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--card-border-radius);
}

.review-img {
  margin-bottom: 0.6rem;
}

.timeline-card-divider {
  margin: 0.6rem 0 0.4rem 0;
}

.timeline-footer {
  font-size: 0.8rem;
  text-align: right;
}

.review-delete-btn {
  margin-left: 0.4rem;
  padding-bottom: 0.1rem;
}

.no-timeline {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-top: 0.8rem;
}

.img-file-input {
  margin-bottom: 0.6rem;
}

.img-preview {
  margin-top: 1rem;
}

.editor {
  padding: 1rem 0;
}

.write-btn {
  margin-top: 1rem;
  font-weight: 600;
}

.loading-msg {
  margin-top: 1rem;
}
</style>