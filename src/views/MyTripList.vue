<template>
  <div class="my-trip-list">
    <v-container class="my-trip-list-container">
      <h2>나의 여행들</h2>

      <div
        class="my-trip-list-item"
        v-for="(item, i) in tripItems"
        :key="i"
      >
        <div class="my-trip-card">
          <img
            class="my-trip-card-img"
            :src="item.thumbnail"
            alt="thumbnail"
          >
          <div class="my-trip-card-content">
            <div class="my-trip-card-title">{{ item.destination }}</div>
            <div class="my-trip-card-date"> {{ item.startDate }} - {{ item.endDate }} </div>
          </div>
        </div>
      </div>

      <!-- 여행 추가 버튼 -->
      <div class="new-trip-card">
        <div class="new-trip-card-content">
          <v-icon class="new-trip-icon">mdi-plus-circle</v-icon>
          <span>새로운 여행 추가</span>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'MyTripList',
  data() {
    return {
      tripItems: [
        {
          thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          destination: '프랑스 파리',
          startDate: '2021.11.27',
          endDate: '2021.12.2',
        }, {
          thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          destination: '일본 오사카',
          startDate: '2021.11.27',
          endDate: '2021.12.2',
        }, {
          thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          destination: '독일 베를린',
          startDate: '2021.11.27',
          endDate: '2021.12.2',
        }, {
          thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          destination: '호주 시드니',
          startDate: '2021.11.27',
          endDate: '2021.12.2',
        }, {
          thumbnail: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          destination: '미국 뉴욕',
          startDate: '2021.11.27',
          endDate: '2021.12.2',
        },
      ],
    };
  },
};
</script>

<style scoped>
.my-trip-list {
  background-color: var(--background);
  padding-bottom: 2rem;
}

.my-trip-list-container {
  padding: 1.4rem;
}

.my-trip-card {
  display: flex;
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.new-trip-card {
  height: 132px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.my-trip-card:hover, .new-trip-card:hover {
  cursor: pointer;
}

.my-trip-card:active, .new-trip-card:active {
  background-color: var(--background);
}

.my-trip-card-img {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  object-fit: cover;
}

.my-trip-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-trip-card-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

.my-trip-card-date {
  font-size: 0.8rem;
}

.new-trip-icon {
  font-size: 2.2rem;
  margin-right: 0.4rem;
}
</style>