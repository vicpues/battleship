export default class Board {
    /** Create an instance of Board with the specified height and width (in cells)
     * @param {number} width Width of the board, in cells
     * @param {number} height Width of the board, in cells
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    /** Creates the board element and returns it */
    render() {
        const boardElement = document.createElement("div");

        boardElement.classList.add("board");
        boardElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
        boardElement.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                boardElement.appendChild(createCell(x, y));
            }
        }
        return boardElement;
    }
}

/** Creates a simple cell element with the provided x/y data and returns it */
function createCell(x, y) {
    const cellElement = document.createElement("button");
    cellElement.classList.add("cell");
    cellElement.dataset.x = x;
    cellElement.dataset.y = y;
    return cellElement;
}
