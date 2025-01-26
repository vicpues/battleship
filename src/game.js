// Data objects
import BoardObj from "./model/gameboard";
import PlayerObj from "./model/player";
import ShipObj from "./model/ship";

// Components
import BoardDom from "./components/board";
import Player from "./model/player";

// Global functions
let updateMessage;

/** Starts a game of battleship */
export default function startGame() {
    const boardSize = 10;
    const game = createGame(boardSize, boardSize);
    const dom = cacheDom();

    bindGlobals(dom);

    for (let i = 0; i < game.players.length; i++) {
        $placeShipsRandomly(game.players[i]);
        renderBoard(dom.players[i], game.players[i].board);
        bindPlayerEvents(dom.players[i], game.players[i]);
    }
}

/** Returns an object which points to all the relevant objects in the DOM */
function cacheDom() {
    const game = document.querySelector("#game");
    const message = game.querySelector(".message");
    return {
        game,
        message,
        players: [
            cachePlayerDom(game.querySelector(".player.one")),
            cachePlayerDom(game.querySelector(".player.two")),
        ],
    };

    /** @param {HTMLElement} playerElement */
    function cachePlayerDom(playerElement) {
        return {
            name: playerElement.querySelector(".name"),
            board: playerElement.querySelector(".board"),
        };
    }
}

/** Returns an object with an array of new Player objects */
function createGame(boardWidth, boardHeight) {
    const createPlayer = (boardWidth, boardHeight, playerType) => {
        const board = new BoardObj(boardWidth, boardHeight);
        const player = new PlayerObj(playerType, board);
        return player;
    };

    return {
        players: [
            createPlayer(boardWidth, boardHeight, Player.types.HUMAN),
            createPlayer(boardWidth, boardHeight, Player.types.COMPUTER),
        ],
    };
}

/** Assigns the global state functions based on the intial state of the game */
function bindGlobals(dom) {
    updateMessage = (message) => (dom.message.textContent = message);
}

/** Creates a Board html element from a board obj and updates it in the playerDom
 * @param {HTMLElement} playerDom
 * @param {PlayerObj} playerObj
 */
function renderBoard(playerDom, boardObj) {
    const { width, height } = boardObj;
    const newBoard = new BoardDom(width, height).render(boardObj);
    if (playerDom.board === null) playerDom.name.after(newBoard);
    else playerDom.board.replaceWith(newBoard);
    playerDom.board = newBoard;
}

/** Takes in a Player obj and places ships randomly on their board */
function $placeShipsRandomly(playerObj) {
    const shipLengths = [5, 4, 3, 2, 2];
    const rotations = [BoardObj.rotations.DOWN, BoardObj.rotations.ACROSS];
    const board = playerObj.board;

    let shipsAmount = 0;
    while (shipsAmount < 5) {
        const length = shipLengths[shipsAmount];
        const ship = new ShipObj(length);
        try {
            const xPos = Math.floor(Math.random() * board.width);
            const yPos = Math.floor(Math.random() * board.height);
            const rot = rotations[Math.floor(Math.random() * rotations.length)];
            board.placeShip(ship, xPos, yPos, rot);
            shipsAmount++;
        } catch {
            continue;
        }
    }
}

function bindPlayerEvents(playerDom, playerObj) {
    playerDom.board.addEventListener(
        "click",
        createAttackHandler(playerDom.board, playerObj.board),
    );
}

// Event handlers

function createAttackHandler(boardDom, boardObj) {
    return function attackHandler(event) {
        try {
            const cell = event.target;
            const xPos = Number(cell.dataset.x);
            const yPos = Number(cell.dataset.y);
            boardObj.attack(xPos, yPos);
            BoardDom.updateCell(boardDom, boardObj, xPos, yPos);
            updateMessage("");
        } catch (e) {
            updateMessage(e.message);
        }
    };
}
