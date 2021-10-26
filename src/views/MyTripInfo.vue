<template>
  <div class="my-trip-info">

    <div class="trip-name">
      <h2>{{ tripInfo.trvlName }}</h2>
    </div>

    <div class="trip-info-card">
      <div class="trip-start-date">여행 시작일: {{ tripInfo.trvlStartDt | moment('YYYY년 MM월 DD일') }}</div>
      <div class="trip-end-date">여행 종료일: {{ tripInfo.trvlEndDt | moment('YYYY년 MM월 DD일') }}</div>
      <div class="trip-ppl-cnt">여행 인원: {{ tripInfo.cmpnCnt }}</div>
      <div class="trip-type">여행 유형: {{ getTripType(tripInfo.cmpnType) }}</div>
    </div>

    <v-divider class="divider"></v-divider>

    <div class="timeline-container">
      <v-timeline
        dense
      >
        <v-timeline-item
          class="timeline-item"
          v-for="review in tripInfo.trvVO"
          :key="review.trvlRevwId"
          small
        >
          <span class="timeline-date">{{ review.trvlDt | moment('YYYY년 MM월 DD일') }}</span>
          <div class="timeline-card">
            <div class="timeline-content">
              {{ review.revwText }}
            </div>
            <v-divider class="timeline-card-divider"></v-divider>
            <div class="timeline-footer">
              작성일: {{ review.writeDate | moment('YYYY년 MM월 DD일') }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>

    <div class="editor-container">
      <div class="editor">
        <VueTrix
          v-model="editorContent"
          placeholder="후기를 작성해주세요"
          localStorage
        />
        <v-btn
          class="write-btn"
          color="primary"
          block
        >
          작성
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import VueTrix from 'vue-trix';

export default {
  name: 'MyTripInfo',
  components: {
    VueTrix,
  },
  props: ['tripInfo'],
  data() {
    return {
      trvlRevwItems: [
        {
          trvlRevwId: 1,
          writeDate: '2021-10-22 13:00',
          revwText: '파리에 도착해서 한 컷 찍었습니다~',
          trvlDt: '2021-10-15 (금)',
        }, {
          trvlRevwId: 2,
          writeDate: '2021-10-22 14:23',
          revwText: '맛있는 저녁을 먹었습니다!',
          trvlDt: '2021-10-16 (토)',
        },
      ],
      editorContent: null,
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
  },
};
</script>

<style scoped>
.my-trip-info {
  padding: 1.6rem;
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

.timeline-card-divider {
  margin: 0.6rem 0 0.4rem 0;
}

.timeline-footer {
  font-size: 0.8rem;
  text-align: right;
}

.editor {
  padding: 1rem;
}

.write-btn {
  margin-top: 1rem;
}
</style>