class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.absoluteMoves = []; // before filter
    this.possibleMovesOnBoard = []; //before considering on other pieces
  }

  createImage() {
    let id = `${this.row}_${this.col}`;
    const image = document.createElement("img");
    image.src = "images/" + this.player + "/" + this.type + ".png";
    document.getElementById(id).appendChild(image);
  }
  getPossibleMoves() {
    this.absoluteMoves = [];
    this.possibleMovesOnBoard = [];
    if (this.type === PAWN) {
      if (this.player === `white`) {
        this.absoluteMoves.push([this.row + 1, this.col]);
      } else {
        this.absoluteMoves.push([this.row - 1, this.col]);
      }
    }
    if (this.type === ROOK) {
      for (let i = 1; i < BOARD_SIZE; i++) {
        this.absoluteMoves.push([this.row, this.col + i]);
        this.absoluteMoves.push([this.row + i, this.col]);
        this.absoluteMoves.push([this.row, this.col - i]);
        this.absoluteMoves.push([this.row - i, this.col]);
      }
    }
    if (this.type === BISHOP) {
      for (let i = 1; i < BOARD_SIZE; i++) {
        this.absoluteMoves.push([this.row + i, this.col + i]);
        this.absoluteMoves.push([this.row - i, this.col - i]);
        this.absoluteMoves.push([this.row + i, this.col - i]);
        this.absoluteMoves.push([this.row - i, this.col + i]);
      }
    }
    if (this.type === QUEEN) {
      for (let i = 1; i < BOARD_SIZE; i++) {
        this.absoluteMoves.push([this.row + i, this.col + i]);
        this.absoluteMoves.push([this.row - i, this.col - i]);
        this.absoluteMoves.push([this.row + i, this.col - i]);
        this.absoluteMoves.push([this.row - i, this.col + i]);
        this.absoluteMoves.push([this.row, this.col + i]);
        this.absoluteMoves.push([this.row + i, this.col]);
        this.absoluteMoves.push([this.row, this.col - i]);
        this.absoluteMoves.push([this.row - i, this.col]);
      }
    }
    if (this.type === KNIGHT) {
      this.absoluteMoves.push([this.row + 2, this.col + 1]);
      this.absoluteMoves.push([this.row + 1, this.col + 2]);
      this.absoluteMoves.push([this.row + 2, this.col - 1]);
      this.absoluteMoves.push([this.row + 1, this.col - 2]);
      this.absoluteMoves.push([this.row - 2, this.col - 1]);
      this.absoluteMoves.push([this.row - 1, this.col - 2]);
      this.absoluteMoves.push([this.row - 2, this.col + 1]);
      this.absoluteMoves.push([this.row - 1, this.col + 2]);
    }
    if (this.type === KING) {
      this.absoluteMoves.push([this.row - 1, this.col - 1]);
      this.absoluteMoves.push([this.row - 1, this.col]);
      this.absoluteMoves.push([this.row - 1, this.col + 1]);
      this.absoluteMoves.push([this.row, this.col - 1]);
      this.absoluteMoves.push([this.row, this.col + 1]);
      this.absoluteMoves.push([this.row + 1, this.col - 1]);
      this.absoluteMoves.push([this.row + 1, this.col]);
      this.absoluteMoves.push([this.row + 1, this.col + 1]);
    }
    for (const possible of this.absoluteMoves) {
      const absoluteRow = possible[0];
      const absoluteCol = possible[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
        // Piece.BoardManger.Board[absoluteRow][absoluteCol] !== undefined
      ) {
        this.possibleMovesOnBoard.push(possible);
      }
    }
    return this.possibleMovesOnBoard;
  }
  Trans_To_Id_Cells() {
    let result = [];
    for (const filtered of this.possibleMovesOnBoard) {
      result.push(`${filtered[0]}_${filtered[1]}`);
    }
    return result;
  }
}
