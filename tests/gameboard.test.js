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

    // Receive attack
    // Place ships in specific coordinates
    // Keep track of missed shots
    // Report if all ships have been sunk
});
