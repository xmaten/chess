import { Cell } from "@/components/Cell/Cell"
import { initialBoard } from "@/utils/initialBoard"
import { YAxis } from "@/components/YAxis/YAxis"
import { XAxis } from "@/components/XAxis/XAxis"

export const Board = () => {
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
          {initialBoard.map((row, index) => (
            <div key={index}>
              {row.map((cell) => (
                <Cell key={cell.id} cell={cell} />
              ))}
            </div>
          ))}
        </div>

        <XAxis />
      </div>
    </div>
  )
}
