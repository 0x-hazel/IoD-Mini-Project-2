import JoinGameButton from "../component/joinGameButton";
import NewGameButton from "../component/newGameButton";

export default function Index() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center flex-col">
          <div className="max-w-md"></div>
          <h1 className="text-6xl font-bold">Tic-Tac-Toe!</h1>
          <NewGameButton />
          <JoinGameButton />
        </div>
      </div>
    </>
  );
}
