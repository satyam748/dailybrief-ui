<template>

  <div class="card">

    <h3>{{ article.title }}</h3>

    <p>{{ article.summary }}</p>

    <a :href="article.url" target="_blank">
      Read full article
    </a>

    <span class="source">{{ article.source }}</span>

  </div>

</template>

<script setup>
defineProps({
  article: Object
})
</script>

<style scoped>
.card {
  background: white;
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

h3 {
  margin-bottom: 8px;
}

p {
  color: #555;
}

.source {
  font-size: 12px;
  color: #888;
  display: block;
  margin-top: 8px;
}
</style>