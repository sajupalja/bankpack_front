<template>
  <div class="my-trip-list">
    <v-container class="my-trip-list-container">
      <h2>나의 여행들</h2>

      <div
        class="my-trip-list-item"
        v-for="(item, i) in tripItems"
        :key="i"
      >
        <router-link
          class="router-link"
          :to="{ name: 'MyTripInfo', params:{ trvlId: item.trvlId } }"
        >
          <div class="my-trip-card">
            <img
              class="my-trip-card-img"
              :src="item.imgUrl"
              alt="thumbnail"
            >
            <div class="my-trip-card-content">
              <div class="my-trip-card-title">{{ item.trvlName }}</div>
              <div class="my-trip-card-date"> {{ item.trvlStartDt }} - {{ item.trvlEndDt }} </div>
            </div>
          </div>
        </router-link>
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
          trvlId: 1,
          imgUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          trvlName: '프랑스 파리',
          trvlStartDt: '2021.11.27',
          trvlEndDt: '2021.12.2',
        }, {
          trvlId: 1,
          imgUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          trvlName: '일본 오사카',
          trvlStartDt: '2021.11.27',
          trvlEndDt: '2021.12.2',
        }, {
          trvlId: 1,
          imgUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          trvlName: '독일 베를린',
          trvlStartDt: '2021.11.27',
          trvlEndDt: '2021.12.2',
        }, {
          trvlId: 1,
          imgUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          trvlName: '호주 시드니',
          trvlStartDt: '2021.11.27',
          trvlEndDt: '2021.12.2',
        }, {
          trvlId: 1,
          imgUrl: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg',
          trvlName: '미국 뉴욕',
          trvlStartDt: '2021.11.27',
          trvlEndDt: '2021.12.2',
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

.my-trip-card:hover {
  cursor: pointer;
}

.my-trip-card:active {
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
  color: var(--font);
}

.my-trip-card-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

.my-trip-card-date {
  font-size: 0.8rem;
}
</style>