import Player from "../src/model/player";
import Board from "../src/model/board";

const types = Player.types;
let board;
beforeEach(() => {
    board = new Board(10);
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
    it("Can be initialized with name", () => {
        expect(() => new Player(types.HUMAN, board, "Nagumo")).not.toThrow();
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
    it("Sets default name if none is provided", () => {
        expect(player.name).toBe("no name");
    });
    it("Can set name", () => {
        player.name = "Nagumo";
        expect(player.name).toBe("Nagumo");
    });
});
