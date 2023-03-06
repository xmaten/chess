import { TCell } from "@/types/Cell"
import { useDrop } from "react-dnd"
import { Game } from "@/controllers/Game"
import { Piece } from "@/components/Piece/Piece"
import { Overlay } from "@/components/Overlay/Overlay"

type Props = {
  cell: TCell
  game: Game
  board: TCell[][]
}

export const Cell = ({ cell, game, board }: Props) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "piece",
      canDrop: (object) => {
        return game.canMovePiece(object.id, cell.id, object.piece!)
      },
      drop: (object: TCell) => {
        return game.movePiece(object.id, cell.id, object.piece!)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    [board]
  )

  return (
    <div
      ref={drop}
      key={cell.id}
      style={{
        background: cell.color === "dark" ? "gray" : "white",
        width: "85px",
        height: "85px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
        position: "relative"
      }}>
      <p style={{ color: "pink", fontSize: "16px" }}>{cell.id}</p>
      <Piece cell={cell} piece={cell.piece} />
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  )
}
