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

    /** The number of turns since the start of the game */
    get turn() {
        return this.#turn;
    }

    /** The index of the player whose turn it is. Useful for communicating with the DOM module.*/
    get turnIndex() {
        return this.#turn % this.players.length;
    }

    /** The index of the player whos turn went before the current player */
    get nextTurn() {
        return (this.#turn + 1) % this.players.length;
    }

    /** The object of the player whose turn it is */
    get currentPlayer() {
        return this.players[this.turnIndex];
    }

    /** The object of the player whose turn is coming up next */
    get nextPlayer() {
        return this.players[this.nextTurn];
    }

    /** Switches to the next player's turn */
    switchTurn() {
        this.#turn++;
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
