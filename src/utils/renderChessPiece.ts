export const renderChessPiece = (piece: string) => {
  switch (piece) {
    case "dark-rook":
      return "♜"
    case "dark-knight":
      return "♞"
    case "dark-bishop":
      return "♝"
    case "dark-queen":
      return "♛"
    case "dark-king":
      return "♚"
    case "dark-pawn":
      return "♟"
    case "light-rook":
      return "♖"
    case "light-knight":
      return "♘"
    case "light-bishop":
      return "♗"
    case "light-queen":
      return "♕"
    case "light-king":
      return "♔"
    case "light-pawn":
      return "♙"
    default:
      return null
  }
}
