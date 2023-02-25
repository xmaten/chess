export const YAxis = () => {
  const items = Array.from(Array(8).keys())

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(8, 85px)",
        marginRight: "10px",
        alignItems: "center"
      }}>
      {items.map((item) => (
        <p style={{ margin: 0 }} key={item}>
          {item + 1}
        </p>
      ))}
    </div>
  )
}
