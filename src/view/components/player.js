import BoardDom from "./board";

export default class PlayerDom {
    /** Creates a PlayerDom instance rooted at `playerElement`
     * @param {HTMLElement} playerElement The root of the player's DOM tree
     */
    constructor(playerElement) {
        this.element = playerElement;
        this.name = this.cache.name();
        this.board = new BoardDom(this.cache.board());
    }

    /** Methods to re-cache individual elements */
    cache = {
        name: () => this.element.querySelector(".name"),
        board: () => this.element.querySelector(".board"),
    };
}
