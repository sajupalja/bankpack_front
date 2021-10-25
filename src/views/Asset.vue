<template>
  <div class="asset">
    <div v-if="connect">
      <div class="total-asset">
        <div class="info-script">
          <span id="my-account">내 계좌</span>
          <span id="my-date">xxxx.xxxx.xxxx 기준</span>
        </div>
        <v-card
          elevation="4"
          class="travel-asset-box"
        >
          <h3>여행 예산</h3>
          <h1>{{money}}원</h1>
        </v-card>
      </div>
      <span class="category">계좌 정보</span>
      <div
        class="each-assets"
        v-for="asset in bookList"
        :key=asset.id
      >
        <v-card class="each-asset-box">
          <img v-if="asset.category === 'book'" src="../assets/img/bankbook.png" alt="">
          <img v-else src="../assets/img/kard.png" alt="">
          <div>{{asset.name}}</div>
          <div>
            <button class="toggle-background" @click="toggling">
              <div class="toggle-circle" :class="{ 'active': toggleOn }"></div>
            </button>
            {{asset.balance}}
          </div>
        </v-card>
      </div>
      <span class="category">카드 정보</span>
      <div
        class="each-assets"
        v-for="asset in cardList"
        :key=asset.id
      >
        <v-card class="each-asset-box">
          <img v-if="asset.category === 'book'" src="../assets/img/bankbook.png" alt="">
          <img v-else src="../assets/img/kard.png" alt="">
          <div>{{asset.name}}</div>
          <div>
            <button class="toggle-background" @click="toggling">
              <div class="toggle-circle" :class="{ 'active': toggleOn }"></div>
            </button>
            {{asset.balance}}
          </div>
        </v-card>
      </div>
    </div>
    <div v-else class="empty-asset">
      <h2>연동된 정보가 현재 존재하지 않습니다.</h2>
    </div>
    <v-btn
      class="connection-btn"
      :class="{ 'hidden-btn': showBtn }"
      elevation="2"
    >
      계좌 정보 불러오기
    </v-btn>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  name: 'Assets',
  data() {
    return {
      toggleOn: false,
      money: '1,500',
      bookList: [],
      cardList: [],
      connect: true,
      showBtn: false,
      lastScrollPosition: 0,
    };
  },
  async mounted() {
    window.addEventListener('scroll', this.onScroll);
    const response = await this.$axios.get(api.assetUrl);
    console.log(response);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition < 0) {
        return;
      }
      this.showBtn = currentScrollPosition > this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;

      if((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
        this.showBtn = !this.showBtn;
      }
    },
    toggling() {
      console.log('h');
      this.toggleOn = !this.toggleOn;
    },
  },
};
</script>

<style scoped>
.asset {
  background-color: var(--background);
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  align-items: center;
}

.travel-asset-box {
  margin: 1rem;
  padding: 1.5rem;
}

.travel-asset-box > h1 {
  margin-top: 2rem;
  text-align: end;
}

.info-script {
  margin: 0 1.2rem;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
}

.each-asset-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 1rem;
  margin: .5rem 1rem;
}

.each-asset-box > img {
  width: 45px;
  height: 45px;
}

.each-asset-box > div:nth-child(3) {
  text-align: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.empty-asset > h2 {
  text-align: center;
  line-height: 100px;
}

.connection-btn {
  background-color: var(--primary) !important;
  color: white;
  position: fixed;
  bottom: 0;
  width: 80%;
  bottom: 10px;
}

.hidden-btn {
  display: none;
}

.toggle-background {
  height: 20px;
  width: 40px;
  margin-bottom: 10px;
  background-color: rgb(219, 219, 219);
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}

.toggle-circle {
  width: 15px;
  height: 15px;
  background-color: rgb(231, 231, 231);
  position: absolute;
  border-radius: 10px;
  top: 2.5px;
  left: 3px;
  transition: .2s ease;
}

.toggle-circle.active {
  background-color: var(--primary);
  transform: translateX(120%);
}

.category{
  margin-left: 1rem;
}
</style>
