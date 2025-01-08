// for rendering the chessboard, handling piece placements, highlighting squares
// and dynamically updating the game state

import * as piece from "../Data/pieces.js";
import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";

// store references to the chess pieces placed on the board
const globalPiece = new Object();

// handles highlighting squares based on 'highlight' property in globalState
function globalStateRender() {
  globalState.forEach((row) => {
    row.forEach((element) => {
      // checks if the square has a 'highlight' property (truthy value)
      if (element.highlight) {
        // creates a new 'span' element to represent the highlight
        const highlightSpan = document.createElement("span");

        // adds the 'highlight' class to the 'span' to apply CSS styling for highlight
        highlightSpan.classList.add("highlight");

        // appends the 'span' element (highlight) to the square's DOM element
        document.getElementById(element.id).appendChild(highlightSpan);
      }

      // if 'highlight' is null then remove any existing highlights (span) from the square
      else if (element.highlight === null) {
        const el = document.getElementById(element.id);
        const highlights = Array.from(el.getElementsByTagName("span"));

        // loops through all child 'span' elements and removes them (clear highlight)
        highlights.forEach((element) => {
          el.removeChild(element);
        });
      }
    });
  });
}

// add highlight to the square of currently selected piece
function selfHighlight(piece) {
  // finds the square on the board and adds the 'hY' class, for visually highlighting
  document
    .getElementById(piece.current_position)
    .classList.add("highlightYellow");
}

// remove the highlight from the previously selected piece's square
function clearPreviousSelfHighlight(piece) {
  if (piece) {
    // if a piece is defined, find its square and remove the 'hY' class
    document
      .getElementById(piece.current_position)
      .classList.remove("highlightYellow");
  }
}

// clears all highlights from the squares, except for the ones related to the move
function clearAllHighlightsExceptMove(previousPiece, currentPiece) {
  // selects all squares with the class 'hY'
  const highlightedElements = document.querySelectorAll(".highlightYellow");

  // loops over all squares and removes the highlight from any square that isn't previous or current piece
  highlightedElements.forEach((element) => {
    if (element !== previousPiece && element !== currentPiece) {
      element.classList.remove("highlightYellow");
    }
  });
}

// renders the chess piece (as images) on their respective squares based on the 'piece' property of each square
function pieceRender(data) {
  // loops through chessboard, checking each square to see if it contains a piece
  data.forEach((row) => {
    row.forEach((square) => {
      if (square.piece) {
        // obtains the square id where piece is to be placed
        const squareEl = document.getElementById(square.id);

        // creates an <img> element for the piece
        const piece = document.createElement("img");

        // sets the src attribute of the image to the piece's image URL
        piece.src = square.piece.img;

        // adds a CSS class for the piece
        piece.classList.add("piece");

        // appends the image to the square, visually displaying the piece on the board
        squareEl.appendChild(piece);
      }
    });
  });
}

// initializes the game board by creating HTML elements for the squares and rendering the pieces
function initGameRender(data) {
  // loops through each row of the board and creates a <div> for each square (squareDiv)
  data.forEach((element) => {
    const rowEl = document.createElement("div");

    // loops through each square and handles piece placement
    element.forEach((square) => {
      const squareDiv = document.createElement("div");

      // assigns the square's id and CSS class based on its color
      squareDiv.id = square.id;
      squareDiv.classList.add(square.color, "square");

      // pieces are placed on their starting position

      if (square.id[1] == 7) {
        square.piece = piece.blackPawn(square.id);
        globalPiece.black_pawn = square.piece;
      }

      if (square.id == "h8" || square.id == "a8") {
        square.piece = piece.blackRook(square.id);
        if (globalPiece.black_rook_1) {
          globalPiece.black_rook_2 = square.piece;
        } else {
          globalPiece.black_rook_1 = square.piece;
        }
      }

      if (square.id == "b8" || square.id == "g8") {
        square.piece = piece.blackKnight(square.id);
        if (globalPiece.black_knight_1) {
          globalPiece.black_knight_2 = square.piece;
        } else {
          globalPiece.black_knight_1 = square.piece;
        }
      }

      if (square.id == "c8" || square.id == "f8") {
        square.piece = piece.blackBishop(square.id);
        if (globalPiece.black_bishop_1) {
          globalPiece.black_bishop_2 = square.piece;
        } else {
          globalPiece.black_bishop_1 = square.piece;
        }
      }

      if (square.id == "d8") {
        square.piece = piece.blackQueen(square.id);
        globalPiece.black_queen = square.piece;
      }

      if (square.id == "e8") {
        square.piece = piece.blackKing(square.id);
        globalPiece.black_king = square.piece;
      }

      if (square.id[1] == 2) {
        square.piece = piece.whitePawn(square.id);
        globalPiece.white_pawn = square.piece;
      }

      if (square.id == "h1" || square.id == "a1") {
        square.piece = piece.whiteRook(square.id);
        if (globalPiece.white_rook_1) {
          globalPiece.white_rook_2 = square.piece;
        } else {
          globalPiece.white_rook_1 = square.piece;
        }
      }

      if (square.id == "b1" || square.id == "g1") {
        square.piece = piece.whiteKnight(square.id);
        if (globalPiece.white_knight_1) {
          globalPiece.white_knight_2 = square.piece;
        } else {
          globalPiece.white_knight_1 = square.piece;
        }
      }

      if (square.id == "c1" || square.id == "f1") {
        square.piece = piece.whiteBishop(square.id);
        if (globalPiece.white_bishop_1) {
          globalPiece.white_bishop_2 = square.piece;
        } else {
          globalPiece.white_bishop_1 = square.piece;
        }
      }

      if (square.id == "d1") {
        square.piece = piece.whiteQueen(square.id);
        globalPiece.white_queen = square.piece;
      }

      if (square.id == "e1") {
        square.piece = piece.whiteKing(square.id);
        globalPiece.white_king = square.piece;
      }

      // appends the square element to the row
      rowEl.appendChild(squareDiv);
    });

    // appends the row to the main chessboard container (ROOT_DIV)
    rowEl.classList.add("squareRow");
    ROOT_DIV.appendChild(rowEl);
  });

  // calls 'pieceRender' function to render the pieces on the board
  pieceRender(data);
}

// highlights a specific square by adding a <span> with the class highlight to it
function renderHighlight(squareId) {
  const highlightSpan = document.createElement("span");
  highlightSpan.classList.add("highlight");
  document.getElementById(squareId).appendChild(highlightSpan);
}

// clears any existing highlights (including capture highlights) on the board and updates the globalStateRender
function clearHighlight() {
  const flatData = globalState.flat();

  // loops over each square and checks if it has a captureHighlight or highlight property
  flatData.forEach((el) => {
    // removes the 'captureColor' class from the square and resets the 'captureHighlight' property
    if (el.captureHighlight) {
      document.getElementById(el.id).classList.remove("captureColor");
      el.captureHighlight = false;
    }

    // resets any highlight properties on the squares
    if (el.highlight) {
      el.highlight = null;
    }

    // updates the board state
    globalStateRender();
  });
}

export {
  initGameRender,
  renderHighlight,
  clearHighlight,
  selfHighlight,
  clearPreviousSelfHighlight,
  globalStateRender,
  globalPiece,
  clearAllHighlightsExceptMove,
};
