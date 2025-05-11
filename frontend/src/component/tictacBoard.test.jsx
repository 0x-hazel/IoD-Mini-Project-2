import { expect, test } from "vitest";
import { TicTacBoard } from "./tictacBoard";

test("Snapshot test TicTacBoard", () => {
  expect(
    <TicTacBoard
      boardState={["", "x", "x", "", "o", "", "", "o", ""]}
      isSelectable={true}
      changeTo={() => {}}
    />
  ).toMatchSnapshot();
});
