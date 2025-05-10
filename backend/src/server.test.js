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
    console.log(createdLobby.body.session, roomCode);
    const joinRequest = await request(app)
        .post(`/api/join-lobby/${roomCode}`)
        .send();
    // console.log(joinRequest);
    expect(joinRequest.statusCode).toEqual(200);
    expect(joinRequest.body).toHaveProperty("session");
    expect(joinRequest.body.session.split(":")[0]).toEqual(roomCode);
    expect(joinRequest.body).toHaveProperty("playing");
    expect(joinRequest.body.playing).toEqual("o");
});
