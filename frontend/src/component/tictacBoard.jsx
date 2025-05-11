import TicTac from "./ticTac";

// boardState: ('x' | 'o')[9]
// isSelectable: boolean
// changeTo: ('x' | 'o')
export function TicTacBoard({ boardState, isSelectable, changeTo }) {
  return (
    <div className="grid grid-rows-3 grid-cols-3">
      <div className="border-base-content border-r border-b">
        <TicTac
          state={{
            value: boardState[0],
            selectable: isSelectable && boardState[0] == "",
            callback: () => changeTo(0),
          }}
        />
      </div>
      <div className="border-base-content border-r border-l border-b">
        <TicTac
          state={{
            value: boardState[1],
            selectable: isSelectable && boardState[1] == "",
            callback: () => changeTo(1),
          }}
        />
      </div>
      <div className="border-base-content border-l border-b">
        <TicTac
          state={{
            value: boardState[2],
            selectable: isSelectable && boardState[2] == "",
            callback: () => changeTo(2),
          }}
        />
      </div>
      <div className="border-base-content border-t border-b border-r">
        <TicTac
          state={{
            value: boardState[3],
            selectable: isSelectable && boardState[3] == "",
            callback: () => changeTo(3),
          }}
        />
      </div>
      <div className="border-base-content border">
        <TicTac
          state={{
            value: boardState[4],
            selectable: isSelectable && boardState[4] == "",
            callback: () => changeTo(4),
          }}
        />
      </div>
      <div className="border-base-content border-t border-b border-l">
        <TicTac
          state={{
            value: boardState[5],
            selectable: isSelectable && boardState[5] == "",
            callback: () => changeTo(5),
          }}
        />
      </div>
      <div className="border-base-content border-t border-r">
        <TicTac
          state={{
            value: boardState[6],
            selectable: isSelectable && boardState[6] == "",
            callback: () => changeTo(6),
          }}
        />
      </div>
      <div className="border-base-content border-t border-r border-l">
        <TicTac
          state={{
            value: boardState[7],
            selectable: isSelectable && boardState[7] == "",
            callback: () => changeTo(7),
          }}
        />
      </div>
      <div className="border-base-content border-l border-t">
        <TicTac
          state={{
            value: boardState[8],
            selectable: isSelectable && boardState[8] == "",
            callback: () => changeTo(8),
          }}
        />
      </div>
    </div>
  );
}
