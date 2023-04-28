import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/Button/Button"
import { ErrorText } from "@/components/ErrorText/ErrorText"
import { Card } from "@/components/Card/Card"
import { Title } from "@/components/Title/Title"
import { Input } from "@/components/Input/Input"
export const JoinGame = () => {
  const [gameId, setGameId] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setError("")

    if (!gameId) {
      setGameId("Game ID is required")
      return
    }

    const payload = {
      gameId
    }

    try {
      await router.push(`/game?lobby=${payload.gameId}`)
    } catch {
      setError("There was an error. Please try again later")
    }
  }

  return (
    <Card>
      <Title>Join Chess Game</Title>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5">
          <Input value={gameId} onChange={setGameId} label="Game ID:" />
        </div>

        {error && <ErrorText error={error} />}

        <Button disabled={Boolean(error)} type="submit">
          Join Game
        </Button>
      </form>
    </Card>
  )
}
