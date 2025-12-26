<script setup>
import SearchResultItem from '@/components/SearchResultItem.vue'

defineProps({
  results: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="list-container">
    <p v-if="results.length === 0" class="no-result">No results found.</p>

    <TransitionGroup name="fade" tag="div" class="results-container" appear>
      <div
        v-for="(result, index) in results"
        :key="result.id"
        class="list-item-container"
        :style="{ transitionDelay: `${(index%10)*100}ms` }"
      >
        <SearchResultItem :item="result" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-container {
  padding-top: 20px;
}
.results-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}
.no-result {
  text-align: center;
}
.list-item-container {
  width: 100%;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-leave-active {
  position: absolute;
  width: calc(100% - 24px);
}
</style>
