import axios from "axios"

const axiosConfig = {
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json"
  }
}

export const httpClient = axios.create(axiosConfig)
