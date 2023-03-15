import { useState } from "react"
import { httpClient } from "@/services/httpClient"
import { useRouter } from "next/router"

export const JoinGame = () => {
  const [username, setUsername] = useState("")
  const [gameId, setGameId] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setError("")

    if (!username) {
      setError("Username is required")
      return
    }

    if (!gameId) {
      setGameId("Game ID is required")
      return
    }

    const data = {
      username,
      gameId
    }

    try {
      const res = await httpClient.post("/game/join", data)

      // 1. Save token
      await router.push(`/game/${gameId}`)
    } catch {
      setError("There was an error. Please try again later")
    }
  }

  return (
    <div className="w-1/4 mx-auto mt-20">
      <div className="p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
        <h1 className="text-3xl text-center">Join Chess Game</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-5">
            <label className="flex flex-col mb-4">
              Username:
              <input
                className="border-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="flex flex-col">
              Game ID:
              <input
                className="border-2"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
              />
            </label>
          </div>

          {error && <p className="text-red my-2">{error}</p>}

          <button
            type="submit"
            disabled={Boolean(error)}
            className="text-white mt-8 w-full   focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
            Join
          </button>
        </form>
      </div>
    </div>
  )
}
