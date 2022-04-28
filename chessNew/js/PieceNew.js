class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.possibles = [];
    this.filteredMoves = [];
  }

  createImage() {
    let id = `${this.row}_${this.col}`;
    const image = document.createElement("img");
    image.src = "images/" + this.player + "/" + this.type + ".png";
    document.getElementById(id).appendChild(image);
  }
  getPossibleMoves() {
    this.possibles = [];
    this.filteredMoves = [];
    if (this.type === PAWN) {
      if (this.player === `white`) {
        this.possibles.push([this.row + 1, this.col]);
      } else {
        this.possibles.push([this.row - 1, this.col]);
      }
    }
    if (this.type === ROOK) {
      for (let i = 1; i < BOARD_SIZE; i++) {
        this.possibles.push([this.row, this.col + i]);
        this.possibles.push([this.row + i, this.col]);
        this.possibles.push([this.row, this.col - i]);
        this.possibles.push([this.row - i, this.col]);
      }
    }
    if (this.type === BISHOP) {
      for (let i = 1; i < BOARD_SIZE; i++) {
        this.possibles.push([this.row + i, this.col + i]);
        this.possibles.push([this.row - i, this.col - i]);
        this.possibles.push([this.row + i, this.col - i]);
        this.possibles.push([this.row - i, this.col + i]);
      }
    }
    if (this.type === QUEEN) {
      for (let i = 1; i < BOARD_SIZE; i++) {
        this.possibles.push([this.row + i, this.col + i]);
        this.possibles.push([this.row - i, this.col - i]);
        this.possibles.push([this.row + i, this.col - i]);
        this.possibles.push([this.row - i, this.col + i]);
        this.possibles.push([this.row, this.col + i]);
        this.possibles.push([this.row + i, this.col]);
        this.possibles.push([this.row, this.col - i]);
        this.possibles.push([this.row - i, this.col]);
      }
    }
    if (this.type === KNIGHT) {
      this.possibles.push([this.row + 2, this.col + 1]);
      this.possibles.push([this.row + 1, this.col + 2]);
      this.possibles.push([this.row + 2, this.col - 1]);
      this.possibles.push([this.row + 1, this.col - 2]);
      this.possibles.push([this.row - 2, this.col - 1]);
      this.possibles.push([this.row - 1, this.col - 2]);
      this.possibles.push([this.row - 2, this.col + 1]);
      this.possibles.push([this.row - 1, this.col + 2]);
    }
    if (this.type === KING) {
      this.possibles.push([this.row - 1, this.col - 1]);
      this.possibles.push([this.row - 1, this.col]);
      this.possibles.push([this.row - 1, this.col + 1]);
      this.possibles.push([this.row, this.col - 1]);
      this.possibles.push([this.row, this.col + 1]);
      this.possibles.push([this.row + 1, this.col - 1]);
      this.possibles.push([this.row + 1, this.col]);
      this.possibles.push([this.row + 1, this.col + 1]);
    }
    for (const possible of this.possibles) {
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
  Trans_To_Id_Cells() {
    let result = [];
    for (const filtered of this.filteredMoves) {
      result.push(`${filtered[0]}_${filtered[1]}`);
    }
    return result;
  }
}
