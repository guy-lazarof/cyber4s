const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const DARK_PLAYER = "dark";

const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const KING = "king";
const QUEEN = "queen";

let selectedCell;
let pieces = [];
let table;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getPossibleMoves() {
    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      // TODO: Get moves
    } else if (this.type === BISHOP) {
      // TODO: Get moves
    } else if (this.type === KING) {
      // TODO: Get moves
    } else if (this.type === QUEEN) {
      // TODO: Get moves
    } else {
      console.log("Unknown type", type);
    }
    console.log("relativeMoves", relativeMoves);

    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }
    console.log("absoluteMoves", absoluteMoves);

    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove);
      }
    }
    console.log("filteredMoves", filteredMoves);
    return filteredMoves;
  }

  getPawnRelativeMoves() {
    // TODO: Give different answer to dark player
    return [[1, 0]];
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
}

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {}
}

function getInitialBoard() {
  let result = [];
  addPieces(result, 0, WHITE_PLAYER);
  addPieces(result, 7, DARK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, DARK_PLAYER));
  }
  return result;
}

function addPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, KING, player));
  result.push(new Piece(row, 4, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

function addImage(cell, player, name) {
  const image = document.createElement("img");
  image.src = "images/" + player + "/" + name + ".png";
  cell.appendChild(image);
}

function onCellClick(event, row, col) {
  console.log(row);
  console.log(col);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
    }
  }

  for (let piece of pieces) {
    if (piece.row === row && piece.col === col) {
      console.log(piece);
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves)
        table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add(
          "possible-move"
        );
    }
  }

  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add("selected");
}

function createChessBoard() {
  const head1 = document.createElement("h1");
  head1.classList.add("head");
  head1.textContent = "chess table!!!";
  const Body = document.body;
  Body.appendChild(head1);
  table = document.createElement("table");
  table.className = "table";
  Body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = "light-cell";
      } else {
        cell.className = "dark-cell";
      }
      cell.id = "cell-" + row.toString() + "_" + col.toString();
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }

  pieces = getInitialBoard();

  console.log(pieces[1]);
  pieces[0].getPossibleMoves();
  console.log("pieces", pieces);

  for (let piece of pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener("load", createChessBoard);
// let guys = [
//   [1, 6],
//   [2, 3, 9],
//   [4, 5],
// ];
// // console.log(guys[1][1]);
// for (let guy of guys) {
//   // if (guy === guys[0]) {
//   //   console.log(guy);
//   // } else {
//   //   console.log(false);
//   // }
//   console.log(guy[0]);
// }
// const BOARD_SIZE = 8;
// const WHITE_PLAYER = `white`;
// const DARK_PLAYER = `dark`;

// const PAWN = "pawn";
// const ROOK = "rook";
// const KNIGHT = "knight";
// const BISHOP = "bishop";
// const KING = "king";
// const QUEEN = "queen";

// let selectedCell;
// let pieces = [];
// let table;
// class piece {
//   constructor(row, col, type, player) {
//     this.row = row;
//     this.col = col;
//     this.type = type;
//     this.player = player;
//   }
//   getPossibleMoves() {
//     // let result = [];
//     let relativeMoves;
//     if (this.type === PAWN) {
//       relativeMoves = this.getPawnRelativeMoves();
//     } else if (this.type === ROOK) {
//       relativeMoves = this.getRookRelativeMoves();
//     } else if (this.type === KNIGHT) {
//     } else if (this.type === BISHOP) {
//     } else if (this.type === KING) {
//     } else if (this.type === QUEEN) {
//     } else {
//       console.log("unknown type", this.type);
//     }
//     let absoluteMoves = [];
//     for (let relativeMove of relativeMoves) {
//       const absoluteRow = this.row + relativeMove[0];
//       const absoluteCol = this.col + relativeMove[1];
//       absoluteMoves.push([absoluteRow, absoluteCol]);
//     }

//     let filteredMoves = [];
//     for (let absoluteMove of absoluteMoves) {
//       const absoluteRow = absoluteMove[0];
//       const absoluteCol = absoluteMove[1];
//       if (
//         absoluteRow >= 0 &&
//         absoluteRow <= 7 &&
//         absoluteCol >= 0 &&
//         absoluteCol <= 7
//       ) {
//         filteredMoves.push(absoluteMove);
//       }
//     }
//     return filteredMoves;
//   }
//   getPawnRelativeMoves() {
//     return [[1, 0]];
//   }
//   getRookRelativeMoves() {
//     let result = [];
//     for (let i = 1; i < BOARD_SIZE; i++) {
//       result.push([i, 0]);
//       result.push([-i, 0]);
//       result.push([0, i]);
//       result.push([0, -i]);
//     }
//     return result;
//   }
// }
// // {
// //   return result;
// // }

// class BoardData {
//   constructor(pieces) {
//     this.pieces = pieces;
//   }

//   // Returns piece in row, col, or undefined if not exists.
//   getPiece(row, col) {}
// }

// function getInitialBoard() {
//   let result = [];

//   addPieces(result, 7, DARK_PLAYER);
//   addPieces(result, 0, WHITE_PLAYER);

//   for (let i = 0; i < BOARD_SIZE; i++) {
//     result.push(new piece(1, i, PAWN, WHITE_PLAYER));
//     result.push(new piece(6, i, PAWN, DARK_PLAYER));
//   }
//   return result;
// }
// function addPieces(result, row, player) {
//   result.push(new piece(row, 0, ROOK, player));
//   result.push(new piece(row, 1, KNIGHT, player));
//   result.push(new piece(row, 2, BISHOP, player));
//   result.push(new piece(row, 3, KING, player));
//   result.push(new piece(row, 4, QUEEN, player));
//   result.push(new piece(row, 5, BISHOP, player));
//   result.push(new piece(row, 6, KNIGHT, player));
//   result.push(new piece(row, 7, ROOK, player));
// }

// function addImage(cell, player, name) {
//   const img123 = document.createElement(`img`);
//   img123.src = `images/` + player + `/` + name + `.png`;
//   cell.appendChild(img123);
// }

// function onCellclick(event, row, col) {
//   console.log(row);
//   console.log(col);
//   for (let i = 0; i < BOARD_SIZE; i++) {
//     for (let j = 0; j < BOARD_SIZE; j++) {
//       table.rows[i].cells[j].classList.remove("possible-move");
//     }
//   }
//   for (let relativeMove of relativeMoves) {
//   for (let piece of pieces) {
//     if (piece.row === row && piece.col === col) {
//       console.log(piece);
//       let PossibleMoves = piece.getPossibleMoves();
//       for (let PossibleMove of PossibleMoves)
//         table.rows[PossibleMove[0]].cells[PossibleMove[1]].classList.add(
//           `possible-move`
//         );
//     }
//   }
//   if (selectedCell !== undefined) {
//     selectedCell.classList.remove(`selected`);
//   }
//   selectedCell = event.currentTarget;
//   selectedCell.classList.add(`selected`);
// }

// function createChessBoard() {
//   const head1 = document.createElement("h1");
//   head1.classList.add("head");
//   head1.textContent = "chess table!!!";
//   const Body1 = document.body;
//   Body1.appendChild(head1);
//   table = document.createElement("table");
//   table.classList.add("table1");
//   Body1.appendChild(table);
//   for (let row = 0; row < BOARD_SIZE; row++) {
//     const rowElement = table.insertRow();
//     for (let col = 0; col < BOARD_SIZE; col++) {
//       const cell = rowElement.insertCell();
//       if ((row + col) % 2 === 0) {
//         cell.className = "light-cell";
//       } else {
//         cell.className = "dark-cell";
//       }
//       cell.addEventListener(`click`, (event) => onCellclick(event, row, col));
//     }
//   }

//   pieces = getInitialBoard();
//   pieces[0].getPossibleMoves();
//   // console.log(pieces);
//   for (let piece of pieces) {
//     addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
//   }
// }
// window.addEventListener("load", createChessBoard);
