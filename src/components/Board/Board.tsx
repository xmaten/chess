import { Cell } from "@/components/Cell/Cell"
import { YAxis } from "@/components/YAxis/YAxis"
import { XAxis } from "@/components/XAxis/XAxis"
import { Game } from "@/controllers/Game"
import { useEffect, useState } from "react"
import { TCell } from "@/types/Cell"

type Props = {
  game: Game
}

export const Board = ({ game }: Props) => {
  const [board, setBoard] = useState<TCell[][]>(game.boardState)

  useEffect(() => {
    game.observeBoardChange(setBoard)
  }, [])

  return (
    <div style={{ display: "flex" }}>
      <YAxis />

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 85px)",
            border: "2px solid gray"
          }}>
          {board.map((row, index) => (
            <div key={index}>
              {row.map((cell) => (
                <Cell key={cell.id} cell={cell} game={game} board={board} />
              ))}
            </div>
          ))}
        </div>
        <XAxis />
      </div>
    </div>
  )
}
