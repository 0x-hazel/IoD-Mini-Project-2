import { generateId } from "./util.js";

export function createLobby(isPrivate) {
    const result = new Object(null);
    result.isPrivate = isPrivate;
    result.roomCode = generateId();
    result.playerCodes = [generateId(), generateId()];
    result.players = 0;
    result.playerJoin = function () {
        if (this.players < 2) {
            this.players += 1;
            return this.playerCodes[this.players - 1];
        }
    };
    return result;
}
