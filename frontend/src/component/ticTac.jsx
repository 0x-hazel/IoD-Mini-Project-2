import { X, O } from "./symbols";

// SVG Sources:
const VALUES = {
  x: <X />,
  o: <O />,
};

// state: { selectable: boolean, value: string }
// callback: () => void
export default function TicTac({ state }) {
  const onClick = state.selectable
    ? () => {
        state.callback();
      }
    : () => {};
  return (
    <div
      onClick={onClick}
      className={`size-32 ${state.selectable ? "cursor-pointer" : ""}`}
    >
      {VALUES[state.value]}
    </div>
  );
}
