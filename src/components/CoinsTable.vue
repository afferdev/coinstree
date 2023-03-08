<template>
  <h3 class="p-4">Total Records: {{ coins.length }}</h3>
  <table class="w-full border-collapse container mx-auto">
    <thead class="bg-gray-100">
      <tr>
        <th
          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          No.
        </th>
        <th
          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Coin Name
        </th>
        <th
          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Coin Symbol
        </th>
        <th
          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Market Cap
        </th>
        <th
          v-if="showIndicator"
          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Indicator
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr
        v-for="(coin, index) in coins.slice(startingIndex, endingIndex)"
        :key="index"
      >
        <td class="px-6 py-4 text-center whitespace-nowrap">
          {{ startingIndex + index + 1 }}
        </td>
        <td class="px-6 py-4 text-center whitespace-nowrap">
          {{ coin.coinName }}
        </td>
        <td class="px-6 py-4 text-center whitespace-nowrap">
          {{ coin.symbol }}
        </td>
        <td class="px-6 py-4 text-center whitespace-nowrap">
          {{ coin.marketCap }}
        </td>
        <td
          v-if="showIndicator"
          class="px-6 py-4 text-center whitespace-nowrap"
        >
          {{ coin.indicator }}
        </td>
      </tr>
    </tbody>
  </table>
  <TablePaginator
    :total-pages="totalPages"
    :curr-page="state.currPage"
    @newPage="onNewPage"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { Coin } from '@/interfaces';
import TablePaginator from '@/components/TablePaginator.vue';

const PAGE_SIZE = 10;

export default defineComponent({
  name: 'CoinsTable',
  components: {
    TablePaginator,
  },
  props: {
    coins: {
      type: Array as () => Coin[],
      required: true,
    },
    showIndicator: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      currPage: 1 as number,
    });

    function onNewPage(newPageValue: number) {
      state.currPage = newPageValue;
    }

    const totalPages = computed(() => {
      return Math.ceil(props.coins.length / PAGE_SIZE);
    });

    const startingIndex = computed(() => {
      return state.currPage * 10 - 10;
    });

    const endingIndex = computed(() => {
      const startingInd = state.currPage * 10 - 10;
      if (startingInd + 10 <= props.coins.length) {
        return startingInd + 10;
      }
      return props.coins.length;
    });

    return { state, onNewPage, totalPages, startingIndex, endingIndex };
  },
});
</script>
