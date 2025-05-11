import { useNavigate } from "react-router-dom";
import JoinGameButton from "../component/joinGameButton";
import NewGameButton from "../component/newGameButton";

export default function FinishedMenu({ visible, winner }) {
  const navigate = useNavigate();
  const playing = sessionStorage.getItem("playing");
  console.log(visible);
  return (
    <>
      {visible && (
        <div className="absolute w-screen h-screen backdrop-blur-xs backdrop-brightness-80">
          <div className="flex items-center justify-center h-screen">
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {playing == winner ? "You Win!" : "You Lose..."}
                </h2>
                <div className="card-actions justify-end">
                  <button className="btn" onClick={() => navigate("/")}>
                    Exit
                  </button>
                  <NewGameButton />
                  <JoinGameButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
