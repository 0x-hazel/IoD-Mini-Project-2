import { O, X } from "./symbols";

export default function Player(props) {
  const blur = props.blurred ? "blur-xs" : "";
  if (props.name == undefined) {
    return (
      <div className={`p-4 ${blur}`}>
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Waiting for Opponent</h2>
            <div className={`card-actions justify-end ${blur}`}>
              <span className="loading loading-infinity loading-xl text-primary"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`p-4 ${blur}`}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body">
          <div className="flex flex-row">
            <div>{props.playing == "x" ? <X /> : <O />}</div>
            <div className="flex flex-col">
              <h2 className="card-title flex-1">{props.name}</h2>
              <div className="flex flex-row">
                {props.waitingForMove && (
                  <div className="flex-1">
                    <span
                      className={`loading loading-infinity loading-xl mr-4 ${
                        props.playing == "x" ? "text-secondary" : "text-primary"
                      }`}
                    ></span>
                    Thinking carefully...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}
