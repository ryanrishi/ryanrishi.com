import { useState } from "react";

const regularStyles = {
  backgroundColor: '#40C9A2',
  color: '#E5F9E0',
}
const tappedStyles = {
  backgroundColor: '#E5F9E0',
  color: '#40C9A2',
}

export const Demonstration = () => {
  const [tapped, setTapped] = useState(false)

  return (
    <div
      style={tapped ? tappedStyles : regularStyles}
      onClick={() => setTapped(!tapped)}
    >
      🤜 Tap this React Component 🤛
    </div>
  )
}
