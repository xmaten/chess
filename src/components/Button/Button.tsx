import { ReactNode } from "react"

type Props = {
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  children: ReactNode
  onClick: () => void
}

export const Button = ({
  type,
  disabled = false,
  children,
  onClick
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="text-white mt-8 w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 cursor-pointer">
      {children}
    </button>
  )
}
