import express from "express";
import { createLobby } from "./lobby.js";

const app = express();
const port = 3000;

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
        res.json({ session: `${lobby.roomCode}:${lobby.playerJoin()}` });
    })
    .get("/api/lobby/:lobby", (req, res) => {
        const lobby = req.app.locals.state.lobbies[req.params.lobby];
        if (!lobby) {
            res.json({ exists: false });
        } else {
            res.json(lobby);
        }
    });

app.listen(port);
