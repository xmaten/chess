import Link from "next/link"
import { ReactNode } from "react"

type Props = {
  url: string
  children: ReactNode
}

export const ButtonLink = ({ url, children }: Props) => {
  return (
    <Link
      className="text-white mt-8 w-[200px] focus:ring-4 text-center font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
      href={url}>
      {children}
    </Link>
  )
}
