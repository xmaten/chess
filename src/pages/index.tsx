import { ButtonLink } from "@/components/ButtonLink/ButtonLink"
import { Title } from "@/components/Title/Title"
import { useEffect, useState } from "react"
import { httpClient } from "@/services/httpClient"
import { User } from "@/types/User"
import { Button } from "@/components/Button/Button"
import { AUTH_TOKEN_KEY } from "@/utils/constants"

export default function Home() {
  const [user, setUser] = useState<null | User>(null)

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await httpClient.get("/auth/profile")
        if (data.data) {
          setUser(data.data)
        }
      } catch {
        setUser(null)
      }
    }

    getUser()
  }, [])

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col gap-10">
      <Title>Play Chess</Title>
      <div>
        {!user?.email ? (
          <>
            <ButtonLink url="/auth/register">Register</ButtonLink>
            <ButtonLink url="/auth/login">Login</ButtonLink>
          </>
        ) : (
          <div className="grid grid-cols-3">
            <ButtonLink url="/game/join">Join Game</ButtonLink>
            <ButtonLink url="/game/create">Create Game</ButtonLink>
            <Button onClick={() => handleLogout()}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  )
}
