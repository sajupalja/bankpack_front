<template>
  <div class="review-detail">
    <div class="title">
      <h2>체코 프라하 3박4일 여행기</h2>
    </div>
    <div class="review-info">
      <v-card class="review-info-left">
        <h5>여행 기간</h5>
        <p>2021-09-28 ~ 2021-10-15</p>
        <h5>여행 인원</h5>
        <p>X 명</p>
        <h5>여행 유형</h5>
        <p>우정여행</p>
      </v-card>
      <div class="review-info-right">
        <div class="review-write-info">
          <p>작성자: 하얀족제비</p>
          <p>작성일: 2021/10/15</p>
        </div>
        <div class="review-expense">
          <h3>총 지출 비용</h3>
          <h1>XXX 원</h1>
        </div>
      </div>
    </div>
    <div class="review-chart">차트</div>
    <div class="review-contents">
      <p>여행 기록</p>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewInfo',
};
</script>

<style scoped>
.review-detail {
  height: 100%;
  background-color: var(--background);
}

.title {
  margin-top: 2rem;
  margin-left: 2rem;
}

.review-info {
  display: flex;
  justify-content: space-between;
  margin: 2rem;
}

.review-info-left {
  height: 15rem;
  width: 17rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.review-info-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: end;
}

.review-write-info > p {
  margin: 0;
  color: #8d8d8d;
}

.review-expense {
  text-align: end;
}

.review-chart {
  height: 30%;
  background-color: white;
}

.review-contents {
  margin: 2rem;
}
</style>