export default class Gameboard {
    /** Create a new Gameboard with the given size
     * @param {number} width The width of the board
     * @param {number} height (Optional) The height of the board. Will be set to width if absent
     */
    constructor(width, height) {
        checkDimensions(width, height);
        this.#width = width;
        this.#height = height ? height : width;
    }

    // Private variables
    #height;
    #width;

    /** The width of the board, in cells @returns {number} */
    get width() {
        return this.#width;
    }

    /** The height of the board, in cells @returns {number} */
    get height() {
        return this.#height;
    }
}

function checkDimensions(width, height) {
    if (typeof width !== "number")
        throw new TypeError("Width must be a number");

    if (width < 2) throw new TypeError("Width must be at least 2");

    if (typeof height !== "undefined" && typeof height !== "number")
        throw new TypeError("Height must be either undefined or a number");

    if (height < 2) throw new TypeError("Height must be at least 2");
}
