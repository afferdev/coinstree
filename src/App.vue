<template>
  <div class="container mx-auto px-4">
    <div class="text-2xl text-center p-4 font-bold">All Supported Assets</div>
    <div v-if="state.loading">Loading...</div>
    <div v-if="!state.loading">
      <div class="flex flex-row border-b-2 border-stone-600">
        <button
          class="basis-1/4 p-2"
          :class="{ 'bg-slate-100': state.showCoinsWithForecast }"
          @click="switchView(true)"
        >
          Assets with Indicators
        </button>
        <button
          class="basis-1/4 p-2"
          :class="{ 'bg-slate-100': !state.showCoinsWithForecast }"
          @click="switchView(false)"
        >
          Assets without Indicators
        </button>
      </div>
      <CoinsTable
        v-if="!state.loading && state.showCoinsWithForecast"
        :coins="state.assetsWithForecast"
        :show-indicator="true"
      />
      <CoinsTable
        v-if="!state.loading && !state.showCoinsWithForecast"
        :coins="state.assetsWithoutForecast"
        :show-indicator="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { Coin, FilteredCoinsData } from '@/interfaces';
import { fetchData } from '@/apis';
import CoinsTable from '@/components/CoinsTable.vue';

export default defineComponent({
  name: 'App',
  components: {
    CoinsTable,
  },
  setup() {
    const state = reactive({
      assetsWithForecast: [] as Coin[],
      assetsWithoutForecast: [] as Coin[],
      loading: false,
      showCoinsWithForecast: true,
    });

    onMounted(function () {
      state.loading = true;
      fetchData()
        .then((res: FilteredCoinsData) => {
          state.assetsWithForecast = res.coinsWithIndicators;
          state.assetsWithoutForecast = res.coinsWithoutIndicators;
          state.loading = false;
        })
        .catch((err) => {
          console.log(err);
          state.loading = false;
        });
    });

    function switchView(value: boolean) {
      state.showCoinsWithForecast = value;
    }

    return { state, switchView };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 30px;
}
</style>
