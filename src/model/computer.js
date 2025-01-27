import Player from "./player";

export default class Computer extends Player {
    constructor(...args) {
        super(...args);
        this.enemyBoard;
    }

    // Private properties

    #validTargets;

    // Property accessors

    /** Returns `true` if this object is an instance of Computer */
    get isComputer() {
        return true;
    }

    /** An array of [x, y] subarrays with allowed attacks for the AI */
    get validTargets() {
        return this.#validTargets;
    }

    // Public methods

    /** Sets the enemy board and creates the array of valid targets */
    setEnemyBoard(enemyBoard) {
        this.enemyBoard = enemyBoard;
        this.#validTargets = getTargetsFromBoard(enemyBoard);
    }

    /** Attacks a random, un-hit square in the enemy board and returns its coordinates
     * as an object
     * @returns {{xPos:number, yPos:number}}
     */
    randomAttack() {
        const randomIndex = Math.floor(
            Math.random() * this.validTargets.length,
        );
        const target = this.validTargets[randomIndex];
        const { xPos, yPos } = target;

        this.enemyBoard.attack(xPos, yPos);
        this.#validTargets.splice(randomIndex, 1);

        return target;
    }
}

/** Generates an array of {xPos, yPos} coordinate objects, which are
 * valid targets for and attack */
function getTargetsFromBoard(board) {
    const targetArr = [];
    for (let xPos = 0; xPos < board.width; xPos++) {
        for (let yPos = 0; yPos < board.height; yPos++) {
            targetArr.push({ xPos, yPos });
        }
    }
    return targetArr;
}
