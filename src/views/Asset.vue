<template>
  <div class="asset">
    <div v-if="connect">
      <div class="total-asset">
        <div class="info-script">
          <span>내 계좌</span>
          <span v-if="fetchDate" id="my-date">{{fetchDate}} 기준</span>
        </div>
        <v-card
          elevation="4"
          class="travel-asset-box"
        >
          <h3>여행 예산</h3>
          <h1>{{totalMoney}}원</h1>
        </v-card>
      </div>
      <div class="account-section">
        <span class="category">계좌 정보</span>
        <div v-if="accountList.length === 0" class="category no-data">
          <h2>계좌 정보가 없습니다.</h2>
        </div>
        <div
          class="each-assets"
          v-for="asset in accountList"
          :key=asset.accountId
        >
          <v-card class="each-asset-box">
            <img src="../assets/img/bankbook.png" alt="">
            <div class="asset-name">
              <h4>{{asset.acntName}}</h4>
              <span>{{asset.acntNo}}</span>
            </div>
            <div>
              <button
                class="toggle-background"
                @click="toggling(asset.accountId, 'account')"
              >
                <div class="toggle-circle" :class="{ 'active': asset.useYn === 'Y' }"></div>
              </button>
              <span class="money">
                {{asset.balAmt.toLocaleString()}} 원
              </span>
            </div>
          </v-card>
        </div>
      </div>
      <div class="card-section">
        <span class="category">카드 정보</span>
        <div v-if="cardList.length === 0" class="category no-data">
          <h2>카드 정보가 없습니다.</h2>
        </div>
        <div
          class="each-assets"
          v-for="asset in cardList"
          :key=asset.cardId
        >
          <v-card class="each-asset-box">
            <img src="../assets/img/kard.png" alt="">
            <div class="asset-name">
              <h4>{{asset.cardName}}</h4>
              <span>{{asset.cardNo}}</span>
            </div>
            <div>
              <button
                class="toggle-background card-toggle"
                @click="toggling(asset.cardId, 'card')"
              >
                <div class="toggle-circle" :class="{ 'active': asset.useYn === 'Y' }"></div>
              </button>
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <div v-else class="empty-asset">
      <h2>연동된 정보가 현재 존재하지 않습니다.</h2>
    </div>
    <v-btn
      class="connection-btn"
      :class="{ 'hidden-btn': showBtn }"
      elevation="2"
      @click="clickFetchBtn"
      large
    >
      계좌 정보 불러오기
    </v-btn>

    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  name: 'Assets',
  data() {
    return {
      toggleOn: [{
        tog: 'Y',
      }],
      accountList: [],
      isAccountList: false,
      cardList: [],
      isCardList: false,
      chk: [],
      connect: true,
      showBtn: false,
      lastScrollPosition: 0,
      fetchDate: '',
      loading: false,
    };
  },
  computed: {
    totalMoney: function () {
      const totalAccountVal = this.accountList.reduce((accVal, item) => {
        if (item.useYn === 'Y') {
          accVal += item.balAmt;
        }
        return accVal;
      }, 0);

      return totalAccountVal.toLocaleString();
    },
  },
  async mounted() {
    window.addEventListener('scroll', this.onScroll);
    const assetInfo = localStorage.getItem('asset-info');
    const fetchDate = localStorage.getItem('fetchDate');
    if (assetInfo && fetchDate) {
      try {
        const accountResponse = await this.$axios.get(api.fetchAllAccountListUrl);
        const cardResponse = await this.$axios.get(api.fetchAllCardListUrl);

        this.accountList = accountResponse.data;
        this.cardList = cardResponse.data;

        this.fetchDate = fetchDate;
      } catch (error) {
        this.$router.push({
          name: 'Error',
        });
      }
    }
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
    clickFetchBtn() {
      this.loading = true;
      setTimeout(() => {
        this.fetchData();
        this.loading = false;
      }, 2000);
    },
    async fetchData() {
      try {
        const accountResponse = await this.$axios.get(api.fetchAllAccountListUrl);
        const cardResponse = await this.$axios.get(api.fetchAllCardListUrl);

        this.accountList = accountResponse.data;
        this.cardList = cardResponse.data;

        localStorage.setItem('asset-info', true);

        let today = new Date();
        const fetchDate = today.toLocaleString();
        this.fetchDate = fetchDate;
        localStorage.setItem('fetchDate', fetchDate);
      } catch (error) {
        this.$router.push({
          name: 'Error',
        });
      }
    },
    toggling(id, category) {
      if (category === 'account') {
        this.accountList.forEach(account => {
          if (account.accountId === id) {
            account.useYn === 'Y' ? account.useYn = 'N' : account.useYn = 'Y';
            try {
              this.$axios.put(api.accountToggleUrl, account);
            } catch (error) {
              this.$router.push({
                name: 'Error',
              });
            }
          }
        });
      } else {
        this.cardList.forEach(card => {
          if (card.cardId === id) {
            card.useYn === 'Y' ? card.useYn = 'N' : card.useYn = 'Y';
            try {
              this.$axios.put(api.accountToggleUrl, card);
            } catch (error) {
              this.$router.push({
                name: 'Error',
              });
            }
          }
        });
      }
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
  padding-bottom: 3rem;
}

.travel-asset-box {
  width: 80vw;
  min-width: 300px;
  margin: 0.4rem 1rem 1rem 1rem;
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
  align-items: flex-end;
}

.info-script > span:nth-child(2) {
  font-size: .6rem;

}

.each-asset-box {
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  min-width: 300px;
  width: 80vw;
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
  font-weight: 600;
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
  background-color: #A0A0A0;
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

.category.no-data {
  margin-top: 1rem;
  font-size: 0.75rem;
  text-align: center;
}

.card-section {
  margin-top: 2rem;
}

.asset-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: .8rem;
}

.asset-name span {
  font-size: 0.6rem;
  color: gray;
  margin-top: 0.2rem;
}

.toggle-background.card-toggle {
  margin-top: auto;
}

.money {
  font-size: .6rem;
}
</style>
