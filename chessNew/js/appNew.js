const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const BLACK_PLAYER = "dark";
const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const KING = "king";
const QUEEN = "queen";
let boardManger = new BoardManger();

const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];
// Make the function after the HTML page was loaded
function onLoad() {
  boardManger.initBoard();
  boardManger.initPieces();
}
window.addEventListener("load", onLoad);
