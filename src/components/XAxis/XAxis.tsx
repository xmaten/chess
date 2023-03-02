import { getNumberToLetter } from "@/utils/getNumberToLetter"

export const XAxis = () => {
  const items = Array.from(Array(8).keys())

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 85px)",
        marginTop: "10px",
        textAlign: "center"
      }}>
      {items.map((item) => (
        <p style={{ margin: 0, textTransform: "uppercase" }} key={item}>
          {item + 1}
          {/*{getNumberToLetter(item + 1)}*/}
        </p>
      ))}
    </div>
  )
}
