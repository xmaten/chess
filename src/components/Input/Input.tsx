type Props = {
  value: string
  onChange: (value: string) => void
  label: string
  type?: "text" | "password"
}

export const Input = ({ value, onChange, label, type = "text" }: Props) => {
  return (
    <label className="flex flex-col mb-4">
      {label}
      <input
        type={type}
        className="border-2 text-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
