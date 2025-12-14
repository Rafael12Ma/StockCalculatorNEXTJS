import { Atom } from "react-loading-indicators";

export default function Loading() {
  return (
    <main style={{ textAlign: "center" }}>
      <Atom
        color="#ffffff"
        size="large"
        text="Loading stocks..."
        textColor="#ffffff"
      />{" "}
    </main>
  );
}
