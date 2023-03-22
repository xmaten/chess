import { Chessboard } from "react-chessboard"
import { useGame } from "@/hooks/useGame"

export const Game = () => {
  const { game, onMouseOverSquare, onMouseOutSquare, onDrop } = useGame()

  return (
    <Chessboard
      boardWidth={800}
      position={game.fen()}
      onPieceDrop={onDrop}
      onMouseOverSquare={onMouseOverSquare}
      onMouseOutSquare={onMouseOutSquare}
    />
  )
}
