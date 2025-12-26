<script setup>
import SearchBar from '@/components/SearchBar.vue'
import { fetchSearchResults } from '@/services/mockApi.js'
import SearchResultList from '@/components/SearchResultList.vue'
import { onUnmounted, ref, watch } from 'vue'
import { delay } from '@/utils/optimisation.js'
import { onMounted } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const searchQuery = ref('')
const result = ref([])
const isLoading = ref(false)
const error = ref(null)
const isLoadingMore = ref(false)

const page = ref(1)
const moreData = ref(true)

const bottomSensor = ref(null) // to trigger infinite scrolling
let observer = null

onMounted(() => {
  isLoading.value = true
  searching('')
})
// using delay function so as to search only when user stops typing for 300 ms
const searching = delay(async (query) => {
  // if empty search box should show no data then this should be used
  // if (!query.trim()) {
  //  result.value = []
  //  isLoading.value = false
  //  return
  //}

  try {
    isLoading.value = true
    error.value = null
    page.value = 1
    moreData.value = true
    result.value = await fetchSearchResults(query, 1)
  } catch (err) {
    // logging error
    error.value = 'Error while fetching results.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}, 300)

const loadMore = async () => {
  if (isLoading.value || isLoadingMore.value || !moreData.value) {
    return
  }
  try {
    isLoadingMore.value = true
    const nextPage = page.value + 1

    const newItems = await fetchSearchResults(searchQuery.value, nextPage)
    if (newItems.length === 0) {
      moreData.value = false
    } else {
      result.value.push(...newItems)
      page.value = nextPage
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingMore.value = false
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    {
      rootMargin: '100px',
    },
  )
  if (bottomSensor.value) {
    observer.observe(bottomSensor.value)
  }
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})
// changes in the search
watch(searchQuery, (newValu) => {
  searching(newValu)
})
</script>
<template>
  <main class="main">
    <header class="main-container">
      <h1>Search for Information</h1>
      <SearchBar class="search-bar" v-model="searchQuery" />
      <LoadingSpinner v-if="isLoading" />
      <div v-else-if="error" style="color: darkred">{{ error }}</div>
      <SearchResultList v-else :results="result" class="card-width" />
      <div ref="bottomSensor" class="sensor-container">
        <p v-if="isLoadingMore">Loading more data...</p>
      </div>
    </header>
  </main>
</template>

<style scoped>
.main {
  background-color: #f1f5f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.main-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 40px 20px;
}
.card-width {
  width: 100%;
}

.search-bar {
  width: 100%;
  max-width: 600px;

  display: flex;
  align-items: center;
}
.sensor-container {
  height: 20px;
  margin-top: 20px;
  text-align: center;
}
</style>
