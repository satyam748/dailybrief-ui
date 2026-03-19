<template>
  <div class="page">

    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <div class="header-top">
          <span class="date">{{ today }}</span>
          <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
        <h1 class="masthead">Daily Brief</h1>
        <p class="tagline">The most important stories, nothing more.</p>
        <div class="rule"></div>
      </div>
      <nav class="categories">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="{ active: selectedCategory === cat.value }"
          @click="selectCategory(cat.value)"
        >
          {{ cat.label }}
        </button>
      </nav>
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
      <p>Daily Brief · Built by Satyam · Updated every 15 minutes</p>
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
const selectedCategory = ref(null)
const isDark = ref(false)

const categories = [
  { label: "Top",           value: "top" },
  { label: "World",         value: "world" },
  { label: "Tech",          value: "technology" },
  { label: "Business",      value: "business" },
  { label: "Science",       value: "science" },
  { label: "Sports",        value: "sports" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health",        value: "health" },
]

const today = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
})

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  isDark.value = dark
}

function toggleTheme() {
  const newVal = !isDark.value
  applyTheme(newVal)
  localStorage.setItem('theme', newVal ? 'dark' : 'light')
}

function initTheme() {
  const saved = localStorage.getItem('theme')
  if (saved) {
    applyTheme(saved === 'dark')
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark)
  }
}

async function loadNews() {
  loading.value = true
  error.value = null
  try {
    news.value = await fetchNews(selectedCategory.value)
  } catch (e) {
    error.value = "Couldn't load stories. Please try again."
  } finally {
    loading.value = false
  }
}

function selectCategory(category) {
  selectedCategory.value = category
  loadNews()
}

onMounted(() => {
  initTheme()
  loadNews()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');

/* ── CSS Variables ── */
:root {
  --bg:             #f5f0e8;
  --border:         #1a1a18;
  --border-soft:    #c8c0b4;
  --border-card:    #e8e2d9;
  --text-primary:   #1a1a18;
  --text-muted:     #9e9991;
  --text-body:      #4a4540;
  --accent:         #b5813a;
  --featured-bg:    #1a1a18;
  --featured-text:  #f0ebe2;
  --featured-muted: #a8a49e;
  --footer-text:    #b5b0a8;
}

[data-theme="dark"] {
  --bg:             #0f0f0d;
  --border:         #3a3832;
  --border-soft:    #2a2826;
  --border-card:    #2a2826;
  --text-primary:   #f0ebe2;
  --text-muted:     #6a6660;
  --text-body:      #a8a49e;
  --accent:         #d4a855;
  --featured-bg:    #1e1e1c;
  --featured-text:  #f0ebe2;
  --featured-muted: #6a6660;
  --footer-text:    #4a4540;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  transition: background 0.3s ease;
  min-height: 100vh;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: var(--bg);
  padding: 40px 24px 0;
  border-bottom: 3px double var(--border);
  transition: background 0.3s ease, border-color 0.3s ease;
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

.date {
  font-family: 'Source Serif 4', serif;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  line-height: 1;
  transition: transform 0.2s ease;
}

.theme-toggle:hover { transform: scale(1.2); }

.masthead {
  font-family: 'Playfair Display', serif;
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: -0.02em;
  text-align: center;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.tagline {
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  font-size: 14px;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 24px;
  transition: color 0.3s ease;
}

.rule {
  height: 1px;
  background: var(--border-soft);
  transition: background 0.3s ease;
}

/* Content */
.content {
  flex: 1;
  max-width: 760px;
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
  background: var(--accent);
  margin: 0 auto 20px;
  animation: pulse 1.2s ease-in-out infinite;
}

.loading p {
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  color: var(--text-muted);
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
  color: var(--text-muted);
  margin-bottom: 16px;
}

.error button {
  font-family: 'Source Serif 4', serif;
  font-size: 13px;
  letter-spacing: 0.08em;
  background: none;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.error button:hover {
  background: var(--accent);
  color: white;
}

/* Empty */
.empty {
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  color: var(--text-muted);
  text-align: center;
  padding: 60px 0;
}

/* Footer */
.footer {
  padding: 24px;
  border-top: 1px solid var(--border-card);
  text-align: center;
  transition: border-color 0.3s ease;
}

.footer p {
  font-family: 'Source Serif 4', serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--footer-text);
  transition: color 0.3s ease;
}

/* Mobile */
@media (max-width: 600px) {
  .header { padding: 28px 16px 0; }
  .content { padding: 8px 16px 40px; }
}

/* Categories */
.categories {
  display: flex;
  gap: 4px;
  padding: 16px 24px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  max-width: 760px;   
  margin: 0 auto;
}

.categories::-webkit-scrollbar { display: none; }

.categories button {
  font-family: 'Source Serif 4', serif;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: none;
  border: none;
  padding: 8px 14px;
  color: var(--text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.categories button:hover { color: var(--text-primary); }

.categories button.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
</style>