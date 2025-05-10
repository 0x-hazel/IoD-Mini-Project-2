const request = require("supertest");
const app = require("./server");

test("Lobby Creation", async () => {
    const creationRequest = await request(app)
        .post("/api/create-lobby")
        .send();
    expect(creationRequest.statusCode).toEqual(200);
    expect(creationRequest.body).toHaveProperty("playing");
    expect(creationRequest.body.playing).toEqual("x");
});

test("Attempting to Join Invalid Lobby", async () => {
    const joinRequest = await request(app)
        .post("/api/join-lobby/TEST")
        .send();
    expect(joinRequest.body).toHaveProperty("error");
    expect(joinRequest.body.error).toEqual("Lobby not found");
});

test("Joining Lobby", async () => {
    const createdLobby = await request(app)
        .post("/api/create-lobby")
        .send();
    const roomCode = createdLobby.body.session.split(":")[0];
    const joinRequest = await request(app)
        .post(`/api/join-lobby/${roomCode}`)
        .send();
    expect(joinRequest.statusCode).toEqual(200);
    expect(joinRequest.body).toHaveProperty("session");
    expect(joinRequest.body.session.split(":")[0]).toEqual(roomCode);
    expect(joinRequest.body).toHaveProperty("playing");
    expect(joinRequest.body.playing).toEqual("o");
});

test("Attempting to Join Full Lobby", async () => {
    const createdLobby = await request(app)
        .post("/api/create-lobby")
        .send();
    const roomCode = createdLobby.body.session.split(":")[0];
    await request(app)
        .post(`/api/join-lobby/${roomCode}`)
        .send();
    await request(app)
        .post(`/api/join-lobby/${roomCode}`)
        .send();
    const joinRequest = await request(app)
        .post(`/api/join-lobby/${roomCode}`)
        .send();
    expect(joinRequest.body).toHaveProperty("error");
    expect(joinRequest.body.error).toEqual("Lobby is full");
});

test("Playing a Move", async () => {
    const createdLobby = await request(app)
        .post("/api/create-lobby")
        .send();
    const roomCode = createdLobby.body.session.split(":")[0];
    const playerOne = createdLobby.body.session.split(":")[1];
    const playerTwo = (await request(app)
        .post(`/api/join-lobby/${roomCode}`)
        .send())
        .body.session.split(":")[1];
    const startingDetails = await request(app)
        .get(`/api/lobby/${roomCode}`)
        .send();
    const player = startingDetails.body.turn;
    const playRequest = await request(app)
        .post(
            `/api/make-move/${roomCode}?player=${
                (player == "x") ? playerOne : playerTwo
            }&position=4`,
        )
        .send();
    expect(playRequest.body).toHaveProperty("boardState");
    expect(playRequest.body.boardState).toEqual([
        "",
        "",
        "",
        "",
        player,
        "",
        "",
        "",
        "",
    ]);
});
