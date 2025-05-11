import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TicTacBoard } from "../component/tictacBoard";
import { useMemo } from "react";
import Player from "../component/player";

const fetchLobbyData = (queryData) => {
  const [_key, { id }] = queryData.queryKey;
  return axios.get(`/api/lobby/${id}`);
};

const makeMove = (position) => {
  const [lobby, player] = sessionStorage.getItem("session")?.split(":") || [
    undefined,
    undefined,
  ];
  return axios.post(
    `/api/make-move/${lobby}?player=${player}&position=${position}`
  );
};

export default function Game() {
  const { id } = useParams();
  const hotConnect = useMutation({
    mutationFn: (id) => {
      return axios.post(`/api/join-lobby/${id}`);
    },
    onSuccess: (response) => {
      if (response.data.error != undefined) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("session", response.data.session);
        sessionStorage.setItem("playing", response.data.playing);
      }
    },
  });
  if (
    (sessionStorage.getItem("session") == null ||
      sessionStorage.getItem("session").split(":")[0] != id) &&
    !hotConnect.isPending
  ) {
    hotConnect.mutate(id);
  }
  const query = useQuery({
    queryKey: ["lobbyData", { id }],
    queryFn: fetchLobbyData,
    refetchInterval: 1000,
  });
  const mutation = useMutation({
    mutationFn: makeMove,
  });
  const data = query.data?.data;
  const loading = query.isLoading;
  const result = useMemo(() => {
    const waitingForPlayers = !loading && data.exists && data.isWaiting;
    const canMove = data?.turn
      ? data.turn == sessionStorage.getItem("playing")
      : false;
    return (
      <>
        {waitingForPlayers && (
          <div className="absolute w-screen h-screen backdrop-blur-xs backdrop-brightness-80">
            <div className="flex items-center justify-center h-screen">
              <div className="card bg-neutral text-neutral-content w-96">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Waiting for players to join...</h2>
                  <div className="card-actions justify-end">
                    <span className="loading loading-infinity loading-xl text-primary"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-3">
            <Player
              name="You"
              blurred={waitingForPlayers}
              playing={sessionStorage.getItem("playing")}
              waitingForMove={canMove}
            />
            <div className="flex flex-col gap-4 items-center justify-center h-screen text-center">
              <h3>Game Lobby</h3>
              <TicTacBoard
                boardState={
                  data?.boardState
                    ? data.boardState
                    : ["", "", "", "", "", "", "", "", ""]
                }
                isSelectable={canMove}
                changeTo={mutation.mutate}
              />
            </div>
            <Player
              blurred={waitingForPlayers}
              name={waitingForPlayers ? undefined : "Your Opponent"}
              playing={sessionStorage.getItem("playing") == "x" ? "o" : "x"}
              waitingForMove={!canMove}
            />
          </div>
        </div>
        {loading && (
          <div className="absolute right-8 bottom-8">
            <span className="loading loading-infinity loading-xl text-primary"></span>
          </div>
        )}
      </>
    );
  }, [data, loading, mutation.mutate]);
  return result;
}
