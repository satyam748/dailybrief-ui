import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchNews(category = null, pageToken = null) {
  const params = {}
  if(category) params.category = category
  if(pageToken) params.pageToken = pageToken
  const res = await axios.get(`${BASE_URL}/news`, { params })
  return res.data
}

export async function searchNews(query) {
  const res = await axios.get(`${BASE_URL}/news/search`, { params: { q: query } })
  return res.data
}

export function timeAgo(dateStr) {
  if (!dateStr) return ''

  const published = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now - published) / 1000) // seconds

  if (diff < 60)   return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`
  return `${Math.floor(diff / 86400)}d ago`
}