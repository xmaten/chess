import axios from "axios"

const axiosConfig = {
  baseURL: "",
  headers: {
    "Content-Type": "application/json"
  }
}

export const httpClient = axios.create(axiosConfig)
