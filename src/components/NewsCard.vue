<template>
  <article class="card" :class="{ featured: featured }">
    <div class="card-meta">
      <span class="source">{{ article.source }}</span>
      <span class="dot">·</span>
      <span class="read-time">2 min read</span>
    </div>

    <h2 class="card-title">{{ article.title }}</h2>

    <p class="card-summary">{{ article.summary }}</p>

    <a :href="article.url" target="_blank" rel="noopener" class="read-link">
      Read full article
      <span class="arrow">→</span>
    </a>
  </article>
</template>

<script setup>
defineProps({
  article: Object,
  featured: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');

.card {
  padding: 28px 0;
  border-bottom: 1px solid #e8e2d9;
  animation: fadeUp 0.4s ease both;
}

.card:last-child {
  border-bottom: none;
}

.card.featured {
  padding: 32px 28px;
  background: #1a1a18;
  border-radius: 4px;
  border-bottom: none;
  margin-bottom: 8px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.source {
  font-family: 'Source Serif 4', serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #b5813a;
}

.featured .source {
  color: #d4a855;
}

.dot {
  color: #bbb;
  font-size: 10px;
}

.read-time {
  font-family: 'Source Serif 4', serif;
  font-size: 11px;
  color: #9e9991;
  letter-spacing: 0.05em;
}

.featured .read-time {
  color: #7a7a72;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.35;
  color: #1a1a18;
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
}

.featured .card-title {
  font-size: 26px;
  color: #f0ebe2;
}

.card-summary {
  font-family: 'Source Serif 4', serif;
  font-size: 15.5px;
  font-weight: 300;
  line-height: 1.7;
  color: #4a4540;
  margin: 0 0 16px 0;
}

.featured .card-summary {
  color: #a8a49e;
}

.read-link {
  font-family: 'Source Serif 4', serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: #b5813a;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.2s ease, opacity 0.2s ease;
}

.featured .read-link {
  color: #d4a855;
}

.read-link:hover {
  gap: 10px;
  opacity: 0.8;
}

.arrow {
  font-size: 15px;
  transition: transform 0.2s ease;
}

.read-link:hover .arrow {
  transform: translateX(2px);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>