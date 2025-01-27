import Game from "./model/game"; // Game logic
import Dom from "./view/dom"; // DOM methods
import { GameError } from "./errors";

// Dom module
let dom = new Dom(document.querySelector("#game"));

// Game logic module
let game = new Game();

/** Starts a game of battleship */
export default function startGame() {
    game.addPlayer(10, 10);
    game.addComputer(10, 10);

    dom.markCurrentPlayer(0);

    for (let i = 0; i < game.players.length; i++) {
        const playerObj = game.players[i];
        const playerDom = dom.players[i];

        playerObj.name = playerDom.name.value;
        playerObj.placeShipsRandomly();
        playerDom.board.render(playerObj.board);
        bindPlayerEvents(playerDom, playerObj);
    }
}

function bindPlayerEvents(playerDom, playerObj) {
    playerDom.name.addEventListener(
        "input",
        () => (playerObj.name = playerDom.name.value),
    );

    playerDom.board.element.addEventListener(
        "click",
        createAttackHandler(playerDom, playerObj),
    );
}

// Event handlers

/** Factory for attack handlers. One should be created for each board */
function createAttackHandler(playerDom, playerObj) {
    const wrongTurnMessage = `${playerObj.name}, it's your turn. You can't attack your own board!`;
    return function attackHandler(event) {
        try {
            if (game.isFrozen) return;
            if (game.currentPlayer === playerObj)
                throw new GameError(wrongTurnMessage);

            const cell = event.target;
            const xPos = Number(cell.dataset.x);
            const yPos = Number(cell.dataset.y);
            playerObj.board.attack(xPos, yPos);
            playerDom.board.updateCell(playerObj.board, xPos, yPos);
            dom.updateMessage("");

            if (game.someoneLost()) {
                victoryHandler(game.currentPlayer);
                return;
            }

            game.switchTurn();
            dom.markCurrentPlayer(game.turnIndex);
        } catch (e) {
            if (e instanceof GameError) {
                dom.updateMessage(e.message);
            } else {
                throw e;
            }
        }
    };
}

/** Handles the results of `playerObj`'s victory */
function victoryHandler(playerObj) {
    dom.updateMessage(`All ships are sunk. ${playerObj.name} wins!`);
    game.isFrozen = true;
}
