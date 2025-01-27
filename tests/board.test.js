import Board from "../src/model/board.js";
import Ship from "../src/model/ship.js";

describe("Gameboard", () => {
    describe("Instantiation", () => {
        it("Requires width or height", () => {
            expect(() => {
                new Board();
            }).toThrow("Width");
        });

        describe("Size", () => {
            it("Can set width", () => {
                expect(new Board(3).width).toBe(3);
            });
            it("Does not accept width below 2", () => {
                expect(() => {
                    new Board(1);
                }).toThrow("Width");
            });
            it("Width must be a number", () => {
                expect(() => {
                    new Board("hello");
                }).toThrow("Width");
            });
            it("Width is read-only", () => {
                expect(() => {
                    const board = new Board(3);
                    board.width = 4;
                }).toThrow(TypeError);
            });
            it("Can set width & height", () => {
                expect(new Board(3, 4).height).toBe(4);
            });
            it("Does not accept height below 2", () => {
                expect(() => {
                    new Board(3, 1);
                }).toThrow("Height");
            });
            it("Height must be a number", () => {
                expect(() => {
                    new Board(2, "3");
                }).toThrow("Height");
            });
            it("Height is read-only", () => {
                expect(() => {
                    const board = new Board(3, 3);
                    board.height = 4;
                }).toThrow(TypeError);
            });
            it("If given one parameter, sets width & height to it", () => {
                const board = new Board(3);
                expect(board.width).toBe(3);
                expect(board.height).toBe(3);
            });
        });
    });

    describe("Ship placement", () => {
        let rot = Board.rotations;
        let shipObj = { length: 5 };
        let board = new Board(10);
        beforeEach(() => {
            board = new Board(10);
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

    describe("Ships", () => {
        let board;
        let ship;
        beforeEach(() => {
            board = new Board(10);
            ship = new Ship(2);
            board.placeShip(ship, 0, 0, Board.rotations.ACROSS);
        });

        it("Can add and get a list of ships", () => {
            expect(board.shipList).toEqual([ship]);
        });
        it("Can identify an empty square", () => {
            expect(board.shipAt(0, 1)).toBeNull();
        });
        it("Can identify a ship on a square", () => {
            expect(board.shipAt(0, 0)).toEqual(ship);
        });
        it("Can find the number of hits on a ship", () => {
            board.attack(0, 0);
            expect(board.shipAt(0, 0).hits).toEqual(1);
        });
        it("Can identify if a ship is sunk", () => {
            board.attack(0, 0);
            board.attack(1, 0);
            expect(board.shipAt(0, 0).isSunk).toBe(true);
        });
        it("Reports when not all ships are sunk", () => {
            board.attack(0, 0);
            expect(board.allShipsSunk).toBe(false);
        });
        it("Reports when all ships are sunk", () => {
            board.attack(0, 0);
            board.attack(1, 0);
            expect(board.allShipsSunk).toBe(true);
        });
    });

    describe("Attacks", () => {
        let board;
        beforeEach(() => {
            board = new Board(10);
            let ship = new Ship(5);
            board.placeShip(ship, 0, 0, Board.rotations.DOWN);
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
            expect(() => board.attack(0, 0)).toThrow(Error);
        });
    });
});
