// Data objects
import Board from "./board";
import Player from "./player";

export default class Game {
    /** Creates an empty Game instance, without any players. use `.addPlayer` to add them */
    constructor() {
        this.players = [];
        this.isFrozen = false;
    }

    // Private properties
    #turn = 0;

    /** The index of the player whose turn it is. Useful for communicating with the DOM module.*/
    get turn() {
        return this.#turn % this.players.length;
    }

    /** The object of the player whose turn it is */
    get currentPlayer() {
        return this.players[this.#turn];
    }

    /** Switches to the next player's turn */
    switchTurn() {
        if (this.#turn === this.players.length - 1) {
            this.#turn = 0;
        } else {
            this.#turn++;
        }
    }

    /** Adds a player with the provided parameters */
    addPlayer(width, height, type) {
        const board = new Board(width, height);
        const player = new Player(type, board);
        this.players.push(player);
    }

    /** Returns true if any player had all their ships sunk */
    someoneLost() {
        for (let player of this.players) {
            if (player.board.allShipsSunk) return true;
        }
        return false;
    }

    // Static properties
    static playerTypes = Player.types;
}
