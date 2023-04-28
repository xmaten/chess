import { Chessboard } from "react-chessboard"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Chess } from "chess.js"

import { useGame } from "@/hooks/useGame"
import { socket } from "@/services/socket"

export const Game = () => {
  const router = useRouter()
  const [game, setGame] = useState(new Chess())
  const [color, setColor] = useState(null)

  const { onMouseOverSquare, onMouseOutSquare, onDrop, turn } = useGame(
    game,
    setGame
  )

  useEffect(() => {
    socket.emit("client.lobby.join", {
      lobbyId: router.query.lobby
    })
  }, [router])

  useEffect(() => {
    socket.connect()
    function updateBoard(value: any) {
      const newBoard = value.board.game

      if (game && newBoard) {
        const currentBoard = game.fen()

        if (newBoard !== currentBoard) {
          const gameCopy = new Chess()
          gameCopy.load(newBoard)
          setGame(gameCopy)
        }
      }
    }

    const gameMessage = (value: any) => {
      if (!color) {
        setColor(value.color)
      }
    }

    socket.on("server.lobby.state", updateBoard)
    socket.on("server.game.message", gameMessage)

    return () => {
      socket.off("server.lobby.state", updateBoard)
    }
  }, [])

  if (!color) {
    return null
  }

  return (
    <div
      className={
        turn === color ? "pointer-events-auto" : "pointer-events-none"
      }>
      <div>
        Game ID: <span>{router.query.lobby}</span>
      </div>

      <Chessboard
        boardWidth={800}
        position={game.fen()}
        onPieceDrop={onDrop}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        boardOrientation={color}
      />
    </div>
  )
}
