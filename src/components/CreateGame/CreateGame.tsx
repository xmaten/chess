import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/Button/Button"
import { Card } from "@/components/Card/Card"
import { Title } from "@/components/Title/Title"
import { socket } from "@/services/socket"
import { getUser } from "@/utils/getUser"

export const CreateGame = () => {
  const [error, setError] = useState("")
  const router = useRouter()
  const user = getUser()

  const handleCreate = async () => {
    socket.connect()

    if (!user) {
      return
    }

    try {
      socket.emit("client.lobby.create", { playerId: user.sub })
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
      <Button onClick={handleCreate} disabled={Boolean(error)} type="submit">
        Create Game
      </Button>
    </Card>
  )
}
