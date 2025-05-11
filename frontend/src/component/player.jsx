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
        <div className="card-body items-center text-center">
          <h2 className="card-title">{props.name}</h2>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}
