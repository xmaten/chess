import { initialBoard } from "@/utils/initialBoard"
import { PieceType, TCell } from "@/types/Cell"

export type PositionObserver = ((position: any) => void) | null

export class Game {
  private board = initialBoard
  private allCells: TCell[] = []
  private observers: PositionObserver[] = []

  constructor() {
    this.flattenBoard()
  }

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

    this.flattenBoard()
    this.emitChange()
  }

  canMovePiece(from: string, to: string, piece: PieceType) {
    if (piece === "dark-knight" || piece === "light-knight") {
      return this.canMoveKnight(from, to, piece)
    }

    return true
  }

  canMoveKnight(from: string, to: string, piece: PieceType) {
    const [color] = piece.split("-")

    const targetCell = this.getTargetCell(to)

    if (!targetCell) {
      return false
    }

    if (
      this.isTargetKing(targetCell) ||
      this.isTargetSameColor(targetCell, color)
    ) {
      return false
    }

    const fromX = Number(from.split("-")[0])
    const fromY = Number(from.split("-")[1])

    const toX = Number(to.split("-")[0])
    const toY = Number(to.split("-")[1])

    const dx = toX - fromX
    const dy = toY - fromY

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
  }

  flattenBoard() {
    this.allCells = this.board.flat()
  }

  isTargetKing(targetCell: TCell) {
    return targetCell.piece?.includes("king")
  }

  isTargetSameColor(targetCell: TCell, fromColor: string) {
    return targetCell.piece?.includes(fromColor)
  }

  getTargetCell(to: string) {
    return this.allCells.find((cell) => cell.id === to)
  }
}
