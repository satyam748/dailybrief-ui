import axios from "axios"

const API = "http://localhost:8080/news"

export async function fetchNews() {
  const res = await axios.get("/news")
  return res.data
}