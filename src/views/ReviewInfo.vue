<template>
  <div class="review-detail">
    <div class="title">
      <h2>체코 프라하 3박4일 여행기</h2>
    </div>

    <div class="review-write-info">
      <p>작성자: 하얀족제비</p>
      <p>작성일: 2021/10/15</p>
    </div>

    <div class="review-info-card">
      <div class="trip-start-date">여행 시작일: {{ trvlInfo.trvlStartDt }}</div>
      <div class="trip-end-date">여행 종료일: {{ trvlInfo.trvlEndDt }}</div>
      <div class="trip-ppl-cnt">여행 인원: {{ trvlInfo.cmpnCnt }}</div>
      <div class="trip-type">여행 유형: {{ getTripType(trvlInfo.cmpnType) }}</div>
    </div>

    <div class="review-chart">
      <h3 class="chart-title">하얀족제비님의 지출 내역</h3>
      <div class="review-expense-info">
        <div class="review-expense">
          <h5>총 지출 비용</h5>
          <h2>1000000 원</h2>
        </div>
      </div>
      <pie-chart
        :chart-data="chartData"
        :options="chartOptions"
        class="pie-chart"
      />
    </div>

    <v-divider></v-divider>

    <div class="timeline-container">
      <v-timeline
        dense
      >
        <v-timeline-item
          v-for="review in trvlRevwItems"
          :key="review.trvlRevwId"
          small
        >
          <span class="timeline-date">{{ review.trvlDt }}</span>
          <div class="timeline-card">
            <div class="timeline-content">
              {{ review.revwText }}
            </div>
            <v-divider class="timeline-card-divider"></v-divider>
            <div class="timeline-footer">
              작성일: {{ review.writeDate }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>

  </div>
</template>

<script>
import PieChart from '../components/PieChart.js';

export default {
  name: 'ReviewInfo',
  components: {
    PieChart,
  },
  data () {
    return {
      trvlInfo: {
        trvlName: '하얀 족제비의 호화 호텔 끝판왕 프랑스 파리 여행기',
        trvlStartDt: '2021-10-14',
        trvlEndDt: '2021-10-21',
        cmpnCnt: 2,
        cmpnType: 2,
      },
      chartOptions: {
        responsive: true,
        cutoutPercentage: 1,
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            fontFamily: 'paybooc-Medium',
            fontSize: 15,
          },
        },
      },
      chartData: {
        hoverBorderWidth: 10,
        labels: ['식비', '숙비', '교통비', '활동', '기타'],
        datasets: [
          {
            label: '카테고리별 지출',
            backgroundColor: ['#2878A0', '#FAF8D4', '#BBDDFF', '#EF8354', '#242038'],
            data: [0.1, 0.2, 0.3, 0.3, 0.1],
          },
        ],
      },
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
    };
  },
  methods: {
    getTripType(type) {
      if (type === 1) {
        return '가족 여행';
      } else if (type === 2) {
        return '친구 여행';
      } else if (type === 3) {
        return '커플 여행';
      } else {
        return '홀로 여행';
      }
    },
  },
};
</script>

<style scoped>
.review-detail {
  background-color: var(--background);
  padding: 1.6rem 1rem 1rem 1rem;
}

.title {
  text-align: center;
}

.review-write-info {
  text-align: right;
  margin: 1rem 0;
}

.review-write-info > p {
  margin: 0;
  color: var(--grey);
  font-size: 0.8rem;
}

.review-info-card {
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--card-border-radius);
}

.review-expense-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: end;
  margin-top: 1rem;
}

.review-expense {
  text-align: end;
}

.chart-title {
  text-align: center;
  margin-top: 2rem;
}

.pie-chart {
  width: 70vw;
  margin: 0 auto;
}

.review-contents {
  margin: 2rem;
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
  padding: 1rem 0.8rem 0.4rem 0.8rem;
  background-color: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--card-border-radius);
  margin-left: 0.6rem;
}

.timeline-card-divider {
  margin: 0.6rem 0 0.4rem 0;
}

.timeline-footer {
  font-size: 0.8rem;
  text-align: right;
}
</style>