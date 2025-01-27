import Board from "./board";
import Ship from "./ship";

export default class Player {
    /** Create a player of the game, with their own board
     * @param {Board} board
     * @param {string} name
     */
    constructor(board, name) {
        checkBoard(board);
        this.#board = board;
        this.name = name !== undefined ? name : "no name";
    }

    // Private properties

    #type;
    #board;

    // Property accessors

    get type() {
        return this.#type;
    }

    get board() {
        return this.#board;
    }

    get isComputer() {
        return false;
    }

    /** Takes in a Player obj and places ships randomly on their board */
    placeShipsRandomly() {
        const shipLengths = [5, 4, 3, 2, 2];
        const rotations = [Board.rotations.DOWN, Board.rotations.ACROSS];

        let shipsAmount = 0;
        while (shipsAmount < 5) {
            const length = shipLengths[shipsAmount];
            const ship = new Ship(length);
            try {
                const xPos = Math.floor(Math.random() * this.#board.width);
                const yPos = Math.floor(Math.random() * this.#board.height);
                const rot =
                    rotations[Math.floor(Math.random() * rotations.length)];
                this.#board.placeShip(ship, xPos, yPos, rot);
                shipsAmount++;
            } catch {
                continue;
            }
        }
    }
}

function checkBoard(board) {
    if (!(board instanceof Board))
        throw new TypeError("Board must be an instance of Gameboard");
}
