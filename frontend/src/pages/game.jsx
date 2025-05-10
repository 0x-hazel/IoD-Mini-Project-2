import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TicTacBoard } from "../component/tictacBoard";

const fetchLobbyData = (queryData) => {
  const [_key, { id }] = queryData.queryKey;
  console.log(id);
  return axios.get(`/api/lobby/${id}`);
};

export default function Game() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ["lobbyData", { id }],
    queryFn: fetchLobbyData,
  });
  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div className="h-screen p-8 text-center">
        <h3>Game Lobby</h3>
        <TicTacBoard />
      </div>
    </div>
  );
}
