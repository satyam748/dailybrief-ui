import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchNews(category = null) {
  const params = category ? { category } : {}
  const res = await axios.get(`${BASE_URL}/news`, { params })
  return res.data
}