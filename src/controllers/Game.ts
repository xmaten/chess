import { initialBoard } from "@/utils/initialBoard"
import { PieceType, TCell } from "@/types/Cell"

export type PositionObserver = ((position: any) => void) | null

export class Game {
  private board = initialBoard
  private observers: PositionObserver[] = []

  get boardState(): TCell[][] {
    return this.board
  }

  public observe(o: PositionObserver): () => void {
    this.observers.push(o)
    this.emitChange()

    return (): void => {
      this.observers = this.observers.filter((t) => t !== o)
    }
  }

  private emitChange() {
    this.observers.forEach((o) => o && o(this.board))
  }

  movePiece(from: string, to: string, piece: PieceType) {
    const newBoard = this.board.map((row) =>
      row.map((cell) => {
        if (cell.id === from) {
          return {
            ...cell,
            piece: null
          }
        }

        if (cell.id === to) {
          return {
            ...cell,
            piece
          }
        }

        return cell
      })
    )

    this.board = newBoard

    this.emitChange()
  }

  canMovePiece(from: string, to: string, piece: PieceType) {
    if (piece === "dark-knight" || piece === "light-knight") {
      return this.canMoveKnight(from, to, piece)
    }

    return true
  }

  canMoveKnight(from: string, to: string, piece: PieceType) {
    const [color, figure] = piece.split("-")

    return true
  }
}
