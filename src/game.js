// Data objects
import Gameboard from "./model/gameboard";
import Player from "./model/player";

// Components
import Board from "./components/board";

const boardSize = 10;

export default function startGame() {
    const dom = cacheDom();

    const players = createPlayers({
        boardWidth: boardSize,
        boardHeight: boardSize,
        player1type: Player.types.HUMAN,
        player2type: Player.types.COMPUTER,
    });

    renderBoards(dom, players);
}

function cacheDom() {
    const game = document.querySelector("#game");
    const players = [
        game.querySelector(".player.one"),
        game.querySelector(".player.two"),
    ];
    return { game, players };
}

function createPlayers({ boardWidth, boardHeight, player1type, player2type }) {
    return [
        new Player(player1type, new Gameboard(boardWidth, boardHeight)),
        new Player(player2type, new Gameboard(boardWidth, boardHeight)),
    ];
}

function renderBoards(dom, players) {
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const board = new Board(player.board.width, player.board.height);
        dom.players[i].appendChild(board.render());
        dom.players[i].board = board;
    }
}
