import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Board } from "@/components/Board/Board"
import { Game } from "@/controllers/Game"
import { useMemo } from "react"

export default function Home() {
  const game = useMemo(() => new Game(), [])

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <DndProvider backend={HTML5Backend}>
        <Board game={game} />
      </DndProvider>
    </div>
  )
}
