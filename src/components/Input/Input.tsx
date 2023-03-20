type Props = { value: string; onChange: (value: string) => void; label: string }

export const Input = ({ value, onChange, label }: Props) => {
  return (
    <label className="flex flex-col mb-4">
      {label}
      <input
        className="border-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
