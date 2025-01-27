import Computer from "../src/model/computer";
import Board from "../src/model/board";
import Ship from "../src/model/ship";

describe("Computer object", () => {
    describe("Creation", () => {
        let board = new Board(10);
        beforeEach(() => {
            board = new Board(10);
        });

        it("Can be instantiated", () => {
            expect(() => new Computer(board)).not.toThrow();
        });

        it("Has a working Board", () => {
            expect(new Computer(board).board.width).toEqual(10);
        });

        it("Can be instantiated with a name", () => {
            expect(new Computer(board, "Nimitz").name).toEqual("Nimitz");
        });

        it("Is Computer", () => {
            expect(new Computer(board).isComputer).toBe(true);
        });
    });

    describe("Methods", () => {
        let computer = new Computer(new Board(2));
        beforeEach(() => {
            computer = new Computer(new Board(2));
            computer.setEnemyBoard(new Board(2));
        });

        it("Is aware of possible attacks", () => {
            expect(computer.validTargets.length).toEqual(4);
        });

        it("Targets are {xPos, yPos} objects", () => {
            const outcome = { xPos: 1, yPos: 1 };
            expect(computer.validTargets[3]).toEqual(outcome);
        });

        it("Can attack successfully", () => {
            const placementArgs = [new Ship(2), 0, 0, Board.rotations.ACROSS];
            computer.enemyBoard.placeShip(...placementArgs);

            const { xPos, yPos } = computer.randomAttack();
            expect(computer.enemyBoard.isHit(xPos, yPos)).toBe(true);
        });

        it("Discards attacked squares", () => {
            computer.randomAttack();
            expect(computer.validTargets.length).toEqual(3);
        });
    });
});
