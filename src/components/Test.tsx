import { useDrop } from "react-dnd"

export const Test = () => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "item",
      canDrop: () => true,
      drop: () => {},
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    []
  )

  return (
    <div
      ref={drop}
      role="Space"
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}>
      <p>test</p>
    </div>
  )
}
