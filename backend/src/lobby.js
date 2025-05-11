const generateId = require("./util");

const winningBoardStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

function createLobby(isPrivate) {
    const result = new Object(null);
    result.isPrivate = isPrivate;
    result.roomCode = generateId();
    result.playerCodes = [generateId(), generateId()];
    result.players = 0;
    result.playerJoin = function () {
        if (this.players < 2) {
            this.players += 1;
            if (this.players == 2) {
                this.currentPlayer = Math.round(Math.random());
                this.isWaiting = false;
            }
            return this.playerCodes[this.players - 1];
        }
    };
    result.checkWin = function () {
        let winner = null;
        for (let state of winningBoardStates) {
            if (
                this.boardState[state[0]] == this.boardState[state[1]] &&
                this.boardState[state[1]] == this.boardState[state[2]] &&
                this.boardState[state[2]] != ""
            ) {
                winner = this.boardState[state[0]];
                break;
            }
        }
        if (winner != null) {
            this.isFinished = true;
            this.winner = winner;
        }
    };
    result.isWaiting = true;
    result.boardState = [ // auto-formatting my beloathed
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ];
    result.currentPlayer = -1;
    return result;
}

module.exports = createLobby;
