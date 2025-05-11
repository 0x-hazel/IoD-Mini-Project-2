// SVG Sources:
// Cross - https://www.svgrepo.com/svg/521590/cross
// Circle - https://www.svgrepo.com/svg/532681/circle
const VALUES = {
  x: (
    <svg
      className="size-32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
        fill="#0F0F0F"
      />
    </svg>
  ),
  o: (
    <svg
      className="size-32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
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
