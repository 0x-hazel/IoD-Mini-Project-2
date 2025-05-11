const express = require("express");
const createLobby = require("./lobby");

const app = express();

const state = new Object(null);
state.lobbies = {};
app.locals.state = state;

app
    .get("/", (req, res) => {
        res.send("Hello, world!");
    })
    .post("/api/create-lobby", (req, res) => {
        const lobbies = req.app.locals.state.lobbies;
        const lobby = createLobby();
        while (!!lobbies[lobby.roomCode]) {
            // re-randomise the lobby until it has an unused room code
            // in theory it could impact performance (or create a loop) but
            // this is a mini project, it'll be fine.
            lobby = createLobby();
        }
        lobbies[lobby.roomCode] = lobby;
        res.json({
            session: `${lobby.roomCode}:${lobby.playerJoin()}`,
            playing: "x",
        });
    })
    .post("/api/join-lobby/:lobby", (req, res) => {
        const lobby = req.app.locals.state.lobbies[req.params.lobby];
        if (lobby == undefined) {
            res.json({ error: "Lobby not found" });
        } else {
            if (lobby.players < 2) {
                res.json({
                    session: `${lobby.roomCode}:${lobby.playerJoin()}`,
                    playing: "o",
                });
            } else {
                res.json({ error: "Lobby is full" });
            }
        }
    })
    .get("/api/lobby/:lobby", (req, res) => {
        const lobby = req.app.locals.state.lobbies[req.params.lobby];
        if (!lobby) {
            res.json({ exists: false });
        } else {
            if (lobby.isWaiting) {
                res.json({
                    exists: true,
                    isWaiting: true,
                });
            } else {
                res.json({
                    exists: true,
                    isWaiting: false,
                    turn: (lobby.currentPlayer == 0) ? "x" : "o",
                    boardState: lobby.boardState,
                });
            }
        }
    })
    .post("/api/make-move/:lobby", (req, res) => {
        const user = req.query.player;
        const position = Number(req.query.position);
        const lobby = req.app.locals.state.lobbies[req.params.lobby];
        if (
            lobby.playerCodes[lobby.currentPlayer] == user && !lobby.isWaiting
        ) {
            if (position != null && position < 9 && position >= 0) {
                if (lobby.boardState[position] != "") {
                    res.json({ error: "This position is already occupied" });
                } else {
                    lobby.boardState[position] = (lobby.currentPlayer == 0)
                        ? "x"
                        : "o";
                    lobby.currentPlayer = 1 - lobby.currentPlayer;
                    res.json({ boardState: lobby.boardState });
                }
            } else {
                res.json({ error: "Position is out of range" });
            }
        } else {
            res.json({ error: "It is not your turn" });
        }
    });

module.exports = app;
