type Props = {
  error: string
}

export const ErrorText = ({ error }: Props) => {
  return <p className="text-red my-2">{error}</p>
}
