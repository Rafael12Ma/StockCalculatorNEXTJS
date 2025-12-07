// LoadingQuery.jsx
import { Atom } from "react-loading-indicators";

export default function LoadingQuery({ text, textColor, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Atom
        textColor={textColor ? textColor : "yellow"}
        text={text}
        color={color ? color : "white"}
        size="large"
      />
    </div>
  );
}
