import Player from "../src/model/player";
import Board from "../src/model/board";

let board;
beforeEach(() => {
    board = new Board(10);
});

describe("Creation", () => {
    it("Board must be a Gameboard instance", () => {
        expect(() => new Player()).toThrow("Gameboard");
        expect(() => new Player(null)).toThrow("Gameboard");
    });
    it("Can be initialized with name", () => {
        expect(() => new Player(board, "Nagumo")).not.toThrow();
    });
});

describe("Properties", () => {
    let player;
    beforeEach(() => {
        player = new Player(board);
    });

    it("Is not a Computer", () => {
        expect(player.isComputer).toBe(false);
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
