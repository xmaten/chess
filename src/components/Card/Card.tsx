import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Card = ({ children }: Props) => {
  return (
    <div className="w-[400px] mx-auto mt-20">
      <div className="p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
        {children}
      </div>
    </div>
  )
}
