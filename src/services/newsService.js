import axios from "axios"

const API = "http://localhost:8080/news"
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchNews() {
  const res = await axios.get(BASE_URL + "/news")
  return res.data
}