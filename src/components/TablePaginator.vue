<template>
  <ul class="list-style-none flex justify-end">
    <button
      class="mr-6"
      v-if="totalPages > 5"
      :disabled="currPage === 1"
      :class="{ 'cursor-not-allowed': currPage === 1 }"
      @click="() => onNewPage(currPage - 1)"
    >
      Previous
    </button>
    <li
      class="m-3 cursor-pointer w-16 text-center rounded"
      v-for="page in shownPagination"
      :key="page"
      :class="{
        'bg-black text-white': currPage === startingPage + page - 1,
      }"
      @click="() => onNewPage(startingPage + page - 1)"
    >
      {{ startingPage + page - 1 }}
    </li>
    <button
      class="ml-6"
      v-if="totalPages > 5"
      :disabled="currPage === totalPages"
      :class="{ 'cursor-not-allowed': currPage === totalPages }"
      @click="() => onNewPage(currPage + 1)"
    >
      Next
    </button>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'TablePaginator',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currPage: {
      type: Number,
      default: 1 as number,
    },
  },
  setup(props, context) {
    function onNewPage(newPageValue: number): void {
      context.emit('newPage', newPageValue);
    }

    const shownPagination = computed(function () {
      if (props.totalPages <= 5) {
        return props.totalPages;
      }
      return 5;
    });

    const startingPage = computed(function () {
      if (props.currPage <= 5) {
        return 1;
      }
      return props.currPage - 4;
    });

    return { onNewPage, shownPagination, startingPage };
  },
  emits: ['newPage'],
});
</script>
