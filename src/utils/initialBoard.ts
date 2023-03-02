import { TCell } from "@/types/Cell"

export const initialBoard: TCell[][] = [
  [
    { id: "1-8", color: "light", piece: "dark-rook", wasAlreadyMoved: false },
    { id: "1-7", color: "dark", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "1-6", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "1-5", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "1-4", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "1-3", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "1-2", color: "light", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "1-1", color: "dark", piece: "light-rook", wasAlreadyMoved: false }
  ],
  [
    { id: "2-8", color: "dark", piece: "dark-knight", wasAlreadyMoved: false },
    { id: "2-7", color: "light", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "2-6", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "2-5", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "2-4", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "2-3", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "2-2", color: "dark", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "2-1", color: "light", piece: "light-knight", wasAlreadyMoved: false }
  ],
  [
    { id: "3-8", color: "light", piece: "dark-bishop", wasAlreadyMoved: false },
    { id: "3-7", color: "dark", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "3-6", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "3-5", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "3-4", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "3-3", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "3-2", color: "light", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "3-1", color: "dark", piece: "light-bishop", wasAlreadyMoved: false }
  ],
  [
    { id: "4-8", color: "dark", piece: "dark-queen", wasAlreadyMoved: false },
    { id: "4-7", color: "light", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "4-6", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "4-5", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "4-4", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "4-3", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "4-2", color: "dark", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "4-1", color: "light", piece: "light-queen", wasAlreadyMoved: false }
  ],
  [
    { id: "5-8", color: "light", piece: "dark-king", wasAlreadyMoved: false },
    { id: "5-7", color: "dark", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "5-6", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "5-5", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "5-4", color: "light", piece: "light-rook", wasAlreadyMoved: false },
    { id: "5-3", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "5-2", color: "light", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "5-1", color: "dark", piece: "light-king", wasAlreadyMoved: false }
  ],
  [
    { id: "6-8", color: "dark", piece: "dark-bishop", wasAlreadyMoved: false },
    { id: "6-7", color: "light", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "6-6", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "6-5", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "6-4", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "6-3", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "6-2", color: "dark", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "6-1", color: "light", piece: "light-bishop", wasAlreadyMoved: false }
  ],
  [
    { id: "7-8", color: "light", piece: "dark-knight", wasAlreadyMoved: false },
    { id: "7-7", color: "dark", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "7-6", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "7-5", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "7-4", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "7-3", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "7-2", color: "light", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "7-1", color: "dark", piece: "light-knight", wasAlreadyMoved: false }
  ],
  [
    { id: "8-8", color: "dark", piece: "dark-rook", wasAlreadyMoved: false },
    { id: "8-7", color: "light", piece: "dark-pawn", wasAlreadyMoved: false },
    { id: "8-6", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "8-5", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "8-4", color: "dark", piece: null, wasAlreadyMoved: false },
    { id: "8-3", color: "light", piece: null, wasAlreadyMoved: false },
    { id: "8-2", color: "dark", piece: "light-pawn", wasAlreadyMoved: false },
    { id: "8-1", color: "light", piece: null, wasAlreadyMoved: false }
  ]
]
