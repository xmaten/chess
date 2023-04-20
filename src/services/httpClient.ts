import axios from "axios"
import { getToken } from "@/services/getToken"

const axiosConfig = {
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json"
  }
}

export const httpClient = axios.create(axiosConfig)

httpClient.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }

  return config
})
