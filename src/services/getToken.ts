import { AUTH_TOKEN_KEY } from "@/utils/constants"

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}
