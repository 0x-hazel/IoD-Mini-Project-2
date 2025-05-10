import TicTac from "./ticTac";

// boardState: ('x' | 'o')[9]
// isSelectable: boolean
// changeTo: ('x' | 'o')
export function TicTacBoard({ boardState, isSelectable, changeTo }) {
  return (
    <div className="grid grid-rows-3 grid-cols-3">
      <div className="border-base-content border-r border-b">
        <TicTac />
      </div>
      <div className="border-base-content border-r border-l border-b">
        <TicTac />
      </div>
      <div className="border-base-content border-l border-b">
        <TicTac />
      </div>
      <div className="border-base-content border-t border-b border-r">
        <TicTac />
      </div>
      <div className="border-base-content border">
        <TicTac />
      </div>
      <div className="border-base-content border-t border-b border-l">
        <TicTac />
      </div>
      <div className="border-base-content border-t border-r">
        <TicTac />
      </div>
      <div className="border-base-content border-t border-r border-l">
        <TicTac />
      </div>
      <div className="border-base-content border-l border-t">
        <TicTac />
      </div>
    </div>
  );
}
