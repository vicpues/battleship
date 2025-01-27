// Components
import PlayerDom from "./components/player";

export default class Dom {
    /** Creates an object with all the DOM components of the game, rooted in gameElement
     * @param {HTMLElement} gameElement The root of the game's DOM tree
     */
    constructor(gameElement) {
        this.game = gameElement;
        this.message = this.game.querySelector(".message");
        this.players = this.cachePlayers();
    }

    /** Looks for player elements in the game root and caches them as PlayerDom instances*/
    cachePlayers() {
        const playersArr = [];
        const playerElements = [...this.game.querySelectorAll(".player")];
        for (let playerElement of playerElements) {
            const player = new PlayerDom(playerElement);
            playersArr.push(player);
        }
        return playersArr;
    }

    /** Displays the `message` string in the message element of the dom */
    updateMessage(message) {
        this.message.textContent = message;
    }
}
