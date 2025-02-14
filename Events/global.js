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
  givePawnCaptureIds,
  isMoveLegal,
} from "../Helper/commonHelper.js";
import { pawnPromotion } from "../Helper/modalCreator.js";
import { createNotificationModal } from "../Helper/notifications.js";

function getAllLegalMoves(color) {
  let legalMoves = [];

  Object.values(globalPiece).forEach((piece) => {
    if (!piece || !piece.piece_name) return;
    if (!piece.piece_name.toLowerCase().includes(color)) return;

    const pos = piece.current_position;
    if (!pos) return;

    let possibleMoves = [];

    if (piece.piece_name.includes("PAWN")) {
      const direction = color === "white" ? 1 : -1;
      const startRow = color === "white" ? "2" : "7";
      const oneStep = `${pos[0]}${parseInt(pos[1]) + direction}`;

      if (!keySquareMapper[oneStep].piece) {
        possibleMoves.push(oneStep);
        if (pos[1] === startRow) {
          const twoStep = `${pos[0]}${parseInt(pos[1]) + 2 * direction}`;
          if (!keySquareMapper[twoStep].piece) {
            possibleMoves.push(twoStep);
          }
        }
      }

      const captures = givePawnCaptureIds(pos, color);
      captures.forEach((captureSquare) => {
        const targetSquare = keySquareMapper[captureSquare];
        if (
          targetSquare?.piece?.piece_name
            .toLowerCase()
            .includes(color === "white" ? "black" : "white")
        ) {
          possibleMoves.push(captureSquare);
        }
      });
    } else if (piece.piece_name.includes("KNIGHT")) {
      possibleMoves = giveKnightHighlightIds(pos, color);
    } else if (piece.piece_name.includes("BISHOP")) {
      const directions = giveBishopHighlightIds(pos);
      for (const direction of Object.values(directions)) {
        for (const square of direction) {
          const targetSquare = keySquareMapper[square];
          if (!targetSquare.piece) {
            possibleMoves.push(square);
          } else {
            if (
              targetSquare.piece.piece_name
                .toLowerCase()
                .includes(color === "white" ? "black" : "white")
            ) {
              possibleMoves.push(square);
            }
            break;
          }
        }
      }
    } else if (piece.piece_name.includes("ROOK")) {
      const directions = giveRookHighlightIds(pos);
      for (const direction of Object.values(directions)) {
        for (const square of direction) {
          const targetSquare = keySquareMapper[square];
          if (!targetSquare.piece) {
            possibleMoves.push(square);
          } else {
            if (
              targetSquare.piece.piece_name
                .toLowerCase()
                .includes(color === "white" ? "black" : "white")
            ) {
              possibleMoves.push(square);
            }
            break;
          }
        }
      }
    } else if (piece.piece_name.includes("QUEEN")) {
      const directions = giveQueenHighlightIds(pos);
      for (const direction of Object.values(directions)) {
        for (const square of direction) {
          const targetSquare = keySquareMapper[square];
          if (!targetSquare.piece) {
            possibleMoves.push(square);
          } else {
            if (
              targetSquare.piece.piece_name
                .toLowerCase()
                .includes(color === "white" ? "black" : "white")
            ) {
              possibleMoves.push(square);
            }
            break;
          }
        }
      }
    } else if (piece.piece_name.includes("KING")) {
      possibleMoves = Object.values(giveKingHighlightIds(pos)).flat();
    }

    possibleMoves = possibleMoves.filter((move) => {
      if (move && isMoveLegal(piece, move, color)) {
        return true;
      }
      return false;
    });

    possibleMoves.forEach((move) => {
      if (move) {
        legalMoves.push(`${piece.piece_name} from ${pos} to ${move}`);
      }
    });
  });

  return legalMoves;
}

let inTurn = "white";
let whoInCheck = null;
let moveCount = 0;
let highlight_state = false;
let selfHighlightState = null;
let moveState = null;
let lastMove = null;
let lastMoveSquares = {
  from: null,
  to: null,
};
let promotedPieces = [];
let halfMoveCount = 0;

function changeTurn() {
  if (inTurn === "black") {
    moveCount++;
  }

  inTurn = inTurn === "white" ? "black" : "white";
  getAllLegalMoves(inTurn);
}

function captureInTurn(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  return;
}

function checkForCheck() {
  document.querySelectorAll(".captureColor").forEach((el) => {
    el.classList.remove("captureColor");
  });
  whoInCheck = null;

  const currentPlayerColor = inTurn;
  const opponentKingPosition =
    currentPlayerColor === "white"
      ? globalPiece.black_king.current_position
      : globalPiece.white_king.current_position;

  let attackedSquares = [];

  Object.values(globalPiece).forEach((piece) => {
    if (!piece || !piece.piece_name) return;

    if (!piece.piece_name.toLowerCase().includes(currentPlayerColor)) return;

    const pos = piece.current_position;
    let squares = [];

    if (piece.piece_name.includes("PAWN")) {
      squares = givePawnCaptureIds(pos, currentPlayerColor);
    } else if (piece.piece_name.includes("BISHOP")) {
      squares = giveBishopCaptureIds(pos, currentPlayerColor);
    } else if (piece.piece_name.includes("KNIGHT")) {
      squares = giveKnightCaptureIds(pos, currentPlayerColor);
    } else if (piece.piece_name.includes("ROOK")) {
      squares = giveRookCaptureIds(pos, currentPlayerColor);
    } else if (piece.piece_name.includes("QUEEN")) {
      squares = giveQueenCaptureIds(pos, currentPlayerColor);
    } else if (piece.piece_name.includes("KING")) {
      squares = giveKingCaptureIds(pos, currentPlayerColor);
    }

    const validCaptures = squares.filter((squareId) => {
      const targetSquare = keySquareMapper[squareId];
      return (
        targetSquare &&
        targetSquare.piece &&
        targetSquare.piece.piece_name
          .toLowerCase()
          .includes(currentPlayerColor === "white" ? "black" : "white")
      );
    });

    if (validCaptures.length > 0) {
      attackedSquares.push(...validCaptures);
    }
  });

  if (attackedSquares.includes(opponentKingPosition)) {
    document.getElementById(opponentKingPosition).classList.add("captureColor");
    whoInCheck = currentPlayerColor === "white" ? "black" : "white";

    const blockingSquares = getBlockingSquares(opponentKingPosition);
    checkLegalMovesInCheck(blockingSquares);

    const legalMoves = getAllLegalMoves(whoInCheck);
    if (legalMoves.length === 0) {
      createNotificationModal(`Checkmate! ${currentPlayerColor === 'white' ? 'White' : 'Black'} wins!`, true);
    } else {
      createNotificationModal(`Check! ${whoInCheck === 'white' ? 'White' : 'Black'}'s king is under attack!`);
    }
  } else {
    const legalMoves = getAllLegalMoves(
      currentPlayerColor === "white" ? "black" : "white"
    );
    if (legalMoves.length === 0) {
      createNotificationModal("Stalemate! The game is a draw.", true);
    }
  }
}

function getBlockingSquares(kingPosition) {
  const attackingPiece = Object.values(globalPiece).find((piece) => {
    if (!piece || !piece.piece_name) return false;
    if (piece.piece_name.toLowerCase().includes(whoInCheck)) return false;

    let attackSquares = [];
    if (piece.piece_name.includes("BISHOP")) {
      attackSquares = giveBishopCaptureIds(piece.current_position, inTurn);
    } else if (piece.piece_name.includes("ROOK")) {
      attackSquares = giveRookCaptureIds(piece.current_position, inTurn);
    } else if (piece.piece_name.includes("QUEEN")) {
      attackSquares = giveQueenCaptureIds(piece.current_position, inTurn);
    } else if (piece.piece_name.includes("PAWN")) {
      attackSquares = givePawnCaptureIds(piece.current_position, inTurn);
    } else if (piece.piece_name.includes("KNIGHT")) {
      attackSquares = giveKnightCaptureIds(piece.current_position, inTurn);
    }

    return attackSquares.includes(kingPosition);
  });

  if (!attackingPiece) return [];

  const squares = [attackingPiece.current_position];

  if (attackingPiece.piece_name.includes("KNIGHT")) {
    return squares;
  }

  const [startFile, startRank] = attackingPiece.current_position.split("");
  const [endFile, endRank] = kingPosition.split("");

  if (
    Math.abs(startFile.charCodeAt(0) - endFile.charCodeAt(0)) ===
    Math.abs(parseInt(startRank) - parseInt(endRank))
  ) {
    const fileStep = startFile < endFile ? 1 : -1;
    const rankStep = startRank < endRank ? 1 : -1;
    let file = startFile.charCodeAt(0) + fileStep;
    let rank = parseInt(startRank) + rankStep;

    while (
      String.fromCharCode(file) !== endFile &&
      rank !== parseInt(endRank)
    ) {
      squares.push(String.fromCharCode(file) + rank);
      file += fileStep;
      rank += rankStep;
    }
  }

  return squares;
}

function checkLegalMovesInCheck(blockingSquares) {
  let legalMoves = [];
  legalMoves = getAllLegalMoves(whoInCheck);

  if (legalMoves.length === 0) {
    createNotificationModal(`Checkmate! ${inTurn === 'white' ? 'White' : 'Black'} wins!`, true);
  }
}

function checkForPawnPromotion(piece, id) {
  if (inTurn === "white") {
    if (
      piece?.piece_name?.toLowerCase()?.includes("pawn") &&
      id?.includes("8")
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      piece?.piece_name?.toLowerCase()?.includes("pawn") &&
      id?.includes("1")
    ) {
      return true;
    } else {
      return false;
    }
  }
}

function callbackPawnPromotion(piece, id) {
  const realPiece = piece(id);
  const currentSquare = keySquareMapper[id];
  const oldPiece = currentSquare.piece;

  realPiece.current_position = id;
  currentSquare.piece = realPiece;

  if (oldPiece) {
    Object.keys(globalPiece).forEach((key) => {
      if (globalPiece[key] === oldPiece) {
        globalPiece[key] = realPiece;
      }
    });
  }

  const currentElement = document.getElementById(id);
  const image = document.createElement("img");
  image.src = realPiece.img;
  image.classList.add("piece");
  currentElement.innerHTML = "";
  currentElement.append(image);

  checkForCheck();
  changeTurn();

  if (checkForDraw()) {
    return;
  }
}

function clearHighlightLocal() {
  clearHighlight();
  highlight_state = false;
  selfHighlightState = null;

  document.querySelectorAll(".highlightYellow").forEach((el) => {
    if (el.id !== lastMoveSquares.from && el.id !== lastMoveSquares.to) {
      el.classList.remove("highlightYellow");
    }
  });
}

function isSquareUnderAttack(squareId, color) {
  const opponentColor = color === "white" ? "black" : "white";
  let attackingSquares = [];

  Object.values(globalPiece).forEach((piece) => {
    if (!piece || !piece.piece_name || !piece.current_position) return;
    if (!piece.piece_name.toLowerCase().includes(opponentColor)) return;

    const pos = piece.current_position;

    if (piece.piece_name.includes("PAWN")) {
      attackingSquares.push(...givePawnCaptureIds(pos, opponentColor));
    } else if (piece.piece_name.includes("KNIGHT")) {
      attackingSquares.push(...giveKnightHighlightIds(pos));
    } else if (piece.piece_name.includes("BISHOP")) {
      const directions = giveBishopHighlightIds(pos);
      for (const direction of Object.values(directions)) {
        for (const square of direction) {
          attackingSquares.push(square);
          if (keySquareMapper[square].piece) break;
        }
      }
    } else if (piece.piece_name.includes("ROOK")) {
      const directions = giveRookHighlightIds(pos);
      for (const direction of Object.values(directions)) {
        for (const square of direction) {
          attackingSquares.push(square);
          if (keySquareMapper[square].piece) break;
        }
      }
    } else if (piece.piece_name.includes("QUEEN")) {
      const directions = giveQueenHighlightIds(pos);
      for (const direction of Object.values(directions)) {
        for (const square of direction) {
          attackingSquares.push(square);
          if (keySquareMapper[square].piece) break;
        }
      }
    } else if (piece.piece_name.includes("KING")) {
      const kingMoves = giveKingHighlightIds(pos);
      attackingSquares.push(...Object.values(kingMoves).flat());
    }
  });

  return attackingSquares.includes(squareId);
}

function isCastlingLegal(king, targetSquare) {
  const color = king.piece_name.toLowerCase().includes("white")
    ? "white"
    : "black";
  const rank = color === "white" ? "1" : "8";
  const kingStartPos = `e${rank}`;

  if (king.hasMoved || king.current_position !== kingStartPos) {
    return false;
  }

  const isKingside = targetSquare === `g${rank}`;
  const rookStartPos = isKingside ? `h${rank}` : `a${rank}`;
  const rook = keySquareMapper[rookStartPos]?.piece;

  if (!rook || rook.hasMoved) {
    return false;
  }

  const betweenSquares = isKingside
    ? [`f${rank}`, `g${rank}`]
    : [`b${rank}`, `c${rank}`, `d${rank}`];

  for (let square of betweenSquares) {
    if (keySquareMapper[square].piece) {
      return false;
    }
  }

  if (isSquareUnderAttack(kingStartPos, color)) {
    return false;
  }

  const passingSquares = isKingside
    ? [`f${rank}`, `g${rank}`]
    : [`c${rank}`, `d${rank}`];

  for (let square of passingSquares) {
    if (isSquareUnderAttack(square, color)) {
      return false;
    }
  }

  return true;
}

function isDeadPosition() {
  const pieces = Object.values(globalPiece)
    .filter((piece) => piece && piece.current_position)
    .map((piece) => piece.piece_name);

  if (pieces.length === 2) {
    const isKingVsKing = pieces.every((pieceName) =>
      pieceName.includes("KING")
    );
    if (isKingVsKing) {
      return true;
    }
  }

  if (pieces.length === 3) {
    const kings = pieces.filter((pieceName) => pieceName.includes("KING"));
    const others = pieces.filter((pieceName) => !pieceName.includes("KING"));

    if (kings.length === 2 && others.length === 1) {
      const isDeadMaterial =
        others[0].includes("BISHOP") || others[0].includes("KNIGHT");
      if (isDeadMaterial) {
        return true;
      }
    }
  }

  return false;
}

function checkForDraw() {
  if (isDeadPosition()) {
    setTimeout(() => {
      createNotificationModal("Draw by insufficient material!", true);
    }, 100);
    return true;
  }

  if (halfMoveCount >= 100) {
    setTimeout(() => {
      createNotificationModal("Draw by 50-move rule!", true);
    }, 100);
    return true;
  }

  return false;
}

function movePiece(piece, id, castle) {
  if (!piece || !id) return;

  const color = piece.piece_name.toLowerCase().includes("white")
    ? "white"
    : "black";
  const rank = color === "white" ? "1" : "8";

  const targetSquare = keySquareMapper[id];
  const isCapture =
    targetSquare.piece !== null &&
    targetSquare.piece !== undefined &&
    targetSquare.piece.piece_name &&
    targetSquare.piece.piece_name
      .toLowerCase()
      .includes(color === "white" ? "black" : "white");
  const isPawnMove = piece.piece_name.includes("PAWN");

  if (isCapture || isPawnMove) {
    halfMoveCount = 0;
  } else {
    halfMoveCount++;
    if (halfMoveCount >= 100) {
      createNotificationModal("Draw by 50 move rule!", true);
      return;
    }
  }

  if (lastMoveSquares.from) {
    document
      .getElementById(lastMoveSquares.from)
      ?.classList?.remove("highlightYellow");
  }
  if (lastMoveSquares.to) {
    document
      .getElementById(lastMoveSquares.to)
      ?.classList?.remove("highlightYellow");
  }

  lastMoveSquares.from = piece.current_position;
  lastMoveSquares.to = id;

  if (piece.piece_name.includes("KING")) {
    const prevSquare = document.getElementById(piece.current_position);
    prevSquare?.classList?.remove("captureColor");
  }

  if (
    piece.piece_name.includes("KING") &&
    (id === `c${rank}` || id === `g${rank}`) &&
    piece.current_position === `e${rank}`
  ) {
    if (!isCastlingLegal(piece, id)) {
      return;
    }

    const isKingside = id === `g${rank}`;
    const rookStartPos = isKingside ? `h${rank}` : `a${rank}`;
    const rookEndPos = isKingside ? `f${rank}` : `d${rank}`;
    const rook = keySquareMapper[rookStartPos].piece;

    movePiece(rook, rookEndPos, true);

    piece.hasMoved = true;
    rook.hasMoved = true;

    castle = true;
  } else if (
    piece.piece_name.includes("KING") ||
    piece.piece_name.includes("ROOK")
  ) {
    piece.hasMoved = true;
  }

  if (!isMoveLegal(piece, id, color)) {
    return;
  }

  if (piece.piece_name.includes("PAWN") && lastMove?.enPassantTarget === id) {
    const direction = piece.piece_name.includes("WHITE") ? -1 : 1;
    const capturedSquareId = `${id[0]}${Number(id[1]) + direction}`;
    const capturedSquare = keySquareMapper[capturedSquareId];

    if (capturedSquare?.piece) {
      capturedSquare.piece = null;
      document.getElementById(capturedSquareId).innerHTML = "";
    }
  }

  if (piece.piece_name.includes("PAWN")) {
    const startRow = piece.piece_name.includes("WHITE") ? "2" : "7";
    const endRow = piece.piece_name.includes("WHITE") ? "4" : "5";

    if (piece.current_position[1] === startRow && id[1] === endRow) {
      const direction = piece.piece_name.includes("WHITE") ? 1 : -1;
      lastMove = {
        piece,
        id,
        enPassant: true,
        enPassantTarget: `${id[0]}${Number(id[1]) - direction}`,
      };
    } else {
      lastMove = {
        piece,
        id,
        enPassant: false,
      };
    }
  }

  const pawnIsPromoted = checkForPawnPromotion(piece, id);

  const flatData = globalState.flat();
  flatData.forEach((el) => {
    if (el.id == piece.current_position) {
      delete el.piece;
    }

    if (el.id == id) {
      if (el.piece) {
        el.piece.current_position = null;
      }
      el.piece = piece;
    }
  });

  const previousPiece = document.getElementById(piece.current_position);
  const currentPiece = document.getElementById(id);

  if (!castle) {
    previousPiece?.classList?.add("highlightYellow");
    currentPiece?.classList?.add("highlightYellow");
  }

  clearHighlight();
  clearAllHighlightsExceptMove(previousPiece, currentPiece);

  currentPiece.innerHTML = previousPiece?.innerHTML;
  if (previousPiece) previousPiece.innerHTML = "";
  piece.current_position = id;

  if (pawnIsPromoted) {
    currentPiece?.classList?.add("highlightYellow");
    pawnPromotion(inTurn, callbackPawnPromotion, id);
    return;
  }

  checkForCheck();

  if (!castle || (castle && piece.piece_name.includes("KING"))) {
    changeTurn();
  }

  if (checkForDraw()) {
    return;
  }
}

function whitePawnClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = null;

  if (current_pos[1] == "2") {
    highlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];
  } else {
    highlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) + 1}`];
  }

  highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
    Number(current_pos[1]) + 1
  }`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
    Number(current_pos[1]) + 1
  }`;

  let captureIds = [col1, col2];

  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "white");
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

  globalStateRender();
}

function whiteBishopClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveBishopHighlightIds(current_pos);
  let temp = [];

  const { bottomLeft, topLeft, bottomRight, topRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));

  temp.push(bottomLeft, topLeft, bottomRight, topRight);

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break;
      }
      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

  globalStateRender();
}

function whiteRookClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveRookHighlightIds(current_pos);
  let temp = [];

  const { bottom, top, right, left } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  temp.push(bottom, top, right, left);

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break;
      }
      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

  globalStateRender();
}

function whiteKnightClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKnightHighlightIds(current_pos);

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];

  highlightSquareIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "white");
  });

  globalStateRender();
}

function whiteQueenClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveQueenHighlightIds(current_pos);
  let temp = [];

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

  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(left);
  temp.push(right);
  temp.push(bottom);
  temp.push(top);

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

  globalStateRender();
}

function whiteKingClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKingHighlightIds(current_pos);
  let temp = [];

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

  if (!piece.hasMoved) {
    const rook1 = globalPiece.white_rook_1;
    const rook2 = globalPiece.white_rook_2;

    if (!rook1.hasMoved) {
      const b1 = keySquareMapper["b1"];
      const c1 = keySquareMapper["c1"];
      const d1 = keySquareMapper["d1"];
      if (!b1.piece && !c1.piece && !d1.piece) {
        result.push("c1");
      }
    }

    if (!rook2.hasMoved) {
      const g1 = keySquareMapper["g1"];
      const f1 = keySquareMapper["f1"];
      if (!g1.piece && !f1.piece) {
        result.push("g1");
      }
    }
  }

  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  if (piece.hasMoved) {
    result = result.map((arr) => (arr.length > 0 ? [arr[0]] : arr));
  }

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("white")
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "white")) {
        break;
      }
    }
  }

  globalStateRender();
}

function blackPawnClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = null;

  if (current_pos[1] == "7") {
    highlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
      `${current_pos[0]}${Number(current_pos[1]) - 2}`,
    ];
  } else {
    highlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) - 1}`];
  }

  highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
    Number(current_pos[1]) - 1
  }`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
    Number(current_pos[1]) - 1
  }`;

  let captureIds = [col1, col2];

  captureIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "black");
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

  globalStateRender();
}

function blackBishopClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveBishopHighlightIds(current_pos);
  let temp = [];

  const { bottomLeft, topLeft, bottomRight, topRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));

  temp.push(bottomLeft, topLeft, bottomRight, topRight);

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }
      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender();
}

function blackRookClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveRookHighlightIds(current_pos);
  let temp = [];

  const { bottom, top, right, left } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  temp.push(bottom, top, right, left);

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }
      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender();
}

function blackKnightClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKnightHighlightIds(current_pos);

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];

  highlightSquareIds.forEach((element) => {
    checkPieceOfOpponentOnElement(element, "black");
  });

  globalStateRender();
}

function blackQueenClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveQueenHighlightIds(current_pos);
  let temp = [];

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

  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(left);
  temp.push(right);
  temp.push(bottom);
  temp.push(top);

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender();
}

function blackKingClick(square) {
  if (!square || !square.piece) return;

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    movePiece(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKingHighlightIds(current_pos);
  let temp = [];

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

  if (!piece.hasMoved) {
    const rook1 = globalPiece.black_rook_1;
    const rook2 = globalPiece.black_rook_2;

    if (!rook1.hasMoved) {
      const b8 = keySquareMapper["b8"];
      const c8 = keySquareMapper["c8"];
      const d8 = keySquareMapper["d8"];
      if (!b8.piece && !c8.piece && !d8.piece) {
        result.push("c8");
      }
    }

    if (!rook2.hasMoved) {
      const g8 = keySquareMapper["g8"];
      const f8 = keySquareMapper["f8"];
      if (!g8.piece && !f8.piece) {
        result.push("g8");
      }
    }
  }

  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(left));

  if (piece.hasMoved) {
    result = result.map((arr) => (arr.length > 0 ? [arr[0]] : arr));
  }

  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((highlight) => {
    const element = keySquareMapper[highlight];
    element.highlight = true;
  });

  let captureIds = [];

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElement(element, "black")) {
        break;
      }
    }
  }

  globalStateRender();
}

function globalEvent() {
  function attachDragListeners() {
    document.querySelectorAll(".piece").forEach((piece) => {
      piece.draggable = true;
    });
  }

  attachDragListeners();

  document.addEventListener("dragstart", (e) => {
    if (!e.target.matches(".piece")) return;

    const square = keySquareMapper[e.target.parentNode.id];
    const pieceObj = square.piece;

    if (
      (pieceObj.piece_name.includes("WHITE") && inTurn === "black") ||
      (pieceObj.piece_name.includes("BLACK") && inTurn === "white")
    ) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData("text/plain", e.target.parentNode.id);

    if (pieceObj.piece_name.includes("PAWN")) {
      if (inTurn === "white") whitePawnClick(square);
      else blackPawnClick(square);
    } else if (pieceObj.piece_name.includes("BISHOP")) {
      if (inTurn === "white") whiteBishopClick(square);
      else blackBishopClick(square);
    } else if (pieceObj.piece_name.includes("ROOK")) {
      if (inTurn === "white") whiteRookClick(square);
      else blackRookClick(square);
    } else if (pieceObj.piece_name.includes("KNIGHT")) {
      if (inTurn === "white") whiteKnightClick(square);
      else blackKnightClick(square);
    } else if (pieceObj.piece_name.includes("QUEEN")) {
      if (inTurn === "white") whiteQueenClick(square);
      else blackQueenClick(square);
    } else if (pieceObj.piece_name.includes("KING")) {
      if (inTurn === "white") whiteKingClick(square);
      else blackKingClick(square);
    }
  });

  document.addEventListener("dragover", (e) => {
    const square = e.target.closest(".square");
    if (!square) return;

    if (
      square.querySelector(".highlight") ||
      square.classList.contains("captureColor")
    ) {
      e.preventDefault();
    }
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    const square = e.target.closest(".square");
    if (!square) return;

    const fromId = e.dataTransfer.getData("text/plain");
    const toId = square.id;

    const fromSquare = keySquareMapper[fromId];
    const piece = fromSquare.piece;

    if (piece) {
      movePiece(piece, toId);
      clearHighlightLocal();
    }
  });

  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName == "img") {
      const clickId = event.target.parentNode.id;
      const square = keySquareMapper[clickId];

      if (
        (square.piece.piece_name.includes("WHITE") && inTurn === "black") ||
        (square.piece.piece_name.includes("BLACK") && inTurn === "white")
      ) {
        captureInTurn(square);
        return;
      }

      if (square.piece.piece_name == "WHITE_PAWN") {
        if (inTurn == "white") whitePawnClick(square);
      } else if (square.piece.piece_name == "BLACK_PAWN") {
        if (inTurn == "black") blackPawnClick(square);
      } else if (square.piece.piece_name == "WHITE_BISHOP") {
        if (inTurn == "white") whiteBishopClick(square);
      } else if (square.piece.piece_name == "BLACK_BISHOP") {
        if (inTurn == "black") blackBishopClick(square);
      } else if (square.piece.piece_name == "WHITE_ROOK") {
        if (inTurn == "white") whiteRookClick(square);
      } else if (square.piece.piece_name == "BLACK_ROOK") {
        if (inTurn == "black") blackRookClick(square);
      } else if (square.piece.piece_name == "WHITE_KNIGHT") {
        if (inTurn == "white") whiteKnightClick(square);
      } else if (square.piece.piece_name == "BLACK_KNIGHT") {
        if (inTurn == "black") blackKnightClick(square);
      } else if (square.piece.piece_name == "WHITE_QUEEN") {
        if (inTurn == "white") whiteQueenClick(square);
      } else if (square.piece.piece_name == "BLACK_QUEEN") {
        if (inTurn == "black") blackQueenClick(square);
      } else if (square.piece.piece_name == "WHITE_KING") {
        if (inTurn == "white") whiteKingClick(square);
      } else if (square.piece.piece_name == "BLACK_KING") {
        if (inTurn == "black") blackKingClick(square);
      }
    } else {
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

      const childElementsOfClickedEl = Array.from(event.target.childNodes);

      if (
        childElementsOfClickedEl.length == 1 ||
        event.target.localName == "span"
      ) {
        if (event.target.localName == "span") {
          const id = event.target.parentNode.id;
          if (moveState) {
            movePiece(moveState, id);
            moveState = null;
          }
        } else {
          const id = event.target.id;
          if (moveState) {
            movePiece(moveState, id);
            moveState = null;
          }
        }
        clearHighlightLocal();
      } else {
        clearHighlightLocal();
        moveState = null;
      }
    }
  });
}

export { globalEvent };
