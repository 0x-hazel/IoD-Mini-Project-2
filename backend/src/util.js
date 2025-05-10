const CHARLIST = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const charOf = (s) => s.charAt(Math.floor(Math.random() * s.length));

export function generateId() {
    let result = "";
    for (let i = 0; i < 4; i++) {
        result += charOf(CHARLIST);
    }
    return result;
}
