// defines a pawn promotion modal
// allows a player to promote a pawn to another piece when it reaches the opposite end of the board

import {
  blackBishop,
  blackKnight,
  blackRook,
  blackQueen,
  whiteQueen,
  whiteRook,
  whiteKnight,
  whiteBishop,
} from "../Data/pieces.js";

// manages a modal dialog (pop up window)
class ModalCreator {
  constructor(body) {
    // if no body provided, error thrown
    if (!body) {
      throw new Error("Please pass the body");
    }

    // keeps a track of whether the modal is open or not
    this.open = false;

    // the HTML content of the modal
    this.body = body;
  }

  // displays the modal and adds a blur effect to the chessboard
  show() {
    this.open = true;

    // adds the modal body to the document
    document.body.appendChild(this.body);

    // adds blur to the root element (the chessboard)
    document.getElementById("root").classList.add("blur");
  }

  // hides the modal and removes the blur effect
  hide() {
    this.open = false;

    // removes the modal body to the document
    document.body.removeChild(this.body);

    // removes blur to the root element (the chessboard)
    document.getElementById("root").classList.remove("blur");
  }
}

// pawn promotion modal that allows the player to choose a piece to promote the pawn to
function pawnPromotion(color, callback, id) {
  // create image elements for each piece choice
  const rook = document.createElement("img");
  rook.onclick = rookCallback;
  rook.src = `../Assets/images/pieces/${color}/rook.png`;

  const knight = document.createElement("img");
  knight.onclick = knightCallback;
  knight.src = `../Assets/images/pieces/${color}/knight.png`;

  const bishop = document.createElement("img");
  bishop.onclick = bishopCallback;
  bishop.src = `../Assets/images/pieces/${color}/bishop.png`;

  const queen = document.createElement("img");
  queen.onclick = queenCallback;
  queen.src = `../Assets/images/pieces/${color}/queen.png`;

  // container for all the piece options
  const imageContainer = document.createElement("div");
  imageContainer.appendChild(rook);
  imageContainer.appendChild(knight);
  imageContainer.appendChild(bishop);
  imageContainer.appendChild(queen);

  // final modal container
  const finalContainer = document.createElement("div");
  finalContainer.appendChild(imageContainer);
  finalContainer.classList.add("modal");

  // create and show the modal
  const modal = new ModalCreator(finalContainer);
  modal.show();

  // callback functions for each piece
  // promote to a piece and close the modal after selection

  function rookCallback() {
    if (color == "white") {
      callback(whiteRook, id);
    } else {
      callback(blackRook, id);
    }
    modal.hide();
  }

  function knightCallback() {
    if (color == "white") {
      callback(whiteKnight, id);
    } else {
      callback(blackKnight, id);
    }
    modal.hide();
  }

  function bishopCallback() {
    if (color == "white") {
      callback(whiteBishop, id);
    } else {
      callback(blackBishop, id);
    }
    modal.hide();
  }

  function queenCallback() {
    if (color == "white") {
      callback(whiteQueen, id);
    } else {
      callback(blackQueen, id);
    }
    modal.hide();
  }
}

export { pawnPromotion };
