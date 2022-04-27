class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  createImage() {
    let id = `${this.row}_${this.col}`;
    const image = document.createElement("img");
    image.src = "images/" + this.player + "/" + this.type + ".png";
    document.getElementById(id).appendChild(image);
  }
  //לצבוע רק את הpiece
  // getInitialBoard() {
  //   pieces = [];
  //   for (let i = 0; i < BOARD_SIZE; i++) {
  //     pieces.push(new Piece(0, i, PIECES[i], WHITE_PLAYER));
  //     pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER));
  //     pieces.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  //     pieces.push(new Piece(7, i, PIECES[i], BLACK_PLAYER));
  //   }
  // }
}
