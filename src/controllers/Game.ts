import { initialBoard } from "@/utils/initialBoard"
import { PieceType, TCell } from "@/types/Cell"

export type PositionObserver = ((position: any) => void) | null

export class Game {
  private board = initialBoard
  private allCells: TCell[] = []
  private boardChangeObserver: PositionObserver = null
  validCells: TCell[] = []

  constructor() {
    this.flattenBoard()
  }

  get boardState(): TCell[][] {
    return this.board
  }

  public observeBoardChange(o: PositionObserver) {
    this.boardChangeObserver = o
    this.emitBoardChange()
  }

  private emitBoardChange() {
    this.boardChangeObserver && this.boardChangeObserver(this.board)
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
    this.emitBoardChange()
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

    if (piece === "light-queen" || piece === "dark-queen") {
      return this.canMoveQueen(from, to, piece)
    }

    return false
  }

  private canMoveHorizontally(
    toXNumber: number,
    toYNumber: number,
    pieceXNumber: number,
    pieceYNumber: number
  ) {
    const isTargetOnTheLeft = toXNumber < pieceXNumber
    const row = [...this.getRow(8 - pieceYNumber)]

    // TODO: Fix type
    let cellsInTheWay: any = []
    if (isTargetOnTheLeft) {
      cellsInTheWay = [...row]
        .slice(toXNumber - 1, pieceXNumber - 1)
        .filter(Boolean)
    } else {
      cellsInTheWay = [...row].slice(pieceXNumber, toXNumber).filter(Boolean)
    }

    const piecesBetweenPieceAndTarget = this.getPiecesFromCells(cellsInTheWay)

    const firstPieceInTheWay = cellsInTheWay.find((cell: any) => cell.piece)
    const isTargetAfterFirstPieceInTheWay =
      firstPieceInTheWay?.id ===
      `${isTargetOnTheLeft ? toXNumber + 1 : toXNumber - 1}-${toYNumber}`

    return (
      cellsInTheWay
        .map((cell: any) => cell.id)
        .includes(`${toXNumber}-${toYNumber}`) &&
      (piecesBetweenPieceAndTarget.length === 0 ||
        piecesBetweenPieceAndTarget.length === 1) &&
      !isTargetAfterFirstPieceInTheWay
    )
  }

  private canMoveVertically(
    toYNumber: number,
    pieceXNumber: number,
    pieceYNumber: number
  ) {
    const isTargetAbovePiece = toYNumber > pieceXNumber
    const column = [...this.getColumn(pieceYNumber)]

    let cellsInTheWay = []
    if (isTargetAbovePiece) {
      cellsInTheWay = [...column].reverse().slice(pieceXNumber, toYNumber - 1)
    } else {
      cellsInTheWay = [...column]
        .reverse()
        .slice(toYNumber - 1, pieceXNumber - 1)
    }

    return !this.getPiecesFromCells(cellsInTheWay).length
  }

  private canMoveDiagonallyDownLeft(
    toXNumber: number,
    toYNumber: number,
    pieceXNumber: number,
    pieceYNumber: number
  ) {
    const cellsInTheWay = []
    let currentX = pieceXNumber - 1
    let currentY = pieceYNumber - 1
    while (currentX !== toXNumber - 1 && currentY !== toYNumber - 1) {
      const id = `${currentX}-${currentY}`
      const cell = this.getCell(id)

      if (cell) {
        cellsInTheWay.push(cell)
      }

      currentX = currentX - 1
      currentY = currentY - 1
    }

    const piecesBetweenBishopAndTarget = this.getPiecesFromCells(cellsInTheWay)
    const firstPieceInTheWay = cellsInTheWay.find((cell) => cell.piece)
    const isTargetAfterFirstPieceInTheWay =
      firstPieceInTheWay?.id === `${toXNumber}-${toYNumber}`

    return (
      cellsInTheWay
        .map((cell) => cell.id)
        .includes(`${toXNumber}-${toYNumber}`) &&
      (isTargetAfterFirstPieceInTheWay ||
        piecesBetweenBishopAndTarget.length === 0)
    )
  }

  private canMoveDiagonallyDownRight(
    toXNumber: number,
    toYNumber: number,
    pieceXNumber: number,
    pieceYNumber: number
  ) {
    const cellsInTheWay = []
    let currentX = pieceXNumber + 1
    let currentY = pieceYNumber - 1
    while (currentX !== toXNumber + 1 && currentY !== toYNumber - 1) {
      const id = `${currentX}-${currentY}`
      const cell = this.getCell(id)
      if (cell) {
        cellsInTheWay.push(cell)
      }

      currentX = currentX + 1
      currentY = currentY - 1
    }

    const piecesBetweenBishopAndTarget = this.getPiecesFromCells(cellsInTheWay)
    const firstPieceInTheWay = cellsInTheWay.find((cell) => cell.piece)
    const isTargetAfterFirstPieceInTheWay =
      firstPieceInTheWay?.id === `${toXNumber}-${toYNumber}`

    return (
      cellsInTheWay
        .map((cell) => cell.id)
        .includes(`${toXNumber}-${toYNumber}`) &&
      (isTargetAfterFirstPieceInTheWay ||
        piecesBetweenBishopAndTarget.length === 0)
    )
  }

  private canMoveDiagonallyUpLeft(
    toXNumber: number,
    toYNumber: number,
    pieceXNumber: number,
    pieceYNumber: number
  ) {
    const cellsInTheWay = []
    let currentX = pieceXNumber - 1
    let currentY = pieceYNumber + 1
    while (currentX !== toXNumber - 2 && currentY !== toYNumber + 1) {
      const id = `${currentX}-${currentY}`
      const cell = this.getCell(id)

      if (cell) {
        cellsInTheWay.push(cell)
      }

      currentX = currentX - 1
      currentY = currentY + 1
    }

    const piecesBetweenBishopAndTarget = this.getPiecesFromCells(cellsInTheWay)
    const firstPieceInTheWay = cellsInTheWay.find((cell) => cell.piece)
    const isTargetAfterFirstPieceInTheWay =
      firstPieceInTheWay?.id === `${toXNumber}-${toYNumber}`

    return (
      cellsInTheWay
        .map((cell) => cell.id)
        .includes(`${toXNumber}-${toYNumber}`) &&
      (isTargetAfterFirstPieceInTheWay ||
        piecesBetweenBishopAndTarget.length === 0)
    )
  }

  private canMoveDiagonallyUpRight(
    toXNumber: number,
    toYNumber: number,
    pieceXNumber: number,
    pieceYNumber: number
  ) {
    const cellsInTheWay = []
    let currentX = pieceXNumber + 1
    let currentY = pieceYNumber + 1
    while (currentX !== toXNumber + 1 && currentY !== toYNumber + 1) {
      const id = `${currentX}-${currentY}`
      const cell = this.getCell(id)
      if (cell) {
        cellsInTheWay.push(cell)
      }

      currentX = currentX + 1
      currentY = currentY + 1
    }

    const piecesBetweenBishopAndTarget = this.getPiecesFromCells(cellsInTheWay)
    const firstPieceInTheWay = cellsInTheWay.find((cell) => cell.piece)
    const isTargetAfterFirstPieceInTheWay =
      firstPieceInTheWay?.id === `${toXNumber}-${toYNumber}`

    return (
      cellsInTheWay
        .map((cell) => cell.id)
        .includes(`${toXNumber}-${toYNumber}`) &&
      (isTargetAfterFirstPieceInTheWay ||
        piecesBetweenBishopAndTarget.length === 0)
    )
  }

  private canMoveQueen(
    from: string,
    to: string,
    piece: "light-queen" | "dark-queen"
  ) {
    this.validCells = []
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

    const queenXNumber = Number(from.split("-")[0])
    const queenYNumber = Number(from.split("-")[1])

    const toXNumber = Number(to.split("-")[0])
    const toYNumber = Number(to.split("-")[1])

    const isMovingDown =
      piece === "light-queen"
        ? queenYNumber > toYNumber
        : queenYNumber < toYNumber
    const isMovingLeft =
      piece === "light-queen"
        ? toXNumber < queenXNumber
        : toXNumber > queenXNumber
    const isVerticalMove = queenXNumber === toXNumber
    const isHorizontalMove = queenYNumber === toYNumber

    // Same code as rook - reuse
    if (isHorizontalMove) {
      return this.canMoveHorizontally(
        toXNumber,
        toYNumber,
        queenXNumber,
        queenYNumber
      )
    }

    if (isVerticalMove) {
      return this.canMoveVertically(toYNumber, queenXNumber, queenYNumber)
    }

    if (isMovingDown) {
      if (isMovingLeft) {
        return this.canMoveDiagonallyDownLeft(
          toXNumber,
          toYNumber,
          queenXNumber,
          queenYNumber
        )
      } else {
        return this.canMoveDiagonallyDownRight(
          toXNumber,
          toYNumber,
          queenXNumber,
          queenYNumber
        )
      }
    } else {
      if (isMovingLeft) {
        return this.canMoveDiagonallyUpLeft(
          toXNumber,
          toYNumber,
          queenXNumber,
          queenYNumber
        )
      } else {
        return this.canMoveDiagonallyUpRight(
          toXNumber,
          toYNumber,
          queenXNumber,
          queenYNumber
        )
      }
    }

    return false
  }

  private canMoveBishop(
    from: string,
    to: string,
    piece: "light-bishop" | "dark-bishop"
  ) {
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
        return this.canMoveDiagonallyDownLeft(
          toXNumber,
          toYNumber,
          bishopXNumber,
          bishopYNumber
        )
      } else {
        return this.canMoveDiagonallyDownRight(
          toXNumber,
          toYNumber,
          bishopXNumber,
          bishopYNumber
        )
      }
    } else {
      if (isMovingLeft) {
        return this.canMoveDiagonallyUpLeft(
          toXNumber,
          toYNumber,
          bishopXNumber,
          bishopYNumber
        )
      } else {
        return this.canMoveDiagonallyUpRight(
          toXNumber,
          toYNumber,
          bishopXNumber,
          bishopYNumber
        )
      }
    }

    return false
  }

  private canMoveKing(
    from: string,
    to: string,
    piece: "light-king" | "dark-king"
  ) {
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

  private canMovePawn(
    from: string,
    to: string,
    piece: "light-pawn" | "dark-pawn"
  ) {
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

  private canMoveRook(
    from: string,
    to: string,
    piece: "light-rook" | "dark-rook"
  ) {
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
      return this.canMoveHorizontally(
        toXNumber,
        toYNumber,
        rookXNumber,
        rookYNumber
      )
    }

    if (isVerticalMove) {
      return this.canMoveVertically(toYNumber, rookXNumber, rookYNumber)
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

  private canMoveKnight(
    from: string,
    to: string,
    piece: "light-knight" | "dark-knight"
  ) {
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
