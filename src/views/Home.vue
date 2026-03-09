<template>

  <div class="container">

    <h1>Daily Brief</h1>

    <NewsCard v-for="article in news" :key="article.url" :article="article" />

  </div>

</template>

<script setup>

import { ref, onMounted } from "vue"
import NewsCard from "../components/NewsCard.vue"
import { fetchNews } from "../services/newsService"

const news = ref([])

onMounted(async () => {
  news.value = await fetchNews()
})

</script>

<style>
.container {
  max-width: 720px;
  margin: auto;
  padding: 40px;
  font-family: Arial;
}
</style>