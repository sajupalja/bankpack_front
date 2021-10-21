<template>
  <div class="my-trip-spending">
    <div class="spending-progress-container">
      <div class="current-spending-title">현재 지출</div>
      <div class="current-spending-amount">{{ currentSpending }} <span class="total-budget-amount">/ {{ totalBudget }}</span></div>
      <v-progress-linear
        class="spending-progress-bar"
        :value="progress"
        height="25"
      >
        <span class="progress-percentage">{{ Math.ceil(progress) }}%</span>
      </v-progress-linear>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTripSpending',
  data() {
    return {
      progress: 80,
      currentSpending: '160만원',
      totalBudget: '200만원',
    };
  },
};
</script>

<style scoped>
.my-trip-spending {
  padding: 1.6rem;
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
</style>