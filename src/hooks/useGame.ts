import { Chess, Square } from "chess.js"
import { useState } from "react"

export const useGame = () => {
  const [game, setGame] = useState(new Chess())

  const makeMove = (move: any) => {
    const gameCopy = new Chess()
    gameCopy.loadPgn(game.pgn())

    let result
    try {
      result = gameCopy.move(move)
    } catch (e) {
      console.log("Error", e)
      result = false
    }
    setGame(gameCopy)

    return result
  }

  const onDrop = (startSquare: Square, endSquare: Square, piece: any) => {
    const move = makeMove({
      from: startSquare,
      to: endSquare
    })

    if (move === null) {
      return false
    }

    return true
  }

  const onMouseOverSquare = (square: any) => {
    const moves = game.moves({
      square: square,
      verbose: true
    })

    if (moves.length === 0) {
      return
    }

    for (let i = 0; i < moves.length; i++) {
      handleAddColor(moves[i].to)
    }
  }

  const onMouseOutSquare = () => {
    handleRemoveColor()
  }

  const handleAddColor = (square: any) => {
    const squareElement = document.querySelector(`[data-square*="${square}"]`)
    if (squareElement) {
      const child: any = squareElement.children[0]
      child.style.background =
        "radial-gradient(circle, #fffc00 36%, transparent 40%)"
      child.style.borderRadius = "50%"
    }
  }

  const handleRemoveColor = () => {
    const squareElements = document.querySelectorAll(`[data-square]`)
    if (squareElements) {
      for (let i = 0; i < squareElements.length; i++) {
        const el = squareElements[i]
        const child: any = el.children[0]

        child.style.background = ""
        child.style.borderRadius = ""
      }
    }
  }

  return { game, onDrop, onMouseOutSquare, onMouseOverSquare }
}
