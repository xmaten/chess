import { useState } from "react"
import { httpClient } from "@/services/httpClient"
import { useRouter } from "next/router"
import { Button } from "@/components/Button/Button"
import { ErrorText } from "@/components/ErrorText/ErrorText"
import { Card } from "@/components/Card/Card"
import { Title } from "@/components/Title/Title"
import { Input } from "@/components/Input/Input"

export const CreateGame = () => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setError("")

    if (!username) {
      setError("Username is required")
      return
    }

    const payload = {
      username
    }

    try {
      // 1. Save token
      const { data } = await httpClient.post("/game/create", payload)

      // 2. Redirect to game
      await router.push(`/game/${data.gameId}`)
    } catch {
      setError("There was an error. Please try again later")
    }
  }

  return (
    <Card>
      <Title>Create Chess Game</Title>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5">
          <Input value={username} onChange={setUsername} label="Username:" />
        </div>

        {error && <ErrorText error={error} />}

        <Button disabled={Boolean(error)} type="submit">
          Create Game
        </Button>
      </form>
    </Card>
  )
}
