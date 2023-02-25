import { TCell } from "@/types/Cell"

export const initialBoard: TCell[][] = [
  [
    { id: "a-8", color: "light", figure: "dark-rook" },
    { id: "b-8", color: "dark", figure: "dark-pawn" },
    { id: "c-8", color: "light", figure: null },
    { id: "d-8", color: "dark", figure: null },
    { id: "e-8", color: "light", figure: null },
    { id: "f-8", color: "dark", figure: null },
    { id: "g-8", color: "light", figure: "light-pawn" },
    { id: "h-8", color: "dark", figure: "light-rook" }
  ],
  [
    { id: "a-7", color: "dark", figure: "dark-knight" },
    { id: "b-7", color: "light", figure: "dark-pawn" },
    { id: "c-7", color: "dark", figure: null },
    { id: "d-7", color: "light", figure: null },
    { id: "e-7", color: "dark", figure: null },
    { id: "f-7", color: "light", figure: null },
    { id: "g-7", color: "dark", figure: "light-pawn" },
    { id: "h-7", color: "light", figure: "light-knight" }
  ],
  [
    { id: "a-6", color: "light", figure: "dark-bishop" },
    { id: "b-6", color: "dark", figure: "dark-pawn" },
    { id: "c-6", color: "light", figure: null },
    { id: "d-6", color: "dark", figure: null },
    { id: "e-6", color: "light", figure: null },
    { id: "f-6", color: "dark", figure: null },
    { id: "g-6", color: "light", figure: "light-pawn" },
    { id: "h-6", color: "dark", figure: "light-bishop" }
  ],
  [
    { id: "a-5", color: "dark", figure: "dark-queen" },
    { id: "b-5", color: "light", figure: "dark-pawn" },
    { id: "c-5", color: "dark", figure: null },
    { id: "d-5", color: "light", figure: null },
    { id: "e-5", color: "dark", figure: null },
    { id: "f-5", color: "light", figure: null },
    { id: "g-5", color: "dark", figure: "light-pawn" },
    { id: "h-5", color: "light", figure: "light-queen" }
  ],
  [
    { id: "a-4", color: "light", figure: "dark-king" },
    { id: "b-4", color: "dark", figure: "dark-pawn" },
    { id: "c-4", color: "light", figure: null },
    { id: "d-4", color: "dark", figure: null },
    { id: "e-4", color: "light", figure: null },
    { id: "f-4", color: "dark", figure: null },
    { id: "g-4", color: "light", figure: "light-pawn" },
    { id: "h-4", color: "dark", figure: "light-king" }
  ],
  [
    { id: "a-3", color: "dark", figure: "dark-bishop" },
    { id: "b-3", color: "light", figure: "dark-pawn" },
    { id: "c-3", color: "dark", figure: null },
    { id: "d-3", color: "light", figure: null },
    { id: "e-3", color: "dark", figure: null },
    { id: "f-3", color: "light", figure: null },
    { id: "g-3", color: "dark", figure: "light-pawn" },
    { id: "h-3", color: "light", figure: "light-bishop" }
  ],
  [
    { id: "a-2", color: "light", figure: "dark-knight" },
    { id: "b-2", color: "dark", figure: "dark-pawn" },
    { id: "c-2", color: "light", figure: null },
    { id: "d-2", color: "dark", figure: null },
    { id: "e-2", color: "light", figure: null },
    { id: "f-2", color: "dark", figure: null },
    { id: "g-2", color: "light", figure: "light-pawn" },
    { id: "h-2", color: "dark", figure: "light-knight" }
  ],
  [
    { id: "a-1", color: "dark", figure: "dark-rook" },
    { id: "b-1", color: "light", figure: "dark-pawn" },
    { id: "c-1", color: "dark", figure: null },
    { id: "d-1", color: "light", figure: null },
    { id: "e-1", color: "dark", figure: null },
    { id: "f-1", color: "light", figure: null },
    { id: "g-1", color: "dark", figure: "light-pawn" },
    { id: "h-1", color: "light", figure: "light-rook" }
  ]
]
