import Gameboard from "./gameboard";

export default class Player {
    /** Create a player of the game, with their own board
     * @param {"human"|"computer"} type
     * @param {Gameboard} board
     */
    constructor(type, board) {
        checkType(type);
        checkBoard(board);
        this.#type = type;
        this.#board = board;
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

    // Static properties

    static types = {
        HUMAN: "human",
        COMPUTER: "computer",
    };
}

function checkType(type) {
    for (const key in Player.types) {
        if (Player.types[key] === type) return;
    }
    throw new TypeError("Player type must be 'human' or 'computer'");
}

function checkBoard(board) {
    if (!(board instanceof Gameboard))
        throw new TypeError("Board must be an instance of Gameboard");
}
