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
let boardData;
let table;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getPossibleMoves() {
    // Get relative moves
    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    } else {
      console.log("Unknown type", type);
    }
    console.log("relativeMoves", relativeMoves);

    // Get absolute moves
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }
    console.log("absoluteMoves", absoluteMoves);

    // Get filtered absolute moves
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
    let result = [];
    //which pawn is selected (white/dark)
    if (this.player === DARK_PLAYER) {
      result.push([-1, 0]);
    } else if (this.player === WHITE_PLAYER) {
      {
        result.push([1, 0]);
      }
    }
    return result;
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
  getKnightRelativeMoves() {
    let result = [];
    result.push([1, -2]);
    result.push([2, -1]);
    result.push([2, 1]);
    result.push([1, 2]);
    result.push([-1, 2]);
    result.push([-2, 1]);
    result.push([-2, -1]);
    result.push([-1, -2]);

    return result;
  }
  getKingRelativeMoves() {
    let result = [];
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (!(row === 0 && col === 0)) {
          result.push([row, col]);
        }
      }
    }
    return result;
  }
  getBishopRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, i]);
      result.push([-i, -i]);
      result.push([i, -i]);
      result.push([-i, i]);
    }
    return result;
  }
  getQueenRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, i]);
      result.push([-i, -i]);
      result.push([i, -i]);
      result.push([-i, i]);
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
}
// let guy123 = new Piece(`row`, 7, ROOK, DARK_PLAYER);
// console.log(guy123);

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {}
}

function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, DARK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, DARK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
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
  console.log("row", row);
  console.log("col", col);
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
    }
  }
  const piece = boardData.getPiece(row, col);
  console.log(piece);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves();
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("possible-move");
    }
  } else {
    console.log("undefined");
  }
  // Show possible moves
  for (let piece of pieces) {
    if (piece.row === row && piece.col === col) {
      // console.log(piece);
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves) {
        const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
        if (cell !== undefined) {
          cell.classList.add("possible-move");
        } else if (cell === undefined) {
          cell.classList.add("hi");
        }
      }
    }
  }

  // Clear previously selected cell
  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }

  // Show selected cell
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
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }

  boardData = new BoardData(getInitialPieces());
  console.log(boardData);
  pieces = getInitialPieces();
  console.log(pieces);

  // Add pieces images to board
  for (let piece of pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

window.addEventListener("load", createChessBoard);
// this.board = new Array();

// for (let i = 0; i < this.boardSize; i++) {
//   this.board[i] = new Array();
//   for (let j = 0; j < this.boardSize; j++) {
//     this.board[i][j] = SquareState.EMPTY;
//   }
// }
// Create list of pieces (32 total)

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

//   addFirstRowPieces(result, 7, DARK_PLAYER);
//   addFirstRowPieces(result, 0, WHITE_PLAYER);

//   for (let i = 0; i < BOARD_SIZE; i++) {
//     result.push(new piece(1, i, PAWN, WHITE_PLAYER));
//     result.push(new piece(6, i, PAWN, DARK_PLAYER));
//   }
//   return result;
// }
// function addFirstRowPieces(result, row, player) {
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
