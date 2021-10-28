<template>
  <div class="my-trip-spending">
    <div class="spending-progress-container">
      <div class="current-spending-title">현재 지출</div>
      <div class="current-spending-amount">{{ currency(tripInfo.totalPayAmt) }}원 <span class="total-budget-amount">/ {{ currency(tripInfo.budgetAmt) }}원</span></div>
      <v-progress-linear
        class="spending-progress-bar"
        :value="spendingPercentage"
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
          @click="changeFilter(filter)"
        >
          <span
            class="filter-btn"
            :id="filter.id"
          >{{ filter.name }}</span>|
        </div>
      </div>
      <div
        class="payment-history-card"
        v-for="item in filteredPaymentHistory"
        :key="item.trvlPayId"
        @click="goToPaymentDetail(item)"
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
          <span class="payment-history-amount">{{ currency(item.payAmt) }}</span>
        </div>
      </div>
    </div>

    <!-- 결제내역 추가 팝업 -->
    <v-dialog
      v-model="paymentDialog"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="payment-add-btn"
          color="primary"
          v-bind="attrs"
          v-on="on"
          fixed
          bottom
          right
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card
        class="payment-popup"
        height="100%"
      >
        <div class="payment-popup-title">결제 내역</div>
        <v-container>
          <v-row>
            <!-- 결제 분류 -->
            <v-col
              class="form-label-col"
              cols="3"
            >
              <label class="form-label">분류</label>
            </v-col>
            <v-col
              cols="9"
              class="form-field-col"
            >
              <v-select
                :items="payTypes"
                item-text="type"
                item-value="value"
                v-model="paymentInfo.payType"
                label="분류 선택하세요"
                hide-details
                solo
              ></v-select>
            </v-col>

            <!-- 결제 금액 -->
            <v-col
              class="form-label-col"
              cols="3"
            >
              <label class="form-label">금액</label>
            </v-col>
            <v-col
              cols="9"
              class="form-field-col"
            >
              <v-text-field
                label="금액 입력하세요"
                v-model="paymentInfo.payAmt"
                hide-details
                solo
              ></v-text-field>
            </v-col>

            <!-- 결제 내용 -->
            <v-col
              class="form-label-col"
              cols="3"
            >
              <label class="form-label">내용</label>
            </v-col>
            <v-col
              cols="9"
              class="form-field-col"
            >
              <v-text-field
                label="내용 입력하세요"
                v-model="paymentInfo.payName"
                hide-details
                solo
              ></v-text-field>
            </v-col>

            <!-- 결제 날짜 -->
            <v-col
              class="form-label-col"
              cols="3"
            >
              <label class="form-label">날짜</label>
            </v-col>
            <v-col
              cols="9"
              class="form-field-col"
            >
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
                  v-model="paymentInfo.payDt"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  solo
                  label="날짜 선택하세요"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="paymentInfo.payDt"
                color="primary"
                no-title
                scrollable
              >
              </v-date-picker>
            </v-menu>
            </v-col>

            <!-- 결제 수단 -->
            <v-col
              class="form-label-col"
              cols="3"
            >
              <label class="form-label">결제수단</label>
            </v-col>
            <v-col
              cols="9"
              class="form-field-col"
            >
              <v-select
                :items="payMethods"
                item-text="method"
                item-value="value"
                v-model="paymentInfo.payMethod"
                label="수단 선택하세요"
                hide-details
                solo
              ></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="closePaymentDialog"
          >
            닫기
          </v-btn>
          <v-btn
            color="error"
            text
            @click="deletePayment(paymentInfo.trvlPayId)"
            v-if="paymentDialogMode === 'edit'"
          >
            삭제
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="savePayment"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  props: ['tripInfo', 'chartData'],
  data() {
    return {
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
      paymentHistoryFilters: [
        {
          filterValue: null,
          name: '전체',
          id: 'filterAll',
        }, {
          filterValue: 1,
          name: '숙박비',
          id: 'filterRoom',
        }, {
          filterValue: 2,
          name: '식비',
          id: 'filterFood',
        }, {
          filterValue: 3,
          name: '교통비',
          id: 'filterTransportation',
        }, {
          filterValue: 4,
          name: '활동비',
          id: 'filterActivity',
        }, {
          filterValue: 5,
          name: '기타비',
          id: 'filterEtc',
        },
      ],
      paymentHistoryItem: [],
      filter: null,
      paymentDialog: false,
      paymentDialogMode: null,
      payTypes: [
        {
          type: '숙박비',
          value: 1,
        }, {
          type: '식비',
          value: 2,
        }, {
          type: '교통비',
          value: 3,
        }, {
          type: '활동비',
          value: 4,
        }, {
          type: '기타비',
          value: 5,
        },
      ],
      dateMenu: false,
      payMethods: [
        {
          method: '현금',
          value: 0,
        }, {
          method: '카드',
          value: 1,
        },
      ],
      paymentInfo: {
        trvlPayId: null,
        payType: null,
        payAmt: null,
        payName: null,
        payDt: null,
        payMethod: null,
      },
    };
  },
  computed: {
    spendingPercentage() {
      return (this.tripInfo.totalPayAmt / this.tripInfo.budgetAmt * 100).toFixed(2);
    },
    filteredPaymentHistory() {
      let result = [];
      if (this.filter === null) {
        return this.paymentHistoryItem;
      } else {
        this.paymentHistoryItem.forEach(item => {
          if (item.payType === this.filter) {
            result.push(item);
          }
        });
        return result;
      }
    },
  },
  methods: {
    currency(amt) {
      // eslint-disable-next-line object-curly-newline
      return amt.toLocaleString({style:'currency'});
    },
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
    changeFilter(filter) {
      this.filter = filter.filterValue;
      const currentFilter = document.getElementsByClassName('active-filter')[0];
      currentFilter.classList.remove('active-filter');
      const newFilter = document.getElementById(filter.id);
      newFilter.classList.add('active-filter');
    },
    fetchPaymentList() {
      this.$axios.get(api.tripPaymentList + this.$route.params.trvlId)
        .then(res => this.paymentHistoryItem = res.data)
        .catch(err => console.error(err));
    },
    goToPaymentDetail(paymentItem) {
      this.paymentDialog = true;
      this.paymentInfo.trvlPayId = paymentItem.trvlPayId;
      this.paymentInfo.payType = paymentItem.payType;
      this.paymentInfo.payAmt = paymentItem.payAmt;
      this.paymentInfo.payName = paymentItem.payName;
      this.paymentInfo.payDt = paymentItem.payDt;
      this.paymentInfo.payMethod = paymentItem.payMethod ? 1 : 0;
      this.paymentDialogMode = 'edit';
    },
    savePayment() {
      this.paymentInfo.userId = 1;
      this.paymentInfo.trvlId = this.tripInfo.trvlId;
      if (this.paymentDialogMode === 'edit') {
        this.$axios.put(api.tripPayment, this.paymentInfo)
          .then(() => {
            this.$emit('fetch');
            this.closePaymentDialog();
            this.fetchPaymentList();
          })
          .catch(err => console.error(err));
      } else {
        this.$axios.post(api.tripPayment, this.paymentInfo)
          .then(() => {
            this.$emit('fetch');
            this.closePaymentDialog();
            this.fetchPaymentList();
          })
          .catch(err => console.error(err));
      }
    },
    deletePayment(id) {
      this.$axios.delete(api.tripPayment + `/${id}`)
        .then(() => {
          this.$emit('fetch');
          this.closePaymentDialog();
          this.fetchPaymentList();
        })
        .catch(err => console.error(err));
    },
    closePaymentDialog() {
      this.paymentDialog = false;
      this.paymentInfo = {
        trvlPayId: null,
        payType: null,
        payAmt: null,
        payName: null,
        payDt: null,
        payMethod: null,
      };
      this.paymentDialogMode = null;
    },
  },
  mounted() {
    this.fetchPaymentList();
    const filterAll = document.getElementById('filterAll');
    filterAll.classList.add('active-filter');
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
  margin: 0 0.3rem;
  font-size: 0.9rem;
}

.filter-btn:hover {
  cursor: pointer;
}

.filter-btn:active {
  color: var(--grey);
}

.active-filter {
  color: var(--primary);
  font-weight: 600;
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

.payment-popup {
  padding: 1.6rem 1.2rem 1rem 1.2rem;
}

.payment-popup-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.form-label-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.2rem;
  padding-right: 0;
}

.form-label {
  font-weight: 600;
}

.form-field-col {
  padding-right: 0;
  padding-left: 0.4rem;
}

.v-card__actions {
  padding: 0 !important;
}
</style>