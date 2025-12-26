<script setup>
import { ref } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

//whether this specific card is expanded or collapsed
const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="result-item" :class="{ 'is-open': isOpen }">
    <div class="result-header" @click="toggleOpen">
      <!--
      if open display the rest of the details
    -->
      <h3 class="result-title">{{ item.title }}</h3>

      <span class="chevron" :class="{ rotate: isOpen }">▼</span>
    </div>

    <Transition name="expand">
      <div v-if="isOpen" class="result-details">
        <p class="snippet">{{ item.snippet }}</p>

        <div class="meta-data">
          <small>ID: {{ item.id }} / Category: {{ item.category }}</small>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.result-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.result-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.result-item.is-open {
  border-color: #3b82f6;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
}

/*header*/
.result-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
/*title*/
.result-title {
  margin: 0;
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
}

/*details*/
.result-details {
  padding: 0 16px 16px 16px; /* Padding only on bottom/sides */
  color: #64748b;
  border-top: 1px solid #f1f5f9;
  background-color: #f8fafc;
}

.snippet {
  line-height: 1.5;
  margin-top: 12px;
}

.meta-data {
  margin-top: 12px;
  color: #94a3b8;
}

/* 4. Chevron Animation */
.chevron {
  font-size: 0.8rem;
  color: #94a3b8;
  transition: transform 0.3s ease;
}

.chevron.rotate {
  transform: rotate(180deg);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 200px; /* Arbitrary large height */
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
