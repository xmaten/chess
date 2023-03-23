import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/Button/Button"
import { ErrorText } from "@/components/ErrorText/ErrorText"
import { Card } from "@/components/Card/Card"
import { Title } from "@/components/Title/Title"
import { Input } from "@/components/Input/Input"
import { socket } from "@/services/socket"

export const CreateGame = () => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    socket.connect()

    setError("")

    if (!username) {
      setError("Username is required")
      return
    }

    const payload = {
      username
    }

    try {
      // const { data } = await httpClient.post<Game>("/game/create", payload)
      socket.emit("client.lobby.create")

      // await router.push(`/game?${data.gameId}`)
    } catch {
      setError("There was an error. Please try again later")
    }
  }

  useEffect(() => {
    const onLobbyState = async (data: any) => {
      router.query.lobby = data.lobbyId

      await router.push(
        {
          pathname: "/game",
          query: { ...router.query }
        },
        undefined,
        {}
      )
    }
    socket.on("server.lobby.state", onLobbyState)

    return () => {
      socket.on("server.lobby.state", onLobbyState)
    }
  }, [])

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
