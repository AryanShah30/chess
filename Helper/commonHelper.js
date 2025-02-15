import { keySquareMapper } from "../index.js";
import { globalPiece } from "../Render/main.js";

function checkPieceOfOpponentOnElement(id, color) {
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  const element = keySquareMapper[id];

  if (!element || !element.piece) return false;

  const pieceName = element.piece.piece_name.toLowerCase();

  if (pieceName.includes(opponentColor.toLowerCase())) {
    const el = document.getElementById(id);
    el.classList.add("captureColor");

    element.captureHighlight = true;

    return true;
  }

  return false;
}

function checkPieceOfOpponentOnElementNoDom(id, color) {
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  const element = keySquareMapper[id];

  if (!element) return false;

  if (element.piece && element.piece.piece_name.includes(opponentColor)) {
    return true;
  }

  return false;
}

function checkWhetherPieceExistsOrNot(squareId) {
  const square = keySquareMapper[squareId];

  if (square.piece) {
    return square;
  } else {
    return false;
  }
}

function checkSquareCaptureId(array) {
  let returnArray = [];

  for (let index = 0; index < array.length; index++) {
    const squareId = array[index];

    const square = keySquareMapper[squareId];

    if (square.piece) {
      break;
    }

    returnArray.push(squareId);
  }

  return returnArray;
}

function giveRookHighlightIds(id) {
  function top(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 8) {
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  function bottom(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 1) {
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  function right(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);

      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  function left(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);

      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  return {
    top: top(id),
    bottom: bottom(id),
    right: right(id),
    left: left(id),
  };
}

function giveRookCaptureIds(id, color) {
  if (!id) {
    return [];
  }

  let highlightSquareIds = giveRookHighlightIds(id);

  let temp = [];

  const { bottom, top, right, left } = highlightSquareIds;

  let returnArr = [];

  temp.push(bottom);
  temp.push(top);
  temp.push(right);
  temp.push(left);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes(color)
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElementNoDom(element, color)) {
        returnArr.push(element);

        break;
      }
    }
  }

  return returnArr;
}

function giveBishopHighlightIds(id) {
  function topLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  function bottomLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  function topRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  function bottomRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  return {
    topLeft: topLeft(id),
    bottomLeft: bottomLeft(id),
    topRight: topRight(id),
    bottomRight: bottomRight(id),
  };
}

function giveBishopCaptureIds(id, color) {
  if (!id) {
    return [];
  }

  let highlightSquareIds = giveBishopHighlightIds(id);

  let temp = [];

  const { bottomLeft, topLeft, bottomRight, topRight } = highlightSquareIds;

  let returnArr = [];

  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes(color)
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElementNoDom(element, color)) {
        returnArr.push(element);

        break;
      }
    }
  }

  return returnArr;
}

function giveKnightHighlightIds(id, color) {
  if (!id) {
    return;
  }

  function left() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (alpha != "a") {
      if (temp == 2) {
        break;
      }

      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (number < 8) {
        finalReturnArray.push(`${alpha}${number + 1}`);
      }
      if (number > 1) {
        finalReturnArray.push(`${alpha}${number - 1}`);
      }

      return finalReturnArray;
    } else {
      return [];
    }
  }

  function top() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (num != "8") {
      if (temp == 2) {
        break;
      }

      num = num + 1;
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }

      return finalReturnArray;
    } else {
      return [];
    }
  }

  function right() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (alpha != "h") {
      if (temp == 2) {
        break;
      }

      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (number < 8) {
        finalReturnArray.push(`${alpha}${number + 1}`);
      }
      if (number > 1) {
        finalReturnArray.push(`${alpha}${number - 1}`);
      }
      return finalReturnArray;
    } else {
      return [];
    }
  }

  function bottom() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    while (num != "1") {
      if (temp == 2) {
        break;
      }

      num = num - 1;
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`);
      }

      return finalReturnArray;
    } else {
      return [];
    }
  }

  return [...top(), ...bottom(), ...left(), ...right()].filter((square) => {
    const targetSquare = keySquareMapper[square];
    return (
      !targetSquare.piece ||
      !targetSquare.piece.piece_name.toLowerCase().includes(color)
    );
  });
}

function giveKnightCaptureIds(id, color) {
  if (!id) {
    return [];
  }

  let returnArr = giveKnightHighlightIds(id, color);

  returnArr = returnArr.filter((element) => {
    if (checkPieceOfOpponentOnElementNoDom(element, color)) {
      return true;
    }
  });

  return returnArr;
}

function giveQueenHighlightIds(id) {
  const rookMoves = giveRookHighlightIds(id);

  const bishopMoves = giveBishopHighlightIds(id);

  return {
    left: rookMoves.left,
    right: rookMoves.right,
    top: rookMoves.top,
    bottom: rookMoves.bottom,
    topLeft: bishopMoves.topLeft,
    bottomLeft: bishopMoves.bottomLeft,
    bottomRight: bishopMoves.bottomRight,
    topRight: bishopMoves.topRight,
  };
}

function giveQueenCaptureIds(id, color) {
  if (!id) return [];

  let returnArr = [];

  returnArr.push(giveBishopCaptureIds(id, color));

  returnArr.push(giveRookCaptureIds(id, color));

  return returnArr.flat();
}

function giveKingHighlightIds(id) {
  if (!id) return;

  const piece = keySquareMapper[id].piece;
  const color = piece.piece_name.toLowerCase().includes("white")
    ? "white"
    : "black";

  const rookMoves = giveRookHighlightIds(id);
  const bishopMoves = giveBishopHighlightIds(id);

  let returnResult = {
    left: rookMoves.left,
    right: rookMoves.right,
    top: rookMoves.top,
    bottom: rookMoves.bottom,
    topLeft: bishopMoves.topLeft,
    bottomLeft: bishopMoves.bottomLeft,
    bottomRight: bishopMoves.bottomRight,
    topRight: bishopMoves.topRight,
  };

  for (const direction in returnResult) {
    if (returnResult[direction].length > 0) {
      returnResult[direction] = [returnResult[direction][0]];
    }
  }

  for (const direction in returnResult) {
    returnResult[direction] = returnResult[direction].filter((square) => {
      const targetSquare = keySquareMapper[square];

      const isValidMove =
        !targetSquare.piece ||
        !targetSquare.piece.piece_name.toLowerCase().includes(color);

      return isValidMove && isMoveLegal(piece, square, color);
    });
  }

  const isInitialPosition =
    (color === "white" && id === "e1") || (color === "black" && id === "e8");

  if (isInitialPosition && !piece.hasMoved && !isKingInCheck(color)) {
    const rank = color === "white" ? "1" : "8";

    const kingsideRook = keySquareMapper[`h${rank}`]?.piece;
    if (kingsideRook && !kingsideRook.hasMoved) {
      const kingsidePath = [`f${rank}`, `g${rank}`];
      if (
        kingsidePath.every(
          (square) =>
            !keySquareMapper[square].piece && isMoveLegal(piece, square, color)
        )
      ) {
        returnResult.right.push(`g${rank}`);
      }
    }

    const queensideRook = keySquareMapper[`a${rank}`]?.piece;
    if (queensideRook && !queensideRook.hasMoved) {
      const queensidePath = [`b${rank}`, `c${rank}`, `d${rank}`];
      if (
        queensidePath.every(
          (square) =>
            !keySquareMapper[square].piece && isMoveLegal(piece, square, color)
        )
      ) {
        returnResult.left.push(`c${rank}`);
      }
    }
  }

  return returnResult;
}

function giveKingCaptureIds(id, color) {
  if (!id) return [];

  const piece = keySquareMapper[id].piece;
  if (!piece) return [];

  let result = giveKingHighlightIds(id);
  if (!result) return [];

  result = Object.values(result).flat();

  const opponentColor = color === "white" ? "black" : "white";
  result = result.filter((square) => {
    const targetSquare = keySquareMapper[square];
    if (!targetSquare || !targetSquare.piece) return false;

    const isOpponentPiece = targetSquare.piece.piece_name
      .toLowerCase()
      .includes(opponentColor);

    if (isOpponentPiece && isMoveLegal(piece, square, color)) {
      targetSquare.captureHighlight = true;
      const el = document.getElementById(square);
      if (el) el.classList.add("captureColor");
      return true;
    }
    return false;
  });

  return result;
}

function givePawnCaptureIds(currentPosition, color) {
  if (!currentPosition) {
    return [];
  }

  const file = currentPosition[0];
  const rank = parseInt(currentPosition[1], 10);
  const captures = [];

  if (color === "white") {
    const newRank = rank + 1;
    if (newRank > 8) {
      return captures;
    }

    const leftFile = String.fromCharCode(file.charCodeAt(0) - 1);
    if (leftFile >= "a") {
      captures.push(`${leftFile}${newRank}`);
    }

    const rightFile = String.fromCharCode(file.charCodeAt(0) + 1);
    if (rightFile <= "h") {
      captures.push(`${rightFile}${newRank}`);
    }
  } else {
    const newRank = rank - 1;
    if (newRank < 1) {
      return captures;
    }

    const leftFile = String.fromCharCode(file.charCodeAt(0) - 1);
    if (leftFile >= "a") {
      captures.push(`${leftFile}${newRank}`);
    }

    const rightFile = String.fromCharCode(file.charCodeAt(0) + 1);
    if (rightFile <= "h") {
      captures.push(`${rightFile}${newRank}`);
    }
  }

  const finalCaptures = captures.filter((sq) => sq.length === 2);
  return finalCaptures;
}

function getBasicKingMoves(piece, color) {
  const moves = [];
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const [file, rank] = [
    piece.current_position[0],
    Number(piece.current_position[1]),
  ];

  directions.forEach(([dx, dy]) => {
    const newFile = String.fromCharCode(file.charCodeAt(0) + dx);
    const newRank = rank + dy;

    if (newFile >= "a" && newFile <= "h" && newRank >= 1 && newRank <= 8) {
      const newSquare = `${newFile}${newRank}`;
      const targetPiece = keySquareMapper[newSquare]?.piece;
      if (
        !targetPiece ||
        !targetPiece.piece_name.toLowerCase().includes(color)
      ) {
        moves.push(newSquare);
      }
    }
  });

  return moves;
}

function getAttackingSquares(piece, color, excludeKing = false) {
  if (!piece || !piece.current_position) return [];

  if (piece.piece_name.includes("PAWN")) {
    return givePawnCaptureIds(piece.current_position, color);
  } else if (piece.piece_name.includes("KNIGHT")) {
    return giveKnightCaptureIds(piece.current_position, color);
  } else if (piece.piece_name.includes("BISHOP")) {
    return giveBishopCaptureIds(piece.current_position, color);
  } else if (piece.piece_name.includes("ROOK")) {
    return giveRookCaptureIds(piece.current_position, color);
  } else if (piece.piece_name.includes("QUEEN")) {
    return giveQueenCaptureIds(piece.current_position, color);
  } else if (!excludeKing && piece.piece_name.includes("KING")) {
    return getBasicKingMoves(piece, color);
  }
  return [];
}

function isSquareUnderAttack(squareId, color, excludeKing = false) {
  const opponentColor = color === "white" ? "black" : "white";
  let attackingSquares = [];

  Object.values(keySquareMapper).forEach((square) => {
    if (
      square.piece &&
      square.piece.piece_name.toLowerCase().includes(opponentColor)
    ) {
      attackingSquares.push(
        ...getAttackingSquares(square.piece, opponentColor, excludeKing)
      );
    }
  });

  return attackingSquares.includes(squareId);
}

function isKingInCheck(color) {
  const kingPosition =
    color === "white"
      ? globalPiece.white_king.current_position
      : globalPiece.black_king.current_position;

  return isSquareUnderAttack(kingPosition, color, true);
}

function isMoveLegal(piece, targetSquare, color) {
  if (!piece || !targetSquare) return false;

  const originalPosition = piece.current_position;
  const originalSquare = keySquareMapper[originalPosition];
  const targetSquareObj = keySquareMapper[targetSquare];
  const originalTargetPiece = targetSquareObj.piece;

  // Temporarily make the move
  originalSquare.piece = null;
  targetSquareObj.piece = piece;
  const originalPiecePosition = piece.current_position;
  piece.current_position = targetSquare;

  // Check if the king is in check after the move
  const kingPos = color === "white" 
    ? globalPiece.white_king.current_position 
    : globalPiece.black_king.current_position;
  
  const inCheck = isSquareUnderAttack(kingPos, color);

  // Restore original position
  originalSquare.piece = piece;
  targetSquareObj.piece = originalTargetPiece;
  piece.current_position = originalPiecePosition;

  console.log(`Move ${piece.piece_name} from ${originalPosition} to ${targetSquare} legal:`, !inCheck);
  return !inCheck;
}

function canCastle(kingPos, rookPos, color) {
  const king = keySquareMapper[kingPos].piece;
  const rook = keySquareMapper[rookPos]?.piece;

  if (!king || king.move || !rook || rook.move) {
    return false;
  }

  const file = rookPos[0];
  const rank = rookPos[1];
  const path =
    file === "h"
      ? [`f${rank}`, `g${rank}`]
      : [`b${rank}`, `c${rank}`, `d${rank}`];

  if (path.some((square) => keySquareMapper[square].piece)) {
    return false;
  }

  if (isKingInCheck(color)) {
    return false;
  }

  return !path.some((square) => !isMoveLegal(king, square, color));
}

export {
  checkPieceOfOpponentOnElement,
  checkPieceOfOpponentOnElementNoDom,
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
  isKingInCheck,
  canCastle,
  getAttackingSquares,
};
