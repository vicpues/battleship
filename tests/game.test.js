import Game from "../src/model/game";
import Ship from "../src/model/ship";
import Board from "../src/model/board";

describe("Game driver", () => {
    describe("Creation", () => {
        it("Player list starts empty", () => {
            expect(new Game().players).toEqual([]);
        });
        it("Is not frozen on creation", () => {
            expect(new Game().isFrozen).toBe(false);
        });
    });

    describe("Methods", () => {
        let game = new Game();
        beforeEach(() => {
            game = new Game();
        });

        describe("Adding players", () => {
            const playerArgs = [10, 10];
            it("Can add players to player list", () => {
                game.addPlayer(...playerArgs);
                game.addPlayer(...playerArgs);
                expect(game.players[1].isComputer).toBe(false);
            });
            it("Can add computer to player list", () => {
                game.addPlayer(...playerArgs);
                game.addComputer(...playerArgs);
                expect(game.players[1].isComputer).toBe(true);
            });
        });

        describe("Freeze game", () => {
            it("Can freeze game", () => {
                game.isFrozen = true;
                expect(game.isFrozen).toBe(true);
            });
        });

        describe("Game flow", () => {
            beforeEach(() => {
                const boardArgs = [10, 10];
                game.addPlayer(...boardArgs);
                game.addComputer(...boardArgs);
            });

            describe("Turns", () => {
                it("Can read current turn index", () => {
                    expect(game.turnIndex).toEqual(0);
                });
                it("Can deduce next turn", () => {
                    expect(game.nextTurn).toEqual(1);
                });
                it("Can retrieve current player", () => {
                    expect(game.currentPlayer.isComputer).toBe(false);
                });
                it("Can retrieve next player", () => {
                    expect(game.nextPlayer.isComputer).toBe(true);
                });
                it("Can switch turns", () => {
                    game.switchTurn();
                    expect(game.turnIndex).toEqual(1);
                });
                it("Can read turns since game start", () => {
                    for (let i = 0; i < 3; i++) game.switchTurn();
                    expect(game.turn).toEqual(3);
                });
                it("Forbids changing turn manually", () => {
                    expect(() => (game.turnIndex = 2)).toThrow();
                });
                it("Turn does not overflow past the amount of players", () => {
                    game.switchTurn();
                    game.switchTurn();
                    expect(game.turnIndex).toEqual(0);
                });
            });

            describe("Game over", () => {
                beforeEach(() => {
                    for (let player of game.players) {
                        const board = player.board;
                        const ship = new Ship(2);
                        board.placeShip(ship, 0, 0, Board.rotations.ACROSS);
                    }
                    game.currentPlayer.board.attack(0, 0);
                });

                it("Recognizes when a game isn't over", () => {
                    expect(game.someoneLost()).toBe(false);
                });
                it("Recognizes when a game is over", () => {
                    game.currentPlayer.board.attack(1, 0);
                    expect(game.someoneLost()).toBe(true);
                });
            });
        });
    });
});
