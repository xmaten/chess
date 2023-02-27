import { renderChessPiece } from "@/utils/renderChessPiece"
import { useDrag } from "react-dnd"
import { TCell } from "@/types/Cell"

type Props = {
  piece: string | null
  cell: TCell
}

export const Piece = ({ piece, cell }: Props) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "piece",
      item: { ...cell },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    [piece]
  )

  return (
    <p ref={drag} style={{ opacity: isDragging ? "0.5" : "1" }}>
      {piece ? renderChessPiece(piece) : ""}
    </p>
  )
}
