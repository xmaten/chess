import { renderChessPiece } from "@/utils/renderChessPiece"
import { TCell } from "@/types/Cell"

type Props = {
  cell: TCell
}

export const Cell = ({ cell }: Props) => {
  return (
    <div
      key={cell.id}
      style={{
        background: cell.color === "dark" ? "gray" : "white",
        width: "85px",
        height: "85px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px"
      }}>
      {cell.figure ? renderChessPiece(cell.figure) : ""}
    </div>
  )
}
