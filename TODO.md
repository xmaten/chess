- [] Add Tailwind
- [] Refactor Game
- [] Fix any types

---
Flow:

1. User provides name and GameID
2. Gets from backend userToken
3. Is redirected to /game/:id page
4. Token is saved in Context API
5. Each request attaches userToken so that backend can validate

---

- [x] Add move validation
- [x] Add indicator of legal and illegal moves
- [] Fix move validation
  - [x] Knight + capture
  - [x] Pawn + capture
  - [x] Bishop + capture
  - [x] King + capture
  - [x] Queen + capture
  - [x] Rook + capture
- [] Check move validation for dark pieces
  - [x] Knight + capture
  - [x] Pawn + capture
  - [x] King + capture
  - [] Rook + capture
  - [] Bishop + capture
  - [] Queen + capture
- [] King moves - don't allow to move to close to opposite king
- [] Expand move validation for checking if there won't be check after move
- [] Add support for castling
- [] Add en-passant
- [] Check 
- [] Mate
- [] Cleanup types in Game observers
- [] Refactor move validation
