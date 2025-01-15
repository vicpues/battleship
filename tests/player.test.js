import Player from "../src/model/player";
import Gameboard from "../src/model/gameboard";

const types = Player.types;
let board;
beforeEach(() => {
    board = new Gameboard(10);
});

describe("Creation", () => {
    it('Type must be "human" or "player"', () => {
        expect(() => new Player()).toThrow("human");
        expect(() => new Player("potato")).toThrow("human");
    });
    it("Board must be a Gameboard instance", () => {
        expect(() => new Player(types.HUMAN)).toThrow("Gameboard");
        expect(() => new Player(types.HUMAN, null)).toThrow("Gameboard");
    });
});

describe("Properties", () => {
    let player;
    beforeEach(() => {
        player = new Player(types.HUMAN, board);
    });

    it("Can check type", () => {
        expect(player.type).toEqual(types.HUMAN);
    });
    it("Has a functioning board", () => {
        expect(player.board.attack).not.toBeUndefined();
    });
});
