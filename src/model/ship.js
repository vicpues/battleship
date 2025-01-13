export default class Ship {
    /** @param {number} length The length of the ship in number of cells*/
    constructor(length) {
        checkLength(length);
        this.#length = length;
    }

    // Private properties
    #length;
    #hits = 0;

    /** Number of times the ship has been hit  @returns {number} */
    get hits() {
        return this.#hits;
    }

    /** Number of cells taken up by the ship  @returns {number} */
    get length() {
        return this.#length;
    }

    /** Returns `true` if the ship is sunk, otherwise returns `false` */
    get isSunk() {
        return this.#hits === this.#length;
    }

    /** Score a hit on the ship instance */
    hit() {
        if (!this.isSunk) this.#hits++;
    }
}

function checkLength(length) {
    if (typeof length !== "number" || isNaN(length)) {
        throw new TypeError("Length must be a number");
    }
    if (length < 1) {
        throw new TypeError("Length must be higher than 1");
    }
}
