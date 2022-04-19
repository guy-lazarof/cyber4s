function createChessBoard() {
  const BOARD_SIZE = 8;
  const WHITE_PLAYER = `white`;
  const DARK_PLAYER = `dark`;
  let selectedCell;
  let pieces = [];

  class piece {
    constructor(row, col, type, player) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.player = player;
    }
  }

  function getInitialBoard() {
    let result = [];
    result.push(new piece(0, 0, "rook", WHITE_PLAYER));
    result.push(new piece(0, 1, "knight", WHITE_PLAYER));
    result.push(new piece(0, 2, "bishop", WHITE_PLAYER));
    result.push(new piece(0, 3, "king", WHITE_PLAYER));
    result.push(new piece(0, 4, "queen", WHITE_PLAYER));
    result.push(new piece(0, 5, "bishop", WHITE_PLAYER));
    result.push(new piece(0, 6, "knight", WHITE_PLAYER));
    result.push(new piece(0, 7, "rook", WHITE_PLAYER));
    result.push(new piece(7, 0, "rook", DARK_PLAYER));
    result.push(new piece(7, 1, "knight", DARK_PLAYER));
    result.push(new piece(7, 2, "bishop", DARK_PLAYER));
    result.push(new piece(7, 3, "king", DARK_PLAYER));
    result.push(new piece(7, 4, "queen", DARK_PLAYER));
    result.push(new piece(7, 5, "bishop", DARK_PLAYER));
    result.push(new piece(7, 6, "knight", DARK_PLAYER));
    result.push(new piece(7, 7, "rook", DARK_PLAYER));
    for (let i = 0; i < BOARD_SIZE; i++) {
      result.push(new piece(1, i, "pawn", WHITE_PLAYER));
      result.push(new piece(6, i, "pawn", DARK_PLAYER));
    }
    return result;
  }

  function addImage(cell, player, name) {
    const img123 = document.createElement(`img`);
    img123.src = `images/` + player + `/` + name + `.png`;
    cell.appendChild(img123);
  }

  // function addImageByIndex(cell, player, index) {
  //   if (index === 0 || index === 7) {
  //     addImage(cell, player, `rook`);
  //   } else if (index === 1 || index === 6) {
  //     addImage(cell, player, `knight`);
  //   } else if (index === 2 || index === 5) {
  //     addImage(cell, player, `bishop`);
  //   } else if (index === 3) {
  //     addImage(cell, player, `king`);
  //   } else if (index === 4) {
  //     addImage(cell, player, `queen`);
  //   }
  // }

  function onCellclick(e) {
    console.log(e.currentTarget);
    if (selectedCell !== undefined) {
      selectedCell.classList.remove(`selected`);
    }
    selectedCell = e.currentTarget;
    selectedCell.classList.add(`selected`);
  }

  const head1 = document.createElement("h1");
  head1.classList.add("head");
  head1.textContent = "chess table!!!";
  const Body1 = document.body;
  Body1.appendChild(head1);
  const table123 = document.createElement("table");
  table123.classList.add("table1");
  Body1.appendChild(table123);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table123.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = "light-cell";
      } else {
        cell.className = "dark-cell";
      }
      cell.addEventListener(`click`, onCellclick);
    }
  }

  pieces = getInitialBoard();

  for (let piece of pieces) {
    //💬💬💬
    addImage(
      table123.rows[piece.row].cells[piece.col],
      piece.player,
      piece.type
    );
    console.log(piece);
  }
}

window.addEventListener("load", createChessBoard);
