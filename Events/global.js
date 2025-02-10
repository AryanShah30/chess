import { ROOT_DIV } from "../Helper/constants.js";
import { globalState, keySquareMapper } from "../index.js";
import {
  clearHighlight,
  selfHighlight,
  globalPiece,
  clearPreviousSelfHighlight,
  globalStateRender,
  clearAllHighlightsExceptMove,
} from "../Render/main.js";
import {
  checkPieceOfOpponentOnElement,
  checkSquareCaptureId,
  giveBishopHighlightIds,
  checkWhetherPieceExistsOrNot,
  giveRookHighlightIds,
  giveKnightHighlightIds,
  giveQueenHighlightIds,
  giveKingHighlightIds,
  giveKnightCaptureIds,
  giveKingCaptureIds,
  giveBishopCaptureIds,
  giveRookCaptureIds,
  giveQueenCaptureIds,
  givePawnCaptureIds
} from "../Helper/commonHelper.js";
import { pawnPromotion } from "../Helper/modalCreator.js";

// tracks whose turn it is: "white" or "black"
let inTurn = "white";

// stores which player is in check. null if no player is in check
let whoInCheck = null;

// counts the total number of moves made so far in the game
let moveCount = 0;

// indicates whether any squares or pieces are currently highlighted for potential moves
let highlight_state = false;

// holds the currently highlighted piece (if any) that the player is focusing on
let selfHighlightState = null;

// stores the piece that the player is attempting to move. null if no move is in progress
let moveState = null;

let lastMove = null;

// used to switch turns and count number of moves made
function changeTurn() {
  if (inTurn === "black") {
    // increment number of moves after black plays
    moveCount++;
    console.log("No. of moves played: ", moveCount);
  }
  // ternary operator that switches the turn
  inTurn = inTurn === "white" ? "black" : "white";
}

// handle the logic when a player selects a piece and either highlights it or captures an opponent’s piece
function captureInTurn(square) {
  // get the piece on the current square
  const piece = square.piece;

  // if the selected piece is the same as the previously highlighted piece
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState); // clear the previous highlight
    clearHighlightLocal(); // clear any local highlights
    return; // end the function
  }

  // if the current square has a capture highlight
  if (square.captureHighlight) {
    // move the selected piece to this square
    movePiece(selfHighlightState, piece.current_position);

    clearPreviousSelfHighlight(selfHighlightState); // clear the previous highlight
    clearHighlightLocal(); // clear any local highlights
    return; // end the function
  }
  // if no capture happens, just end the function
  return;
} 

// used to check if the player's king is in "check" during their turn
function checkForCheck() {
  // get the elements representing the current positions of both kings on the board
  const whiteKingElement = document.getElementById(
    globalPiece.white_king.current_position
  );
  const blackKingElement = document.getElementById(
    globalPiece.black_king.current_position
  );

  // remove any previous check highlights on the kings
  whiteKingElement?.classList?.remove("captureColor");
  blackKingElement?.classList?.remove("captureColor");

  // check if it's black's turn
  if (inTurn === "black") {
    // get the current positions of all black pieces
    const whiteKingCurrentPosition = globalPiece.white_king.current_position;
    const knight_1 = globalPiece.black_knight_1.current_position;
    const knight_2 = globalPiece.black_knight_2.current_position;
    const bishop_1 = globalPiece.black_bishop_1.current_position;
    const bishop_2 = globalPiece.black_bishop_2.current_position;
    const rook_1 = globalPiece.black_rook_1.current_position;
    const rook_2 = globalPiece.black_rook_2.current_position;
    const king = globalPiece.black_king.current_position;
    const queen = globalPiece.black_queen.current_position;

    // create an array to store all possible squares that can capture the white king
    let finalCheckList = [];

    // check capture possibilities for all black pieces
    finalCheckList.push(giveKnightCaptureIds(knight_1, inTurn));
    finalCheckList.push(giveKnightCaptureIds(knight_2, inTurn));
    finalCheckList.push(giveKingCaptureIds(king, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_1, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_2, inTurn));
    finalCheckList.push(giveRookCaptureIds(rook_1, inTurn));
    finalCheckList.push(giveRookCaptureIds(rook_2, inTurn));
    finalCheckList.push(giveQueenCaptureIds(queen, inTurn));

    // Add black pawn attack squares
    for (let i = 1; i <= 8; i++) {
        const pawn = globalPiece[`black_pawn_${i}`];
        if (pawn?.current_position) {
          finalCheckList.push(givePawnCaptureIds(pawn.current_position, inTurn));
        }
      }
      

    // flatten the finalCheckList array into a single array
    finalCheckList = finalCheckList.flat();

    // check if the white king's current position is in the finalCheckList
    const checkOrNot = finalCheckList.find(
      (element) => element === whiteKingCurrentPosition
    );

    // if the white king is in check, update the status and highlight the white king
    if (checkOrNot) {
      // set that the white king is in check
      whoInCheck = "white";

      // highlight the white king
      whiteKingElement.classList.add("captureColor");
    }
  } else {
    // check if it's white's turn

    // get the current positions of all white pieces
    const blackKingCurrentPosition = globalPiece.black_king.current_position;
    const knight_1 = globalPiece.white_knight_1.current_position;
    const knight_2 = globalPiece.white_knight_2.current_position;
    const bishop_1 = globalPiece.white_bishop_1.current_position;
    const bishop_2 = globalPiece.white_bishop_2.current_position;
    const rook_1 = globalPiece.white_rook_1.current_position;
    const rook_2 = globalPiece.white_rook_2.current_position;
    const king = globalPiece.white_king.current_position;
    const queen = globalPiece.white_queen.current_position;

    // create an array to store all possible squares that can capture the black king
    let finalCheckList = [];

    // check capture possibilities for all white pieces
    finalCheckList.push(giveKnightCaptureIds(knight_1, inTurn));
    finalCheckList.push(giveKnightCaptureIds(knight_2, inTurn));
    finalCheckList.push(giveKingCaptureIds(king, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_1, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_2, inTurn));
    finalCheckList.push(giveRookCaptureIds(rook_1, inTurn));
    finalCheckList.push(giveRookCaptureIds(rook_2, inTurn));
    finalCheckList.push(giveQueenCaptureIds(queen, inTurn));

    // Add white pawn attack squares
    for (let i = 1; i <= 8; i++) {
        const pawn = globalPiece[`white_pawn_${i}`];
        if (pawn?.current_position) {
          finalCheckList.push(givePawnCaptureIds(pawn.current_position, inTurn));
        }
      }
      

    // flatten the finalCheckList array into a single array
    finalCheckList = finalCheckList.flat();

    // check if the black king's current position is in the finalCheckList
    const checkOrNot = finalCheckList.find(
      (element) => element === blackKingCurrentPosition
    );

    // if the black king is in check, update the status and highlight the black king
    if (checkOrNot) {
      // set that the black king is in check
      whoInCheck = "black";

      // highlight the black king
      blackKingElement.classList.add("captureColor");
    }
  }
}

// checks if a pawn has reached the promotion rank
function checkForPawnPromotion(piece, id) {
  // check if it is white's turn
  if (inTurn === "white") {
    // check if the piece is a pawn and if it is in the 8th row
    if (
      piece?.piece_name?.toLowerCase()?.includes("pawn") && // check if the piece is a pawn
      id?.includes("8") // check if the destination square is in the 8th row
    ) {
      // return true if the pawn can be promoted
      return true;
    } else {
      // return false if it's not a pawn or not in the promotion row
      return false;
    }
  } else {
    // check if it is black's turn

    // check if the piece is a pawn and if it is in the 1st row
    if (
      piece?.piece_name?.toLowerCase()?.includes("pawn") && // check if the piece is a pawn
      id?.includes("1") // check if the destination square is in the 1st row
    ) {
      // return true if the pawn can be promoted
      return true;
    } else {
      // return true if the pawn can be promoted
      return false;
    }
  }
}

// handles the process of promoting a pawn to a new piece
// and updates the piece's position, modifies the board to reflect the new piece
function callbackPawnPromotion(piece, id) {
  // get the new piece based on the square id (the promoted piece)
  const realPiece = piece(id);

  // get the current square object from the keySquareMapper using the id
  const currentSquare = keySquareMapper[id];

  // update the piece's current position to the new id (square)
  piece.current_position = id;

  // update the square's piece to the promoted piece
  currentSquare.piece = realPiece;

  // create a new image element to represent the promoted piece
  const image = document.createElement("img");

  // set the image source to the image URL of the promoted piece
  image.src = realPiece.img;

  // add a CSS class for styling or positioning of the piece image
  image.classList.add("piece");

  // get the DOM element corresponding to the square id (where the pawn is promoted)
  const currentElement = document.getElementById(id);

  // clear the current content of the square (empty the square)
  currentElement.innerHTML = "";

  // append the new image (promoted piece) to the DOM element representing the square
  currentElement.append(image);
}

// resets the board's highlighting state
// and ensures there are no active highlights left after a piece is moved or an action is completed
function clearHighlightLocal() {
  // clear all highlights
  clearHighlight();

  // reset the highlight_state to false (no squares are highlighted)
  highlight_state = false;

  // reset selfHighlightState to null (no piece is highlighted)
  selfHighlightState = null;
}

// managing the movement of chess pieces
// includes special handling for castling, pawn promotion, and regular piece movement
function movePiece(piece, id, castle) {
  // Check for en passant capture
  if (piece.piece_name.includes("PAWN") && lastMove?.enPassantTarget === id) {
    const direction = piece.piece_name.includes("WHITE") ? -1 : 1;
    const capturedSquareId = `${id[0]}${Number(id[1]) + direction}`;
    const capturedSquare = keySquareMapper[capturedSquareId];

    if (capturedSquare?.piece) {
      capturedSquare.piece = null;
      document.getElementById(capturedSquareId).innerHTML = "";
    }
  }

  // Update en passant eligibility
  if (piece.piece_name.includes("PAWN")) {
    const startRow = piece.piece_name.includes("WHITE") ? "2" : "7";
    const endRow = piece.piece_name.includes("WHITE") ? "4" : "5";

    if (piece.current_position[1] === startRow && id[1] === endRow) {
      // Set correct en passant target (square passed over)
      const direction = piece.piece_name.includes("WHITE") ? 1 : -1;
      lastMove = {
        piece,
        id,
        enPassant: true,
        enPassantTarget: `${id[0]}${Number(id[1]) - direction}`, // FIXED
      };
    } else {
      lastMove = {
        piece,
        id,
        enPassant: false,
      };
    }
  }
  // check if the pawn has been promoted
  const pawnIsPromoted = checkForPawnPromotion(piece, id);

  // check for castling for white king
  if (piece.piece_name.includes("KING") && piece.piece_name.includes("WHITE")) {
    // castling on c1 or g1
    if (id === "c1" || id === "g1") {
      let rookStartPosition;
      // set rook's starting position based on castling direction
      if (id === "c1") {
        rookStartPosition = "a1";
      } else {
        rookStartPosition = "h1";
      }

      // highlight the king and rook temporarily for castling
      setTimeout(() => {
        const kingStartElement = document.getElementById("e1");
        const rookStartElement = document.getElementById(rookStartPosition);
        kingStartElement?.classList?.add("highlightYellow");
        rookStartElement?.classList?.add("highlightYellow");
      }, 10);

      // move the rook as part of castling
      const rook = keySquareMapper[rookStartPosition];
      const rookDestination = id === "c1" ? "d1" : "f1";

      // recursive call to move the rook
      movePiece(rook.piece, rookDestination, true);
    }

    // set castling flag to true and change turn
    castle = true;
    changeTurn();
  }

  // check for castling for black king
  if (piece.piece_name.includes("KING") && piece.piece_name.includes("BLACK")) {
    // castling on c8 or g8
    if (id === "c8" || id === "g8") {
      let rookStartPosition;
      if (id === "c8") {
        rookStartPosition = "a8";
      } else {
        rookStartPosition = "h8";
      }

      // highlight the king and rook temporarily for castling
      setTimeout(() => {
        const kingStartElement = document.getElementById("e8");
        const rookStartElement = document.getElementById(rookStartPosition);
        kingStartElement?.classList?.add("highlightYellow");
        rookStartElement?.classList?.add("highlightYellow");
      }, 10);

      // move the rook as part of castling
      const rook = keySquareMapper[rookStartPosition];
      const rookDestination = id === "c8" ? "d8" : "f8";

      // recursive call to move the rook
      movePiece(rook.piece, rookDestination, true);
    }

    // set castling flag to true and change turn
    castle = true;
    changeTurn();
  }

  // flatten globalState to find the current square of the piece
  const flatData = globalState.flat();
  flatData.forEach((el) => {
    // delete the piece from the current square
    if (el.id == piece.current_position) {
      delete el.piece;
    }

    // place the piece on the new square
    if (el.id == id) {
      if (el.piece) {
        el.piece.current_position = null;
      }
      el.piece = piece;
    }
  });

  // update the visual representation of the move on the board
  const previousPiece = document.getElementById(piece.current_position);
  const currentPiece = document.getElementById(id);
  setTimeout(() => {
    if (!castle) {
      previousPiece?.classList?.add("highlightYellow");
      currentPiece?.classList?.add("highlightYellow");
    }
  }, 10);

  // clear any previous highlights
  clearHighlight();
  clearAllHighlightsExceptMove(previousPiece, currentPiece);

  // move the piece visually by updating the innerHTML of the squares
  currentPiece.innerHTML = previousPiece?.innerHTML;
  if (previousPiece) previousPiece.innerHTML = "";
  piece.current_position = id;

  // if the pawn is promoted, handle the promotion process
  if (pawnIsPromoted) {
    currentPiece?.classList?.add("highlightYellow");
    pawnPromotion(inTurn, callbackPawnPromotion, id);
  }

  // check if the move places the opponent's king in check
  checkForCheck();

  // if not a castling move, change the turn
  if (!castle) changeTurn();
}

// when player clicks on white pawn
function whitePawnClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // het the current position of the piece
  const flatArray = globalState.flat(); // het all squares on the board

  let highlightSquareIds = null;

  // if the pawn is on its starting row (row 2), allow a two-square forward move
  if (current_pos[1] == "2") {
    highlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`, // one square forward
      `${current_pos[0]}${Number(current_pos[1]) + 2}`, // two squares forward
    ];
  } else {
    highlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) + 1}`]; // one square forward
  }

  // check if the generated move squares are valid for highlighting
  highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  // highlight the valid move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  // generate diagonal squares for capture (pawn captures diagonally)
  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
    Number(current_pos[1]) + 1
  }`; // left diagonal capture position
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
    Number(current_pos[1]) + 1
  }`; // right diagonal capture position

  // list of capture positions
  let captureIds = [col1, col2];

  // check for opponent pieces at the capture positions
  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "white"); // check if there is an opponent's piece
  });

  if (
    lastMove &&
    lastMove.enPassant &&
    lastMove.piece.piece_name.includes("BLACK_PAWN")
  ) {
    const enemyPawnPos = lastMove.id;
    const currentPawnPos = piece.current_position;

    if (
      currentPawnPos[1] === "5" &&
      enemyPawnPos[1] === "5" &&
      Math.abs(currentPawnPos.charCodeAt(0) - enemyPawnPos.charCodeAt(0)) === 1
    ) {
      const enPassantCaptureId = `${enemyPawnPos[0]}6`;
      const enPassantSquare = keySquareMapper[enPassantCaptureId];

      if (enPassantSquare) {
        enPassantSquare.captureHighlight = true;
        document
          .getElementById(enPassantCaptureId)
          .classList.add("captureColor");
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on white bishop
function whiteBishopClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  let highlightSquareIds = giveBishopHighlightIds(current_pos); // get bishop's diagonal moves
  let temp = []; // temporary array to store diagonal squares

  const { bottomLeft, topLeft, bottomRight, topRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft)); // check for valid move or capture in bottom-left direction
  result.push(checkSquareCaptureId(topLeft)); // check for valid move or capture in top-left direction
  result.push(checkSquareCaptureId(bottomRight)); // check for valid move or capture in bottom-right direction
  result.push(checkSquareCaptureId(topRight)); // check for valid move or capture in top-right direction

  temp.push(bottomLeft, topLeft, bottomRight, topRight); // add diagonal squares to temporary array

  highlightSquareIds = result.flat(); // flatten the result to get the final valid squares

  // highlight the valid move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element); // check if there is a piece on the square
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break; // stop if there is a piece of the same color
      }
      if (checkPieceOfOpponentOnElement(element, "white")) {
        break; // stop if there is an opponent's piece (this square can be captured)
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on white rook
function whiteRookClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  let highlightSquareIds = giveRookHighlightIds(current_pos); // get rook's vertical and horizontal moves
  let temp = []; // temporary array to store rook's path

  const { bottom, top, right, left } = highlightSquareIds; // get the possible move directions (bottom, top, right, left)

  let result = [];
  result.push(checkSquareCaptureId(bottom)); // check for valid move or capture in the bottom direction
  result.push(checkSquareCaptureId(top)); // check for valid move or capture in the top direction
  result.push(checkSquareCaptureId(right)); // check for valid move or capture in the right direction
  result.push(checkSquareCaptureId(left)); // check for valid move or capture in the left direction

  temp.push(bottom, top, right, left); // add possible directions to the temporary array

  highlightSquareIds = result.flat(); // flatten the result to get the final valid squares

  // highlight the valid move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element); // check if there is a piece on the square
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break; // stop if there is a piece of the same color
      }
      if (checkPieceOfOpponentOnElement(element, "white")) {
        break; // stop if there is an opponent's piece (this square can be captured)
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on white knight
function whiteKnightClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  let highlightSquareIds = giveKnightHighlightIds(current_pos); // get knight's possible move squares

  // highlight the valid knight's move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares

  // check for opponent pieces on the highlighted squares that can be captured
  highlightSquareIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "white");
  });

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on white queen
function whiteQueenClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  // get the queen's possible move squares
  let highlightSquareIds = giveQueenHighlightIds(current_pos);
  let temp = [];

  // destructure the highlight square ids for all directions the queen can move
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    top,
    bottom,
    left,
    right,
  } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // store directions in temp array for further processing
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(left);
  temp.push(right);
  temp.push(bottom);
  temp.push(top);

  highlightSquareIds = result.flat(); // flatten the result

  // highlight the valid queen's move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares

  // check for opponent pieces on the highlighted squares that can be captured
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      // if the square is occupied by an ally piece, stop further checking
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break;
      }
      // check if the opponent's piece exists on the square
      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on white king
function whiteKingClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  // get the king's possible move squares
  let highlightSquareIds = giveKingHighlightIds(current_pos);
  let temp = [];

  // destructure the highlight square ids for all directions the king can move
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    top,
    bottom,
    left,
    right,
  } = highlightSquareIds;

  let result = [];

  // handle castling logic if the king hasn't moved yet and rooks are also unmoved
  if (!piece.move) {
    const rook1 = globalPiece.white_rook_1;
    const rook2 = globalPiece.white_rook_2;
    // check if the first rook can participate in castling
    if (!rook1.move) {
      const b1 = keySquareMapper["b1"];
      const c1 = keySquareMapper["c1"];
      const d1 = keySquareMapper["d1"];
      if (!b1.piece && !c1.piece && !d1.piece) {
        result.push("c1"); // add the castling move square
      }
    }
    // check if the second rook can participate in castling
    if (!rook2.move) {
      const g1 = keySquareMapper["g1"];
      const f1 = keySquareMapper["f1"];
      if (!g1.piece && !f1.piece) {
        result.push("g1"); // add the castling move square
      }
    }
  }

  // check for valid move and capture squares
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // store possible movement directions in temp array for further processing
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(left);
  temp.push(right);
  temp.push(bottom);
  temp.push(top);

  highlightSquareIds = result.flat(); // flatten the result

  // highlight the valid king's move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares

  // check for opponent pieces on the highlighted squares that can be captured
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      // if the square is occupied by an ally piece, stop further checking
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break;
      }
      // check if the opponent's piece exists on the square
      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on black pawn
function blackPawnClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  let highlightSquareIds = null;

  // if the pawn is on its starting row (row 7), allow a two-square forward move
  if (current_pos[1] == "7") {
    highlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`, // one square forward
      `${current_pos[0]}${Number(current_pos[1]) - 2}`, // two squares forward
    ];
  } else {
    highlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) - 1}`]; // one square forward
  }

  // check if the generated move squares are valid for highlighting
  highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  // highlight the valid move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  // generate diagonal squares for capture (pawn captures diagonally)
  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
    Number(current_pos[1]) - 1
  }`; // left diagonal capture position
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
    Number(current_pos[1]) - 1
  }`; // right diagonal capture position

  // list of capture positions
  let captureIds = [col1, col2];

  // check for opponent pieces at the capture positions
  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "black"); // check if there is an opponent's piece
  });

  if (
    lastMove &&
    lastMove.enPassant &&
    lastMove.piece.piece_name.includes("WHITE_PAWN")
  ) {
    const enemyPawnPos = lastMove.id;
    const currentPawnPos = piece.current_position;

    if (
      currentPawnPos[1] === "4" &&
      enemyPawnPos[1] === "4" &&
      Math.abs(currentPawnPos.charCodeAt(0) - enemyPawnPos.charCodeAt(0)) === 1
    ) {
      const enPassantCaptureId = `${enemyPawnPos[0]}3`;
      const enPassantSquare = keySquareMapper[enPassantCaptureId];

      if (enPassantSquare) {
        enPassantSquare.captureHighlight = true;
        document
          .getElementById(enPassantCaptureId)
          .classList.add("captureColor");
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on black bishop
function blackBishopClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  let highlightSquareIds = giveBishopHighlightIds(current_pos); // get bishop's diagonal moves
  let temp = []; // temporary array to store diagonal squares

  const { bottomLeft, topLeft, bottomRight, topRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft)); // check for valid move or capture in bottom-left direction
  result.push(checkSquareCaptureId(topLeft)); // check for valid move or capture in top-left direction
  result.push(checkSquareCaptureId(bottomRight)); // check for valid move or capture in bottom-right direction
  result.push(checkSquareCaptureId(topRight)); // check for valid move or capture in top-right direction

  temp.push(bottomLeft, topLeft, bottomRight, topRight); // add diagonal squares to temporary array

  highlightSquareIds = result.flat(); // flatten the result to get the final valid squares

  // highlight the valid move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element); // check if there is a piece on the square
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break; // stop if there is a piece of the same color
      }
      if (checkPieceOfOpponentOnElement(element, "black")) {
        break; // stop if there is an opponent's piece (this square can be captured)
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on black rook
function blackRookClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  let highlightSquareIds = giveRookHighlightIds(current_pos); // get rook's vertical and horizontal moves
  let temp = []; // temporary array to store rook's path

  const { bottom, top, right, left } = highlightSquareIds; // get the possible move directions (bottom, top, right, left)

  let result = [];
  result.push(checkSquareCaptureId(bottom)); // check for valid move or capture in the bottom direction
  result.push(checkSquareCaptureId(top)); // check for valid move or capture in the top direction
  result.push(checkSquareCaptureId(right)); // check for valid move or capture in the right direction
  result.push(checkSquareCaptureId(left)); // check for valid move or capture in the left direction

  temp.push(bottom, top, right, left); // add possible directions to the temporary array

  highlightSquareIds = result.flat(); // flatten the result to get the final valid squares

  // highlight the valid move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element); // check if there is a piece on the square
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break; // stop if there is a piece of the same color
      }
      if (checkPieceOfOpponentOnElement(element, "black")) {
        break; // stop if there is an opponent's piece (this square can be captured)
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on black knight
function blackKnightClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  let highlightSquareIds = giveKnightHighlightIds(current_pos); // get knight's possible move squares

  // highlight the valid knight's move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares

  // check for opponent pieces on the highlighted squares that can be captured
  highlightSquareIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "black");
  });

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on black queen
function blackQueenClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  // get the queen's possible move squares
  let highlightSquareIds = giveQueenHighlightIds(current_pos);
  let temp = [];

  // destructure the highlight square ids for all directions the queen can move
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    top,
    bottom,
    left,
    right,
  } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // store directions in temp array for further processing
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(left);
  temp.push(right);
  temp.push(bottom);
  temp.push(top);

  highlightSquareIds = result.flat(); // flatten the result

  // highlight the valid queen's move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares

  // check for opponent pieces on the highlighted squares that can be captured
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      // if the square is occupied by an ally piece, stop further checking
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }
      // check if the opponent's piece exists on the square
      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// when player clicks on black king
function blackKingClick(square) {
  const piece = square.piece; // get the piece on the clicked square

  // if the clicked square contains the currently highlighted piece, clear the highlight and exit
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // if the clicked square is a capture square, move the piece and clear highlights
  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear previous highlights if any, and set the new piece as the highlighted piece
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece); // highlight the selected piece
  highlight_state = true; // set highlight state to true
  selfHighlightState = piece; // set the selected piece as the highlighted piece
  moveState = piece; // store the selected piece as the piece to be moved

  const current_pos = piece.current_position; // get the current position of the piece
  const flatArray = globalState.flat(); // get all squares on the board

  // get the king's possible move squares
  let highlightSquareIds = giveKingHighlightIds(current_pos);
  let temp = [];

  // destructure the highlight square ids for all directions the king can move
  const {
    bottomLeft,
    topLeft,
    bottomRight,
    topRight,
    top,
    bottom,
    left,
    right,
  } = highlightSquareIds;

  let result = [];

  // handle castling logic if the king hasn't moved yet and rooks are also unmoved
  if (!piece.move) {
    const rook1 = globalPiece.black_rook_1;
    const rook2 = globalPiece.black_rook_2;
    // check if the first rook can participate in castling
    if (!rook1.move) {
      const b8 = keySquareMapper["b8"];
      const c8 = keySquareMapper["c8"];
      const d8 = keySquareMapper["d8"];
      if (!b8.piece && !c8.piece && !d8.piece) {
        result.push("c8"); // add the castling move square
      }
    }
    // check if the second rook can participate in castling
    if (!rook2.move) {
      const g8 = keySquareMapper["g8"];
      const f8 = keySquareMapper["f8"];
      if (!g8.piece && !f8.piece) {
        result.push("g8"); // add the castling move square
      }
    }
  }

  // check for valid move and capture squares
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  // store possible movement directions in temp array for further processing
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(left);
  temp.push(right);
  temp.push(bottom);
  temp.push(top);

  highlightSquareIds = result.flat(); // flatten the result

  // highlight the valid king's move squares
  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = []; // array to store potential capture squares

  // check for opponent pieces on the highlighted squares that can be captured
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      // if the square is occupied by an ally piece, stop further checking
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }
      // check if the opponent's piece exists on the square
      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender(); // update the board state and re-render the board
}

// listens for clicks on the chessboard and handles the logic for piece selection, movement,
// and capturing based on the turn and the clicked square.
function globalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    // check if the clicked element is an image (piece on the board)
    if (event.target.localName == "img") {
      const clickId = event.target.parentNode.id; // get the id of the square
      const square = keySquareMapper[clickId]; // map the id to the actual square object

      // if it's the opponent's piece and it's the opponent's turn, capture it
      if (
        (square.piece.piece_name.includes("WHITE") && inTurn === "black") ||
        (square.piece.piece_name.includes("BLACK") && inTurn === "white")
      ) {
        captureInTurn(square); // function to handle piece capture
        return;
      }

      // depending on the piece type, call the respective click handling function
      if (square.piece.piece_name == "WHITE_PAWN") {
        if (inTurn == "white") whitePawnClick(square); // handle white pawn move
      } else if (square.piece.piece_name == "BLACK_PAWN") {
        if (inTurn == "black") blackPawnClick(square); // handle black pawn move
      } else if (square.piece.piece_name == "WHITE_BISHOP") {
        if (inTurn == "white") whiteBishopClick(square); // handle white bishop move
      } else if (square.piece.piece_name == "BLACK_BISHOP") {
        if (inTurn == "black") blackBishopClick(square); // handle black bishop move
      } else if (square.piece.piece_name == "WHITE_ROOK") {
        if (inTurn == "white") whiteRookClick(square); // handle white rook move
      } else if (square.piece.piece_name == "BLACK_ROOK") {
        if (inTurn == "black") blackRookClick(square); // handle black rook move
      } else if (square.piece.piece_name == "WHITE_KNIGHT") {
        if (inTurn == "white") whiteKnightClick(square); // handle white knight move
      } else if (square.piece.piece_name == "BLACK_KNIGHT") {
        if (inTurn == "black") blackKnightClick(square); // handle black knight move
      } else if (square.piece.piece_name == "WHITE_QUEEN") {
        if (inTurn == "white") whiteQueenClick(square); // handle white queen move
      } else if (square.piece.piece_name == "BLACK_QUEEN") {
        if (inTurn == "black") blackQueenClick(square); // handle black queen move
      } else if (square.piece.piece_name == "WHITE_KING") {
        if (inTurn == "white") whiteKingClick(square); // handle white king move
      } else if (square.piece.piece_name == "BLACK_KING") {
        if (inTurn == "black") blackKingClick(square); // handle black king move
      }
    } else {
      // if clicked on a non-image element (square without a piece)
      selfHighlightState = null; // reset any previous self-highlight
      highlight_state = false; // reset highlight state
      const targetElement = event.target;
      const isCaptureSquare = targetElement.classList.contains("captureColor");
      const id = targetElement.id || targetElement.parentNode.id;

      if (isCaptureSquare) {
        if (moveState) {
          movePiece(moveState, id);
          moveState = null;
        }
        clearHighlightLocal();
        return;
      }
      // get the child nodes of the clicked element
      const childElementsOfClickedEl = Array.from(event.target.childNodes);

      // if the clicked element contains only one child or is a span (indicating a potential move target)
      if (
        childElementsOfClickedEl.length == 1 ||
        event.target.localName == "span"
      ) {
        // if it's a span, handle the move
        if (event.target.localName == "span") {
          const id = event.target.parentNode.id; // get the id of the square to move to
          movePiece(moveState, id); // move the piece to the new square
          moveState = null; // reset the move state
        } else {
          const id = event.target.id; // get the id of the square to move to
          movePiece(moveState, id); // move the piece to the new square
          moveState = null; // reset the move state
        }
        clearHighlightLocal(); // clear any highlights on the board
        clearPreviousSelfHighlight(selfHighlightState); // clear previous self-highlight
        selfHighlightState = null; // reset the self-highlight state
      } else {
        // if clicked on an area without a valid move target, clear all highlights
        clearHighlightLocal();
        clearPreviousSelfHighlight(selfHighlightState);
      }
    }
  });
}

export { globalEvent };
