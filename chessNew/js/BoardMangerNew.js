class BoardManger {
  constructor(boardSize) {
    this.Board = [];
    this.boardSize = boardSize;
    this.selectedPieceID = undefined;
  }
  initBoard() {
    const table = document.createElement("table");
    document.body.appendChild(table);
    table.classList.add("table");
    for (let i = 0; i < this.boardSize; i++) {
      const row = table.insertRow();
      for (let j = 0; j < this.boardSize; j++) {
        const cell = row.insertCell();
        cell.id = `${i}_${j}`;
        if ((i + j) % 2 === 0) {
          cell.className = "light-cell";
        } else {
          cell.className = "dark-cell";
        }
        cell.addEventListener("click", () => this.onPieceClick(i, j, cell.id));
      }
    }
  }

  onPieceClick(row, col, cellID) {
    if (this.selectedPieceID !== undefined) {
      document
        .getElementById(this.selectedPieceID)
        .classList.remove(`selected`);
    }

    if (this.Board[row][col] !== undefined) {
      document.getElementById(cellID).classList.add(`selected`);
      this.selectedPieceID = cellID;
    }
  }
  initPieces() {
    this.Board = new Array(this.boardSize);

    for (let i = 0; i < this.Board.length; i++) {
      this.Board[i] = new Array(this.boardSize);
      for (let j = 0; j < this.Board.length; j++) {
        this.Board[i][j] = undefined;
      }
    }
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.Board[0][i] = new Piece(0, i, PIECES[i], `white`);
      this.Board[0][i].createImage();
      this.Board[7][i] = new Piece(7, i, PIECES[i], `black`);
      this.Board[7][i].createImage();
      this.Board[1][i] = new Piece(1, i, PAWN, `white`);
      this.Board[1][i].createImage();
      this.Board[6][i] = new Piece(6, i, PAWN, `black`);
      this.Board[6][i].createImage();
    }
    // this.Board[0][0] = new Piece(0, 0, `rook`, `white`);
    // this.Board[0][0].createImage();
    console.log(this.Board);
  }
}
