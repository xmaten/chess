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
            piece,
            wasAlreadyMoved: true
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

    if (piece === "dark-rook" || piece === "light-rook") {
      return this.canMoveRook(from, to, piece)
    }

    if (piece === "dark-pawn" || piece === "light-pawn") {
      return this.canMovePawn(from, to, piece)
    }

    if (piece === "dark-king" || piece === "light-king") {
      return this.canMoveKing(from, to, piece)
    }

    if (piece === "dark-bishop" || piece === "light-bishop") {
      return this.canMoveBishop(from, to, piece)
    }

    return true
  }

  canMoveBishop(from: string, to: string, piece: string) {
    const [color] = piece.split("-")

    const targetCell = this.getCell(to)

    if (!targetCell) {
      return false
    }

    if (
      this.isTargetKing(targetCell) ||
      this.isTargetSameColor(targetCell, color)
    ) {
      return false
    }

    const bishopXNumber = Number(from.split("-")[0])
    const bishopYNumber = Number(from.split("-")[1])

    const toXNumber = Number(to.split("-")[0])
    const toYNumber = Number(to.split("-")[1])

    const isMovingDown =
      piece === "light-bishop"
        ? bishopYNumber > toYNumber
        : bishopYNumber < toYNumber
    const isMovingLeft =
      piece === "light-bishop"
        ? toXNumber < bishopXNumber
        : toXNumber > bishopXNumber

    if (isMovingDown) {
      if (isMovingLeft) {
        let cellsInTheWay = []
        for (let i = bishopXNumber - 1; i >= toXNumber; i--) {
          const id = `${i}-${i - 1}`
          const cell = this.getCell(id)
          if (cell) {
            cellsInTheWay.push(cell)
          }
        }

        const piecesBetweenRookAndTarget =
          this.getPiecesFromCells(cellsInTheWay)

        return !piecesBetweenRookAndTarget.length
      } else {
        let cellsInTheWay = []
        let iteration = 0
        for (let i = bishopXNumber; i < toXNumber; i++) {
          iteration++
          const id = `${i + 1}-${i - iteration * 2}`
          const cell = this.getCell(id)
          if (cell) {
            cellsInTheWay.push(cell)
          }
        }

        const piecesBetweenRookAndTarget =
          this.getPiecesFromCells(cellsInTheWay)

        return !piecesBetweenRookAndTarget.length
      }
    } else {
      if (isMovingLeft) {
        let cellsInTheWay = []
        let iteration = 0
        for (let i = bishopXNumber - 1; i >= toXNumber; i--) {
          iteration++
          const id = `${i}-${i + iteration * 2 - 1}`
          const cell = this.getCell(id)
          if (cell) {
            cellsInTheWay.push(cell)
          }
        }

        const piecesBetweenRookAndTarget =
          this.getPiecesFromCells(cellsInTheWay)

        return !piecesBetweenRookAndTarget.length
      } else {
        let cellsInTheWay = []
        let iteration = 0
        for (let i = bishopXNumber; i < toXNumber; i++) {
          iteration++
          const id = `${i + 1}-${i}`
          const cell = this.getCell(id)
          if (cell) {
            cellsInTheWay.push(cell)
          }
        }

        const piecesBetweenRookAndTarget =
          this.getPiecesFromCells(cellsInTheWay)

        return !piecesBetweenRookAndTarget.length
      }
    }

    return true
  }

  canMoveKing(from: string, to: string, piece: string) {
    const [color] = piece.split("-")

    const targetCell = this.getCell(to)

    if (!targetCell) {
      return false
    }

    if (
      this.isTargetKing(targetCell) ||
      this.isTargetSameColor(targetCell, color)
    ) {
      return false
    }

    const kingXNumber = Number(from.split("-")[0])
    const kingYNumber = Number(from.split("-")[1])

    const potentialCellsIds = [
      this.getCell(`${kingXNumber + 1}-${kingYNumber + 1}`),
      this.getCell(`${kingXNumber - 1}-${kingYNumber - 1}`),
      this.getCell(`${kingXNumber + 1}-${kingYNumber - 1}`),
      this.getCell(`${kingXNumber - 1}-${kingYNumber + 1}`),
      this.getCell(`${kingXNumber - 1}-${kingYNumber}`),
      this.getCell(`${kingXNumber + 1}-${kingYNumber}`),
      this.getCell(`${kingXNumber}-${kingYNumber - 1}`),
      this.getCell(`${kingXNumber}-${kingYNumber + 1}`)
    ].map((cell) => cell?.id)

    if (potentialCellsIds.includes(to)) {
      return true
    }

    return false
  }

  canMovePawn(from: string, to: string, piece: string) {
    const [color] = piece.split("-")

    const targetCell = this.getCell(to)

    if (!targetCell) {
      return false
    }

    if (
      this.isTargetKing(targetCell) ||
      this.isTargetSameColor(targetCell, color)
    ) {
      return false
    }

    const fromCell = this.getCell(from)
    const pawnXNumber = Number(from.split("-")[0])
    const pawnYNumber = Number(from.split("-")[1])

    const toXNumber = Number(to.split("-")[0])
    const toYNumber = Number(to.split("-")[1])

    const nextCell =
      piece === "light-pawn"
        ? this.getCell(`${pawnXNumber}-${pawnYNumber + 1}`)
        : this.getCell(`${pawnXNumber}-${pawnYNumber - 1}`)

    if (fromCell?.wasAlreadyMoved) {
      if (
        !nextCell?.piece &&
        (piece === "light-pawn"
          ? toYNumber === pawnYNumber + 1 && toXNumber === pawnXNumber
          : toYNumber === pawnYNumber - 1 && toXNumber === pawnXNumber)
      ) {
        return true
      }
    } else {
      const nextCell2 =
        piece === "light-pawn"
          ? this.getCell(`${pawnXNumber}-${pawnYNumber + 2}`)
          : this.getCell(`${pawnXNumber}-${pawnYNumber - 2}`)

      if (
        !nextCell?.piece &&
        (piece === "light-pawn"
          ? toYNumber === pawnYNumber + 1 && toXNumber === pawnXNumber
          : toYNumber === pawnYNumber - 1 && toXNumber === pawnXNumber)
      ) {
        return true
      }

      if (
        !nextCell?.piece &&
        !nextCell2?.piece &&
        (piece === "light-pawn"
          ? toYNumber === pawnYNumber + 2 && toXNumber === pawnXNumber
          : toYNumber === pawnYNumber - 2 && toXNumber === pawnXNumber)
      ) {
        return true
      }
    }

    if (targetCell.piece) {
      const topLeftCoords =
        piece === "light-pawn"
          ? `${pawnXNumber - 1}-${pawnYNumber + 1}`
          : `${pawnXNumber - 1}-${pawnYNumber - 1}`
      const topRightCoords =
        piece === "light-pawn"
          ? `${pawnXNumber + 1}-${pawnYNumber + 1}`
          : `${pawnXNumber + 1}-${pawnYNumber - 1}`

      const topLeftCell = this.getCell(topLeftCoords)
      const topRightCell = this.getCell(topRightCoords)

      if (
        (topLeftCell && `${toXNumber}-${toYNumber}` === topLeftCell.id) ||
        (topRightCell && `${toXNumber}-${toYNumber}` === topRightCell.id)
      ) {
        return true
      }
    }

    return false
  }

  canMoveRook(from: string, to: string, piece: PieceType) {
    const [color] = piece.split("-")

    const targetCell = this.getCell(to)

    if (!targetCell) {
      return false
    }

    if (
      this.isTargetKing(targetCell) ||
      this.isTargetSameColor(targetCell, color)
    ) {
      return false
    }

    const rookXNumber = Number(from.split("-")[0])
    const rookYNumber = Number(from.split("-")[1])

    let isHorizontalMove = false
    let isVerticalMove = false

    const toXNumber = Number(to.split("-")[0])
    const toYNumber = Number(to.split("-")[1])

    if (rookXNumber === toXNumber) {
      isVerticalMove = true
    }

    if (rookYNumber === toYNumber) {
      isHorizontalMove = true
    }

    if (!isHorizontalMove && !isVerticalMove) {
      return false
    }

    if (isHorizontalMove) {
      const isTargetOnTheLeft = toXNumber < rookXNumber
      const rookRow = [...this.getRow(rookYNumber)]

      // TODO: Fix type
      let cellsInTheWay: any = []
      if (isTargetOnTheLeft) {
        cellsInTheWay = [...rookRow]
          .slice(toXNumber - 1, rookXNumber - 1)
          .filter(Boolean)
      } else {
        cellsInTheWay = [...rookRow]
          .slice(rookXNumber, toXNumber)
          .filter(Boolean)
      }

      const piecesBetweenRookAndTarget = this.getPiecesFromCells(cellsInTheWay)

      return !piecesBetweenRookAndTarget.length
    }

    if (isVerticalMove) {
      const isTargetAboveRook = toYNumber > rookYNumber
      const rookColumn = [...this.getColumn(rookXNumber)]

      let cellsInTheWay = []
      if (isTargetAboveRook) {
        cellsInTheWay = [...rookColumn].reverse().slice(rookYNumber, toYNumber)
      } else {
        cellsInTheWay = [...rookColumn]
          .reverse()
          .slice(toYNumber - 1, rookYNumber - 1)
      }

      const piecesBetweenRookAndTarget = this.getPiecesFromCells(cellsInTheWay)

      return !piecesBetweenRookAndTarget.length
    }

    return false
  }

  getPiecesFromCells(cells: TCell[]) {
    return cells.map((cell) => cell.piece).filter(Boolean)
  }

  getRow(rowNumber: number) {
    const row = this.board
      .map((row) =>
        row.map((col, index) => (index + 1 === rowNumber + 1 ? col : null))
      )
      .flat()
      .filter(Boolean)

    return row
  }

  getColumn(columnNumber: number) {
    return this.board[columnNumber - 1]
  }

  canMoveKnight(from: string, to: string, piece: PieceType) {
    const [color] = piece.split("-")

    const targetCell = this.getCell(to)

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

  getCell(id: string) {
    return this.allCells.find((cell) => cell.id === id)
  }
}
