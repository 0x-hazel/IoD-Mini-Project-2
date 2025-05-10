const generateId = require("./util");

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
