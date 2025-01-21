// Data objects
import BoardObj from "./model/gameboard";
import PlayerObj from "./model/player";
import ShipObj from "./model/ship";

// Components
import BoardDom from "./components/board";
import Player from "./model/player";

const boardSize = 10;

export default function startGame() {
    const dom = cacheDom();
    const game = createGame(boardSize, boardSize);

    for (let i = 0; i < game.players.length; i++) {
        $placeShipsRandomly(game.players[i]);
        renderBoard(dom.players[i], game.players[i].board);
    }
}

/** Returns an object which points to all the relevant objects in the DOM */
function cacheDom() {
    const game = document.querySelector("#game");
    return {
        game,
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
    return {
        players: [
            createPlayer(boardWidth, boardHeight, Player.types.HUMAN),
            createPlayer(boardWidth, boardHeight, Player.types.COMPUTER),
        ],
    };

    function createPlayer(boardWidth, boardHeight, playerType) {
        const board = new BoardObj(boardWidth, boardHeight);
        const player = new PlayerObj(playerType, board);
        return player;
    }
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
