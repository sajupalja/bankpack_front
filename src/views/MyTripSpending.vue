<template>
  <div class="my-trip-spending">
    <div class="spending-progress-container">
      <div class="current-spending-title">현재 지출</div>
      <div class="current-spending-amount">{{ tripInfo.totalPayAmt.toLocaleString({style:'currency'}) }}원 <span class="total-budget-amount">/ {{ tripInfo.budgetAmt.toLocaleString({style:'currency'}) }}원</span></div>
      <v-progress-linear
        class="spending-progress-bar"
        :value="progress"
        height="25"
      >
        <span class="progress-percentage">{{ spendingPercentage }}%</span>
      </v-progress-linear>
    </div>
    <div class="spending-pie-chart-container">
      <pie-chart
        class="spending-pie-chart"
        :chart-data="chartData"
        :options="chartOptions"
      ></pie-chart>
    </div>
    <div class="payment-history-container">
      <div class="payment-history-filters">
        <div
          class="payment-history-filter"
          v-for="filter in paymentHistoryFilters"
          :key="filter.name"
        >
          <span class="filter-btn">{{ filter.name }}</span>|
        </div>
      </div>
      <div
        class="payment-history-card"
        v-for="item in paymentHistoryItem"
        :key="item.trvlPayId"
        @click="goToPaymentDetail"
      >
        <div
          class="payment-history-icon"
          id="paymentHistoryIcon"
        >
          <v-icon color="white">{{ paymentIcon(item.payType) }}</v-icon>
        </div>
        <div class="payment-history-description">
          <span class="payment-history-date">{{ item.payDt | moment('YYYY-MM-DD HH:mm') }}</span>
          <span class="payment-history-name">{{ item.payName }}</span>
        </div>
        <div class="payment-history-amount">
          <span class="payment-history-method">{{ getPayMethod(item.payMethod) }}</span>
          <span class="payment-history-amount">{{ item.payAmt.toLocaleString({style:'currency'}) }}</span>
        </div>
      </div>
    </div>
    <v-btn
      class="payment-add-btn"
      color="primary"
      :to="{ name: 'Payment' }"
      fixed
      bottom
      right
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.js';
import api from '../api/api.js';

export default {
  name: 'MyTripSpending',
  components: {
    PieChart,
  },
  props: ['tripInfo'],
  data() {
    return {
      progress: 80,
      currentSpending: '160만원',
      totalBudget: '200만원',
      chartOptions: {
        cutoutPercentage: 0,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 15,
            fontFamily: 'paybooc-Medium',
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
            data: [this.tripInfo.totalFoodRate, this.tripInfo.totalRoomRate, this.tripInfo.totalTrffRate, this.tripInfo.totalActRate, this.tripInfo.totalEtcRate],
          },
        ],
      },
      paymentHistoryFilters: [
        {
          name: '전체',
        }, {
          name: '식비',
        }, {
          name: '숙비',
        }, {
          name: '교통비',
        }, {
          name: '활동비',
        }, {
          name: '기타비',
        },
      ],
      paymentHistoryItem: [],
    };
  },
  computed: {
    spendingPercentage() {
      return (this.tripInfo.totalPayAmt / this.tripInfo.budgetAmt * 100).toFixed(2);
    },
  },
  methods: {
    paymentIcon(payType) {
      if (payType === 1) {
        return 'mdi-bed-empty';
      } else if (payType === 2) {
        return 'mdi-food-drumstick';
      } else if (payType === 3) {
        return 'mdi-bus';
      } else if (payType === 4) {
        return 'mdi-ticket-confirmation';
      } else {
        return 'mdi-minus';
      }
    },
    getPayMethod(method) {
      if (method === 0) {
        return '현금';
      } else {
        return '카드';
      }
    },
    fetchPaymentList() {
      this.$axios.get(api.tripPaymentList + this.tripInfo.trvlId)
        .then(res => {
          console.log(res.data);
          this.paymentHistoryItem = res.data;
        })
        .catch(err => console.error(err));
    },
    goToPaymentDetail() {
      // eslint-disable-next-line object-curly-newline
      this.$router.push({ name: 'Payment' });
    },
  },
  mounted() {
    this.fetchPaymentList();
  },
};
</script>

<style scoped>
.my-trip-spending {
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
}

.current-spending-title {
  font-weight: 600;
  font-size: 1.2rem;
}

.current-spending-amount {
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.2rem 0;
}

.total-budget-amount {
  font-size: 1rem;
}

.spending-progress-bar {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.progress-percentage {
  color: white;
  font-weight: 600;
}

.spending-pie-chart-container {
  margin: 1.4rem auto;
  width: 65vw;
}

.payment-history-filters {
  display: flex;
}

.filter-btn {
  margin: 0 0.4rem;
}

.filter-btn:hover {
  cursor: pointer;
}

.filter-btn:active {
  color: var(--grey);
}

.payment-history-card {
  background-color: white;
  padding: 1rem;
  margin: 0.6rem 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  border-radius: var(--card-border-radius);
}

.payment-history-card:hover {
  cursor: pointer;
}

.payment-history-card:active {
  background-color: var(--background);
}

.payment-history-icon {
  background-color: var(--primary);
  border-radius: 50%;
  padding: 0.4rem;
  margin: auto 0;
  font-size: 0.6rem;
}

.payment-history-name {
  font-size: 0.9rem;
}

.payment-history-description, .payment-history-amount {
  display: flex;
  flex-direction: column;
}

.payment-history-description {
  margin-left: 1rem;
}

.payment-history-amount {
  text-align: right;
  margin-left: auto;
}

.payment-history-date, .payment-history-method {
  font-size: 0.6rem;
  color: var(--grey);
}

.payment-add-btn {
  margin: 0.6rem;
}
</style>