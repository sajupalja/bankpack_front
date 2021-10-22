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
      <div
        class="each-assets"
        v-for="asset in assetList"
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
export default {
  name: 'Assets',
  data() {
    return {
      toggleOn: false,
      money: '1,500',
      assetList: [
        {
          id:1, category:'book', name:'국민은행 one 통장', balance: '1,000',
        },
        {
          id:2, category:'book', name:'국민은행 one 통장', balance: '500',
        },
        {
          id:3, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:4, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:5, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:6, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:7, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:8, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:9, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:10, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:11, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:12, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:13, category:'card', name:'국민은행 카드', balance: '500',
        },
        {
          id:14, category:'card', name:'국민은행 카드', balance: '500',
        },
      ],
      connect: true,
      showBtn: false,
      lastScrollPosition: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
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
  transition: .2s all;
}

.each-asset-box:hover {
  transform: scale(1.05);
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
</style>
