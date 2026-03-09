<template>
  <div class="page">

    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <div class="header-top">
          <span class="edition">Morning Edition</span>
          <span class="date">{{ today }}</span>
        </div>
        <h1 class="masthead">Daily Brief</h1>
        <p class="tagline">The most important stories, nothing more.</p>
        <div class="rule"></div>
      </div>
    </header>

    <!-- Main content -->
    <main class="content">

      <!-- Loading state -->
      <div v-if="loading" class="loading">
        <div class="loading-bar"></div>
        <p>Gathering today's stories…</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="loadNews">Try again</button>
      </div>

      <!-- News list -->
      <div v-else>
        <!-- First card is featured -->
        <NewsCard
          v-if="news.length > 0"
          :article="news[0]"
          :featured="true"
        />

        <!-- Rest of the cards -->
        <NewsCard
          v-for="article in news.slice(1)"
          :key="article.url"
          :article="article"
        />

        <p v-if="news.length === 0" class="empty">No stories found. Check back soon.</p>
      </div>

    </main>

    <footer class="footer">
      <p>Daily Brief · Updated every 15 minutes</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import NewsCard from "../components/NewsCard.vue"
import { fetchNews } from "../services/newsService"

const news = ref([])
const loading = ref(true)
const error = ref(null)

const today = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
})

async function loadNews() {
  loading.value = true
  error.value = null
  try {
    news.value = await fetchNews()
  } catch (e) {
    error.value = "Couldn't load stories. Please try again."
  } finally {
    loading.value = false
  }
}

onMounted(loadNews)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #f5f0e8;
  min-height: 100vh;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: #f5f0e8;
  padding: 40px 24px 0;
  border-bottom: 3px double #1a1a18;
}

.header-inner {
  max-width: 680px;
  margin: 0 auto;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.edition, .date {
  font-family: 'Source Serif 4', serif;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9e9991;
}

.masthead {
  font-family: 'Playfair Display', serif;
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 700;
  color: #1a1a18;
  line-height: 1;
  letter-spacing: -0.02em;
  text-align: center;
  margin-bottom: 10px;
}

.tagline {
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  font-size: 14px;
  color: #9e9991;
  text-align: center;
  margin-bottom: 24px;
}

.rule {
  height: 1px;
  background: #c8c0b4;
}

/* Content */
.content {
  flex: 1;
  max-width: 680px;
  margin: 0 auto;
  padding: 8px 24px 48px;
  width: 100%;
}

/* Loading */
.loading {
  padding: 60px 0;
  text-align: center;
}

.loading-bar {
  width: 48px;
  height: 2px;
  background: #b5813a;
  margin: 0 auto 20px;
  animation: pulse 1.2s ease-in-out infinite;
}

.loading p {
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  color: #9e9991;
  font-size: 15px;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scaleX(0.6); }
  50% { opacity: 1; transform: scaleX(1); }
}

/* Error */
.error {
  padding: 48px 0;
  text-align: center;
}

.error p {
  font-family: 'Source Serif 4', serif;
  color: #9e9991;
  margin-bottom: 16px;
}

.error button {
  font-family: 'Source Serif 4', serif;
  font-size: 13px;
  letter-spacing: 0.08em;
  background: none;
  border: 1px solid #b5813a;
  color: #b5813a;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.error button:hover {
  background: #b5813a;
  color: white;
}

/* Empty */
.empty {
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  color: #9e9991;
  text-align: center;
  padding: 60px 0;
}

/* Footer */
.footer {
  padding: 24px;
  border-top: 1px solid #e8e2d9;
  text-align: center;
}

.footer p {
  font-family: 'Source Serif 4', serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #b5b0a8;
}

/* Mobile */
@media (max-width: 600px) {
  .header { padding: 28px 16px 0; }
  .content { padding: 8px 16px 40px; }
}
</style>
