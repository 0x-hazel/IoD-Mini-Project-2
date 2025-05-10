import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewGameButton() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault();
      return axios.post("/api/create-lobby");
    },
    onSuccess: (response) => {
      console.log(response.data);
      localStorage.setItem("session", response.data.session);
      const [lobby, player] = response.data.session.split(":");
      console.log("Player ", player);
      navigate(`/play/${lobby}`);
    },
  });
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("new-game").showModal()}
      >
        New Game
      </button>
      <dialog id="new-game" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-8">New Game</h3>
          <form onSubmit={mutation.mutate}>
            <label className="label mb-8">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
              />
              Private
            </label>
            <br />
            <button className="btn btn-primary">Start</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
