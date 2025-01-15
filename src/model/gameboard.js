export default class Gameboard {
    // Private variables
    #height;
    #width;
    #board;

    /** Create a new Gameboard with the given size
     * @param {number} width The width of the board
     * @param {number} height (Optional) The height of the board. Will be set to width if absent
     */
    constructor(width, height) {
        checkDimensions(width, height);
        this.#width = width;
        this.#height = height ? height : width;
        this.#board = createBoard(this.#width, this.#height);
    }

    // Public static properties

    static rotations = {
        DOWN: "down",
        ACROSS: "across",
    };

    // Public instance properties

    /** The width of the board, in cells @returns {number} */
    get width() {
        return this.#width;
    }

    /** The height of the board, in cells @returns {number} */
    get height() {
        return this.#height;
    }

    // Public instance methods

    /** Places a ship at the given coordinates with the given rotation
     * @param {Ship} shipObj The ship instance to place on the board
     * @param {number} xPos The x coordinate on which to place the ship
     * @param {number} yPos The y coordinate on which to place the ship
     * @param {string} rotation The orientation of the ship, starting at (`xPos`, `yPos`)
     *
     * `"across"` will place the ship in this direction: →
     *
     * `"down"` will place the ship in this direction: ↓
     */
    placeShip(shipObj, xPos, yPos, rotation) {
        const move = new Move({ length: shipObj.length, xPos, yPos, rotation });
        this.#checkPlacement(move);
        this.#apply(move, (cell) => cell.setTo(shipObj));
    }

    /** Attempts to attack a square
     * @param {number} xPos X coordinate of the attack
     * @param {number} yPos Y coordinate of the attack
     */
    attack(xPos, yPos) {
        this.#checkSquare(xPos, yPos);
        const cell = this.#board[xPos][yPos];
        if (cell.isHit) throw new Error("That cell has been attacked already");
        cell.hit();
    }

    /** Returns `true` if the cell at (`xPos`, `yPos`) has been attacked
     * @param {number} xPos X coordinate of the cell
     * @param {number} yPos Y coordinate of the cell
     * @returns {boolean}
     */
    isHit(xPos, yPos) {
        this.#checkSquare(xPos, yPos);
        const cell = this.#board[xPos][yPos];
        return cell.isHit;
    }

    // Private methods

    #checkSquare(xPos, yPos) {
        if (xPos < 0 || xPos >= this.#width)
            throw new RangeError("X must be between 0 and board width");
        if (yPos < 0 || yPos >= this.#height)
            throw new RangeError("Y must be between 0 and board width");
    }

    /** Applies callback to each cell in the move
     * @param {Move} move The move whose cells we want to access
     * @param {Function} callback The callback to use, which takes one argument `cell`.
     */
    #apply(move, callback) {
        const isAcross = move.rotation === Gameboard.rotations.ACROSS;
        for (let i = 0; i < move.length; i++) {
            const x = isAcross ? move.xPos + i : move.xPos;
            const y = isAcross ? move.yPos : move.yPos + i;
            const cell = this.#board[x][y];
            callback(cell);
        }
    }

    #checkPlacement(move) {
        this.#checkBelowZero(move);
        this.#checkSpillover(move);
        this.#checkCollisions(move);
    }

    #checkBelowZero(move) {
        if (move.xPos < 0)
            throw new RangeError("X coordinate must be higher than 0");
        if (move.yPos < 0)
            throw new RangeError("Y coordinate must be higher than 0");
    }

    #checkSpillover(move) {
        if (
            move.rotation === Gameboard.rotations.ACROSS &&
            move.xPos + move.length > this.#width
        )
            throw new RangeError("Ship is spilling over the right side");
        if (
            move.rotation === Gameboard.rotations.DOWN &&
            move.yPos + move.length > this.#height
        )
            throw new RangeError("Ship is spilling over the bottom side");
    }

    #checkCollisions(move) {
        const callback = (cell) => {
            if (cell.read !== null)
                throw new Error("There's already a ship there");
        };
        this.#apply(move, callback);
    }
}

class Cell {
    #content = null;
    #isHit = false;

    setTo(content) {
        this.#content = content;
    }

    get read() {
        return this.#content;
    }

    hit() {
        this.#isHit = true;
    }

    get isHit() {
        return this.#isHit;
    }
}

/** Defines a move to place a ship on the board */
class Move {
    /**
     * @param {number} length The length of the move
     * @param {number} xPos X coordinate of the move
     * @param {number} yPos Y coordinate of the move
     * @param {string} rotation Rotation of the move; either `"down"` or `"across"`
     */
    constructor({ length, xPos, yPos, rotation }) {
        this.length = length;
        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = rotation;
    }
}

function createBoard(width, height) {
    return new Array(width).fill(new Array(height).fill(new Cell()));
}

function checkDimensions(width, height) {
    if (typeof width !== "number")
        throw new TypeError("Width must be a number");

    if (width < 2) throw new TypeError("Width must be at least 2");

    if (typeof height !== "undefined" && typeof height !== "number")
        throw new TypeError("Height must be either undefined or a number");

    if (height < 2) throw new TypeError("Height must be at least 2");
}
