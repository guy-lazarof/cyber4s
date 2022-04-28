class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.possibles = [];
  }

  createImage() {
    let id = `${this.row}_${this.col}`;
    const image = document.createElement("img");
    image.src = "images/" + this.player + "/" + this.type + ".png";
    document.getElementById(id).appendChild(image);
  }
  getPossibleMoves() {
    this.possibles = [];
    let filteredMoves = [];
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
    for (const possible of this.possibles) {
      const absoluteRow = possible[0];
      const absoluteCol = possible[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(possible);
      }
    }
    return filteredMoves;
  }

  // idOfCells() {
  //   for (const possible of this.possibles) {
  //     possible;
  //   }
  // }
}
