export default class BoardDom {
    /** Creates a BoardDom instance rooted at `boardElement`
     * @param {HTMLElement} boardElement
     */
    constructor(boardElement) {
        this.element = boardElement;
    }

    /** Creates the board element from a board object and replaces this instance's `element`
     * with the result.
     */
    render(boardObj) {
        const newBoard = document.createElement("div");

        newBoard.classList.add("board");
        newBoard.style.gridTemplateColumns = `repeat(${boardObj.width}, 1fr)`;
        newBoard.style.gridTemplateRows = `repeat(${boardObj.height}, 1fr)`;

        for (let y = 0; y < boardObj.height; y++) {
            for (let x = 0; x < boardObj.width; x++) {
                const hasShip = boardObj.shipAt(x, y) !== null;
                const isHit = boardObj.isHit(x, y);
                newBoard.appendChild(createCell(x, y, hasShip, isHit));
            }
        }
        this.element.replaceWith(newBoard);
        this.element = newBoard;
    }

    /** Updates the cell at (x, y) inside boardElement with its new status
     * in the boardObj object */
    updateCell(boardObj, x, y) {
        const cellPosition = y * boardObj.width + x;
        const oldCell = this.element.children.item(cellPosition);
        const hasShip = boardObj.shipAt(x, y) !== null;
        const isHit = boardObj.isHit(x, y);
        const newCell = createCell(x, y, hasShip, isHit);
        oldCell.replaceWith(newCell);
    }
}

/** Creates a simple cell element with the provided parameters data and returns it */
function createCell(x, y, hasShip, isHit) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    if (hasShip) cell.classList.add("has-ship");
    if (isHit) cell.classList.add("is-hit");
    cell.dataset.x = x;
    cell.dataset.y = y;
    return cell;
}
