class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.absoluteMoves = []; // before filter
    this.filteredMoves = [];
  }
  //create the possible moves that evrey type can make
  //TODO:filter the possible move after consider about other pieces on board (mine and my opponent)
  getPossibleMoves() {
    this.absoluteMoves = [];
    this.filteredMoves = [];
    if (this.type === PAWN) {
      if (this.player === `white`) {
        this.absoluteMoves.push([this.row + 1, this.col]);
      } else {
        this.absoluteMoves.push([this.row - 1, this.col]);
      }
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
    // filter the possible moves by the limits of the board size
    for (const possible of this.absoluteMoves) {
      const absoluteRow = possible[0];
      const absoluteCol = possible[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        this.filteredMoves.push(possible);
      }
    }

    return this.filteredMoves;
  }
  //create images of pieces in the table
  createImage() {
    let id = `${this.row}_${this.col}`;
    const image = document.createElement("img");
    image.src = "images/" + this.player + "/" + this.type + ".png";
    document.getElementById(id).appendChild(image);
  }
  // take array and transformation the array to an array of ID's
  Trans_To_Id_Cells() {
    let result = [];
    for (const filterID of this.getPossibleMoves()) {
      result.push(`${filterID[0]}_${filterID[1]}`);
    }
    return result;
  }
  // gets a player( white or black) and return the opponent
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
  }
}
