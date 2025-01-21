export default class Board {
    /** Create an instance of Board with the specified height and width (in cells)
     * @param {number} width Width of the board, in cells
     * @param {number} height Width of the board, in cells
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    /** Creates the board element from a board object and returns it */
    render(boardObj) {
        const boardElement = document.createElement("div");

        boardElement.classList.add("board");
        boardElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
        boardElement.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const hasShip = boardObj.shipAt(x, y) !== null;
                const isHit = boardObj.isHit(x, y);
                boardElement.appendChild(createCell(x, y, hasShip, isHit));
            }
        }
        return boardElement;
    }
}

/** Creates a simple cell element with the provided x/y data and returns it */
function createCell(x, y, hasShip, isHit) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    if (hasShip) cell.classList.add("has-ship");
    if (isHit) cell.classList.add("is-hit");
    cell.dataset.x = x;
    cell.dataset.y = y;
    return cell;
}
