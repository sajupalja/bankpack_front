<template>
  <div class="spending-form">
    <v-card
      elevation="3"
      class="form-card"
    >
      <div>
        <div class="form-input-box">
          <label>분류</label>
          <select
            class="form-select"
          >
            <option value="none">==선택하세요==</option>
            <option
              v-for="item in categories"
              :key="item.id"
              value="item.category">{{item.category}}</option>
          </select>
        </div>
        <div class="form-input-box">
          <label>금액</label>
          <div class="money-input-box">
            <select class="money">
              <option value="">-</option>
              <option value="">$</option>
              <option value="">&#8361;</option>
            </select>
            <input class="form-input" type="text">
          </div>
        </div>
        <div class="form-input-box">
          <label>내용</label>
          <input class="form-input" type="text">
        </div>
        <div class="form-input-box">
          <label>날짜</label>
          <input class="form-input" type="date">
        </div>
        <div class="form-input-box">
          <label>결제 수단</label>
          <select
            class="form-select"
          >
            <option value="none">==선택하세요==</option>
            <option
              v-for="item in ways"
              :key="item.id"
              value="item.category">{{item.category}}</option>
          </select>
        </div>
      </div>
      <v-btn
        class="submit-btn"
        elevation="2"
      >
        완료
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  data () {
    return {
      categories: [
        {
          id: 1, category: '식비',
        }, {
          id: 2, category: '선비',
        }, {
          id: 3, category: '노비',
        },
      ],
      ways: [
        {
          id: 1, category: '카드',
        }, {
          id: 2, category: '드론',
        }, {
          id: 3, category: '론?',
        },
      ],
    };
  },
};
</script>

<style scoped>
option {
  text-align: center;
}

.spending-form {
  background-color: var(--background);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-card {
  display: flex;
  flex-direction: column;
}

.form-card > div {
  padding: 50px 30px;
}

.form-input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 1rem;
}

.form-input-box p {
  font-weight: bold;
}

.form-input {
  box-shadow: -1px 1px 5px var(--shadow) inset;
  width: 80%;
  height: 2rem;
  text-align: center;
}

.form-select {
  border: none;
  box-shadow: -1px 1px 5px var(--shadow) inset;
  height: 2rem;
  width: 80%;
}

.submit-btn {
  background-color: var(--primary) !important;
  color: white;
  margin: 20px;
  margin-top: 0;
}

.money {
  box-shadow: -1px 1px 5px var(--shadow) inset;
  padding: 0 1rem;
  height: 2rem;
}

.money-input-box {
  display: flex;
  justify-content: space-between;
  width: 80%;
}
</style>