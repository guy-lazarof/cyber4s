class BoardManger {
  constructor() {
    this.Board = [];
    this.boardSize = BOARD_SIZE;
    this.selectedPieceID = undefined;
    this.filteredMovesByID = undefined; //before considering on other pieces by ID
    this.filteredMoves = []; //before considering on other pieces
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
  //this function get only pieces and change the color of cells that are possibles to move to
  //TODO:filter the possible move after consider about other pieces on board (mine and my opponent)
  onPieceClick(row, col, cellID) {
    //remove class to selected piece by ID
    if (this.selectedPieceID !== undefined) {
      document
        .getElementById(this.selectedPieceID)
        .classList.remove(`selected`);
    }
    //add class to selected piece- by ID

    if (this.Board[row][col] !== undefined) {
      document.getElementById(cellID).classList.add(`selected`);
      this.selectedPieceID = cellID;
    }
    // this.filteredMoves= the array of moves that evrey piece can do
    this.filteredMoves = this.Board[row][col].getPossibleMoves();
    console.log(this.filteredMoves);

    //remove class to possible moves by ID
    if (this.filteredMovesByID !== undefined) {
      for (let i = 0; i < this.filteredMovesByID.length; i++) {
        document
          .getElementById(this.filteredMovesByID[i])
          .classList.remove(`possible-move`);
      }
    }
    // makes the possible moves array to a possible moves array by ID
    this.filteredMovesByID = this.Board[row][col].Trans_To_Id_Cells();
    //Add class to possible moves by ID
    for (let i = 0; i < this.filteredMovesByID.length; i++) {
      document
        .getElementById(this.filteredMovesByID[i])
        .classList.add(`possible-move`);
    }
    console.log(this.Board[row][col].Trans_To_Id_Cells());
  }
  // make an two dimensional arrays
  initPieces() {
    this.Board = new Array(this.boardSize);

    for (let i = 0; i < this.Board.length; i++) {
      this.Board[i] = new Array(this.boardSize);
      for (let j = 0; j < this.Board.length; j++) {
        this.Board[i][j] = undefined;
      }
    }
    //add the init pieces to the two dimensional arrays

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

    console.log(this.Board);
  }
}
