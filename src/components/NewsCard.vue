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
  border-bottom: 1px solid var(--border-card);
  animation: fadeUp 0.4s ease both;
  transition: border-color 0.3s ease;
}

.card:last-child { border-bottom: none; }

.card.featured {
  padding: 32px 28px;
  background: var(--featured-bg);
  border-radius: 4px;
  border-bottom: none;
  margin-bottom: 8px;
  transition: background 0.3s ease;
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
  color: var(--accent);
  transition: color 0.3s ease;
}

.dot { color: var(--text-muted); font-size: 10px; }

.read-time {
  font-family: 'Source Serif 4', serif;
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.featured .read-time { color: var(--featured-muted); }

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.featured .card-title {
  font-size: 26px;
  color: var(--featured-text);
}

.card-summary {
  font-family: 'Source Serif 4', serif;
  font-size: 15.5px;
  font-weight: 300;
  line-height: 1.7;
  color: var(--text-body);
  margin: 0 0 16px 0;
  transition: color 0.3s ease;
}

.featured .card-summary { color: var(--featured-muted); }

.read-link {
  font-family: 'Source Serif 4', serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.2s ease, opacity 0.2s ease, color 0.3s ease;
}

.read-link:hover { gap: 10px; opacity: 0.8; }

.arrow { font-size: 15px; transition: transform 0.2s ease; }

.read-link:hover .arrow { transform: translateX(2px); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>