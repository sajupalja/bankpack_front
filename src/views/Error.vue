<template>
  <div class="error-page">
    <img src="../assets/icon.png" alt="">
    <div class="error-message">
      <p>죄송합니다..</p>
      <p>시스템 오류인 것 같습니다</p>
    </div>
    <v-btn
      @click="goBack"
    >
    이전 페이지로 돌아가기
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      history.back();
    },
  },
};
</script>

<style>
.error-page {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-page > img {
  width: 250px;
  height: 200px;
}

.error-message {
  text-align: center;
}
</style>