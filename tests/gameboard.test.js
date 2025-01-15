import Gameboard from "../src/model/gameboard.js";

describe("Gameboard", () => {
    describe("Instantiation", () => {
        it("Requires width or height", () => {
            expect(() => {
                new Gameboard();
            }).toThrow("Width");
        });

        describe("Size", () => {
            it("Can set width", () => {
                expect(new Gameboard(3).width).toBe(3);
            });
            it("Does not accept width below 2", () => {
                expect(() => {
                    new Gameboard(1);
                }).toThrow("Width");
            });
            it("Width must be a number", () => {
                expect(() => {
                    new Gameboard("hello");
                }).toThrow("Width");
            });
            it("Width is read-only", () => {
                expect(() => {
                    const board = new Gameboard(3);
                    board.width = 4;
                }).toThrow(TypeError);
            });
            it("Can set width & height", () => {
                expect(new Gameboard(3, 4).height).toBe(4);
            });
            it("Does not accept height below 2", () => {
                expect(() => {
                    new Gameboard(3, 1);
                }).toThrow("Height");
            });
            it("Height must be a number", () => {
                expect(() => {
                    new Gameboard(2, "3");
                }).toThrow("Height");
            });
            it("Height is read-only", () => {
                expect(() => {
                    const board = new Gameboard(3, 3);
                    board.height = 4;
                }).toThrow(TypeError);
            });
            it("If given one parameter, sets width & height to it", () => {
                const board = new Gameboard(3);
                expect(board.width).toBe(3);
                expect(board.height).toBe(3);
            });
        });
    });

    describe("Ship placement", () => {
        let rot = Gameboard.rotations;
        let shipObj = { length: 5 };
        let board;
        beforeEach(() => {
            board = new Gameboard(10);
        });

        it("Forbids placing ships outside the board", () => {
            expect(() => {
                board.placeShip(shipObj, -1, 0, rot.DOWN);
            }).toThrow("X");
            expect(() => {
                board.placeShip(shipObj, 0, -1, rot.DOWN);
            }).toThrow("Y");
        });
        it("Forbids ships from spilling over the right side", () => {
            expect(() => {
                board.placeShip(shipObj, 9, 0, rot.ACROSS);
            }).toThrow("right");
        });
        it("Forbids ships from spilling over the bottom side ", () => {
            expect(() => {
                board.placeShip(shipObj, 0, 9, rot.DOWN);
            }).toThrow("bottom");
        });
        it("Forbids placing ships on top of each other", () => {
            expect(() => {
                board.placeShip(shipObj, 0, 0, rot.ACROSS);
                board.placeShip(shipObj, 2, 0, rot.DOWN);
            }).toThrow("already");
        });
    });

    // Keep track of ships and their hits

    describe("Attacks", () => {
        let board;
        beforeEach(() => {
            board = new Gameboard(10);
            board.placeShip({ length: 5 }, 0, 0, Gameboard.rotations.DOWN);
        });

        it("Forbids shots outside the board", () => {
            expect(() => board.attack(-1, 0)).toThrow("X");
            expect(() => board.attack(0, -1)).toThrow("Y");
        });
        it("Forbids checking squares outside the board", () => {
            expect(() => board.isHit(-1, 0)).toThrow("X");
            expect(() => board.isHit(0, -1)).toThrow("Y");
        });
        it("Registers a hit on a square", () => {
            board.attack(0, 0);
            expect(board.isHit(0, 0)).toBe(true);
        });
        it("Forbids attacking an already attacked cell", () => {
            board.attack(0, 0);
            expect(() => {
                board.attack(0, 0);
            }).toThrow(Error);
        });
    });
    // Report if all ships have been sunk
});
