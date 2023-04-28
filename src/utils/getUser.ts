import { USER_DETAILS } from "@/utils/constants"
import { User } from "@/types/User"

export const getUser = (): null | User => {
  const usr = localStorage.getItem(USER_DETAILS)
  return usr ? JSON.parse(usr) : null
}
