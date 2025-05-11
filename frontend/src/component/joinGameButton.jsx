import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinGameButton() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault();
      const lobby = document.getElementById("join-game-room-code").value;
      console.log(lobby);
      return axios.post(`/api/join-lobby/${lobby}`);
    },
    onSuccess: (response) => {
      if (response.data.error != undefined) {
        alert(response.data.error);
      }
      sessionStorage.setItem("session", response.data.session);
      sessionStorage.setItem("playing", response.data.playing);
      const [lobby, _] = response.data.session.split(":");
      navigate(`/play/${lobby}`);
    },
  });
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("join-game").showModal()}
      >
        Join Game
      </button>
      <dialog id="join-game" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-8">Join Game</h3>
          <form onSubmit={mutation.mutate}>
            <label className="label mb-8">
              Code:
              <div className="join">
                <input
                  type="text"
                  placeholder="Room Code"
                  className="input join-item"
                  id="join-game-room-code"
                />
                <button className="btn btn-primary join-item">Enter</button>
              </div>
            </label>
          </form>
        </div>
      </dialog>
    </>
  );
}
