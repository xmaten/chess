import { Chessboard } from "react-chessboard"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Chess } from "chess.js"

import { useGame } from "@/hooks/useGame"
import { socket } from "@/services/socket"

export const Game = () => {
  const router = useRouter()
  const [game, setGame] = useState(new Chess())
  const { onMouseOverSquare, onMouseOutSquare, onDrop } = useGame(game, setGame)

  useEffect(() => {
    socket.emit("client.lobby.join", router.query.lobby)
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

    socket.on("server.lobby.state", updateBoard)

    return () => {
      socket.off("server.lobby.state", updateBoard)
    }
  }, [])

  return (
    <div>
      <Chessboard
        boardWidth={800}
        position={game.fen()}
        onPieceDrop={onDrop}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        boardOrientation="white"
      />
    </div>
  )
}
