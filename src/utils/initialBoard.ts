import { TCell } from "@/types/Cell"

export const initialBoard: TCell[][] = [
  [
    { id: "a-8", color: "light", piece: "dark-rook" },
    { id: "a-7", color: "dark", piece: "dark-pawn" },
    { id: "a-6", color: "light", piece: null },
    { id: "a-5", color: "dark", piece: null },
    { id: "a-4", color: "light", piece: null },
    { id: "a-3", color: "dark", piece: null },
    { id: "a-2", color: "light", piece: "light-pawn" },
    { id: "a-1", color: "dark", piece: "light-rook" }
  ],
  [
    { id: "b-8", color: "dark", piece: "dark-knight" },
    { id: "b-7", color: "light", piece: "dark-pawn" },
    { id: "b-6", color: "dark", piece: null },
    { id: "b-5", color: "light", piece: null },
    { id: "b-4", color: "dark", piece: null },
    { id: "b-3", color: "light", piece: null },
    { id: "b-2", color: "dark", piece: "light-pawn" },
    { id: "b-1", color: "light", piece: "light-knight" }
  ],
  [
    { id: "c-8", color: "light", piece: "dark-bishop" },
    { id: "c-7", color: "dark", piece: "dark-pawn" },
    { id: "c-6", color: "light", piece: null },
    { id: "c-5", color: "dark", piece: null },
    { id: "c-4", color: "light", piece: null },
    { id: "c-3", color: "dark", piece: null },
    { id: "c-2", color: "light", piece: "light-pawn" },
    { id: "c-1", color: "dark", piece: "light-bishop" }
  ],
  [
    { id: "d-8", color: "dark", piece: "dark-queen" },
    { id: "d-7", color: "light", piece: "dark-pawn" },
    { id: "d-6", color: "dark", piece: null },
    { id: "d-5", color: "light", piece: null },
    { id: "d-4", color: "dark", piece: null },
    { id: "d-3", color: "light", piece: null },
    { id: "d-2", color: "dark", piece: "light-pawn" },
    { id: "d-1", color: "light", piece: "light-queen" }
  ],
  [
    { id: "e-8", color: "light", piece: "dark-king" },
    { id: "e-7", color: "dark", piece: "dark-pawn" },
    { id: "e-6", color: "light", piece: null },
    { id: "e-5", color: "dark", piece: null },
    { id: "e-4", color: "light", piece: null },
    { id: "e-3", color: "dark", piece: null },
    { id: "e-2", color: "light", piece: "light-pawn" },
    { id: "e-1", color: "dark", piece: "light-king" }
  ],
  [
    { id: "f-8", color: "dark", piece: "dark-bishop" },
    { id: "f-7", color: "light", piece: "dark-pawn" },
    { id: "f-6", color: "dark", piece: null },
    { id: "f-5", color: "light", piece: null },
    { id: "f-4", color: "dark", piece: null },
    { id: "f-3", color: "light", piece: null },
    { id: "f-2", color: "dark", piece: "light-pawn" },
    { id: "f-1", color: "light", piece: "light-bishop" }
  ],
  [
    { id: "g-8", color: "light", piece: "dark-knight" },
    { id: "g-7", color: "dark", piece: "dark-pawn" },
    { id: "g-6", color: "light", piece: null },
    { id: "g-5", color: "dark", piece: null },
    { id: "g-4", color: "light", piece: null },
    { id: "g-3", color: "dark", piece: null },
    { id: "g-2", color: "light", piece: "light-pawn" },
    { id: "g-1", color: "dark", piece: "light-knight" }
  ],
  [
    { id: "h-8", color: "dark", piece: "dark-rook" },
    { id: "h-7", color: "light", piece: "dark-pawn" },
    { id: "h-6", color: "dark", piece: null },
    { id: "h-5", color: "light", piece: null },
    { id: "h-4", color: "dark", piece: null },
    { id: "h-3", color: "light", piece: null },
    { id: "h-2", color: "dark", piece: "light-pawn" },
    { id: "h-1", color: "light", piece: "light-rook" }
  ]
]
