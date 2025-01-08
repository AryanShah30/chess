// defines the structure of a chessboard
// initializes the chessboard with alternating white and black squares

// defines a single square on the chessboard
function Square(color, id, piece) {
  return {
    color, // color of square
    id, // coordinate of square
    piece, // holds the chess piece (if any) on square
  };
}

// creates a row of 8 squares, alternating colors based on the row number
function SquareRow(rowId) {
  // squareRow array holds the squares in a row
  const squareRow = [];

  // represents the columns of chessboard
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];

  // for even rows, squares alternate starting with white
  if (rowId % 2 == 0) {
    alphabet.forEach((element, index) => {
      if (index % 2 == 0) {
        squareRow.push(Square("white", element + rowId, null));
      } else {
        squareRow.push(Square("black", element + rowId, null));
      }
    });
  }

  // for odd rows, squares alternate starting with black
  else {
    alphabet.forEach((element, index) => {
      if (index % 2 == 0) {
        squareRow.push(Square("black", element + rowId, null));
      } else {
        squareRow.push(Square("white", element + rowId, null));
      }
    });
  }

  return squareRow;
}

// initializes the entire chessboard as an 8x8 grid of squares
function initGame() {
  // calls SquareRow function for each row from top to bottom
  return [
    SquareRow(8),
    SquareRow(7),
    SquareRow(6),
    SquareRow(5),
    SquareRow(4),
    SquareRow(3),
    SquareRow(2),
    SquareRow(1),
  ];
}

export { initGame };
