import { keySquareMapper } from "../index.js";

// determine if a given square contains an opponent's piece
// if it finds an opponent's piece, it highlights the square as a potential capture target
function checkPieceOfOpponentOnElement(id, color) {
  // determine the opponent's color based on the current player's color
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  // retrieve the chessboard square object using the square's ID
  const element = keySquareMapper[id];

  // if the square doesn't exist or doesn't contain a piece, return false
  if (!element || !element.piece) return false;

  // get the name of the piece on the square in lowercase for comparison
  const pieceName = element.piece.piece_name.toLowerCase();

  // check if the piece belongs to the opponent
  if (pieceName.includes(opponentColor.toLowerCase()) && !pieceName.includes("king")) {
    // add a visual highlight to the square to indicate a capture target
    const el = document.getElementById(id);
    el.classList.add("captureColor");

    // mark the square's state as highlighted for capture
    element.captureHighlight = true;

    // return true since an opponent's piece was found
    return true;
  }

  // if no valid opponent's piece is found, return false
  return false;
}

// omits DOM related operations and only checks logical conditions
function checkPieceOfOpponentOnElementNoDom(id, color) {
  // determine the opponent's color based on the player's color
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  // retrieve the square data using the square's id
  const element = keySquareMapper[id];

  // if the square is invalid or not found, return false
  if (!element) return false;

  // check if the square contains a piece and if the piece belongs to the opponent
  if (element.piece && element.piece.piece_name.includes(opponentColor)) {
    // return true if an opponent's piece is found
    return true;
  }
  // if no opponent's piece is found, return false
  return false;
}

// verify if there is a chess piece on a given square of the board
function checkWhetherPieceExistsOrNot(squareId) {
  // retrieve the square data using the square's id from the keySquareMapper
  const square = keySquareMapper[squareId];

  // check if the square contains a piece
  if (square.piece) {
    // return the square object if a piece is present
    return square;
  } else {
    // return false if no piece is present on the square
    return false;
  }
}

// collects the square ids of all unoccupied squares up to the first occupied square
// stops the evaluation as soon as it encounters a square with a piece
function checkSquareCaptureId(array) {
  // initialize an empty array to store valid square ids
  let returnArray = [];

  // loop through the array of square ids
  for (let index = 0; index < array.length; index++) {
    // get the current square ID
    const squareId = array[index];

    // retrieve the square data from the keySquareMapper
    const square = keySquareMapper[squareId];

    // if the square contains a piece, stop processing further squares
    if (square.piece) {
      // exit the loop
      break;
    }
    // if the square is unoccupied, add its id to the returnArray
    returnArray.push(squareId);
  }

  // return the array of valid square ids
  return returnArray;
}

// calculates all possible moves for a rook in four directions: top, bottom, left, and right
function giveRookHighlightIds(id) {
  // calculate squares above the current position (top direction)
  function top(id) {
    let alpha = id[0]; // extract the column
    let num = Number(id[1]); // extract the row as a number
    let resultArray = []; // array to store all valid moves in the top direction

    // loop until the rook reaches the top edge of the board (row 8)
    while (num != 8) {
      num = num + 1; // move one square up by increasing the row number
      resultArray.push(`${alpha}${num}`); // add the new square (column remains the same)
    }

    // return all top-direction squares
    return resultArray;
  }

  // calculate squares above the current position (bottom direction)
  function bottom(id) {
    let alpha = id[0]; // extract the column
    let num = Number(id[1]); // extract the row as a number
    let resultArray = []; // array to store all valid moves in the bottom direction

    // loop until the rook reaches the bottom edge of the board (row 1)
    while (num != 1) {
      num = num - 1; // move one square down by decreasing the row number
      resultArray.push(`${alpha}${num}`); // add the new square (column remains the same)
    }

    // return all bottom-direction squares
    return resultArray;
  }

  //calculate squares to the right of the current position
  function right(id) {
    let alpha = id[0]; // extract the column
    let num = Number(id[1]); // extract the row as a number
    let resultArray = []; // array to store all valid moves in the right direction

    // loop until the rook reaches the right edge of the board
    while (alpha != "h") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      // move one square to the right by converting the column to the next letter
      resultArray.push(`${alpha}${num}`); // move one square to the right by converting the column to the next letter
    }

    // return all right-direction squares
    return resultArray;
  }

  // calculate squares to the left of the current position
  function left(id) {
    let alpha = id[0]; // extract the column
    let num = Number(id[1]); // extract the row as a number
    let resultArray = []; // array to store all valid moves in the left direction

    // loop until the rook reaches the left edge of the board
    while (alpha != "a") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      // move one square to the left by converting the column to the previous letter
      resultArray.push(`${alpha}${num}`); // add the new square (row remains the same)
    }

    // return all left-direction squares
    return resultArray;
  }

  // return an object containing all possible moves for the rook in each direction
  return {
    top: top(id), // squares above the current position
    bottom: bottom(id), // squares below the current position
    right: right(id), // squares to the right of the current position
    left: left(id), // squares to the left of the current position
  };
}

// calculates all the squares where a rook can capture an opponent's piece
function giveRookCaptureIds(id, color) {
  if (!id) {
    // if no square ID is provided (invalid input), return an empty array
    return [];
  }

  // get all the potential moves for the rook in the four directions (top, bottom, left, right)
  let highlightSquareIds = giveRookHighlightIds(id);

  // temporary array to group all directional moves
  let temp = [];

  // destructure the directional moves
  const { bottom, top, right, left } = highlightSquareIds;

  // array to store squares where the rook can capture an opponent's piece
  let returnArr = [];

  // add all directional arrays (bottom, top, right, left) into the `temp` array for easier iteration
  temp.push(bottom);
  temp.push(top);
  temp.push(right);
  temp.push(left);

  // loop through each direction (bottom, top, right, left)
  for (let index = 0; index < temp.length; index++) {
    // get the array of squares for the current direction
    const arr = temp[index];

    // loop through the squares in the current direction
    for (let j = 0; j < arr.length; j++) {
      // get the current square
      const element = arr[j];

      // check if there is any piece on the current square
      // if a piece exists, this function returns the square object; otherwise, it returns `false`
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      // check if the piece on the square belongs to the same color as the player
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes(color)
      ) {
        // stop checking further in this direction because the rook cannot move through friendly pieces
        break;
      }

      // check if the current square has an opponent's piece
      // this function returns `true` if an opponent's piece is present on the square
      if (checkPieceOfOpponentOnElementNoDom(element, color)) {
        // add the square to the `returnArr` because the rook can capture the opponent's piece here
        returnArr.push(element);
        // stop checking further in this direction after finding a capturable piece, because the rook cannot move past the captured piece
        break;
      }
    }
  }

  // return all the squares where the rook can capture an opponent's piece
  return returnArr;
}

// calculates all possible squares a bishop can move to based on its current position
function giveBishopHighlightIds(id) {
  // calculates squares diagonally upwards to the left
  function topLeft(id) {
    let alpha = id[0]; // extract the column from the square id
    let num = Number(id[1]); // extract the row from the square id
    let resultArray = []; // stores possible moves in this direction

    // loop until the bishop reaches the left edge or top edge
    while (alpha != "a" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1); // move one column left
      num = num + 1; // move one row up
      resultArray.push(`${alpha}${num}`); // add the square to the result
    }

    // return all squares the bishop can move to in this direction
    return resultArray;
  }

  // calculates squares diagonally downwards to the left
  function bottomLeft(id) {
    let alpha = id[0]; // extract the column
    let num = Number(id[1]); // extract the row
    let resultArray = []; // stores possible moves in this direction

    // loop until the bishop reaches the left edge or bottom edge
    while (alpha != "a" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1); // move one column left
      num = num - 1; // move one row down
      resultArray.push(`${alpha}${num}`); // add the square to the result
    }

    // return all squares the bishop can move to in this direction
    return resultArray;
  }

  // calculates squares diagonally upwards to the right
  function topRight(id) {
    let alpha = id[0]; // extract the column
    let num = Number(id[1]); // extract the row
    let resultArray = []; // stores possible moves in this direction

    // loop until the bishop reaches the right edge or top edge
    while (alpha != "h" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1); // move one column right
      num = num + 1; // move one row up
      resultArray.push(`${alpha}${num}`); // add the square to the result
    }

    // return all squares the bishop can move to in this direction
    return resultArray;
  }

  // calculates squares diagonally downwards to the right
  function bottomRight(id) {
    let alpha = id[0]; // extract the column (letter)
    let num = Number(id[1]); // extract the row (number)
    let resultArray = []; // stores possible moves in this direction

    // loop until the bishop reaches the right edge or bottom edge
    while (alpha != "h" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1); // move one column right
      num = num - 1; // move one row down
      resultArray.push(`${alpha}${num}`); // add the square to the result
    }

    // return all squares the bishop can move to in this direction
    return resultArray;
  }

  // return all possible moves in four diagonal directions
  return {
    topLeft: topLeft(id), // moves diagonally upwards to the left
    bottomLeft: bottomLeft(id), // moves diagonally downwards to the left
    topRight: topRight(id), // moves diagonally upwards to the right
    bottomRight: bottomRight(id), // moves diagonally downwards to the right
  };
}

// calculates all the squares where a bishop can capture an opponent's piece
function giveBishopCaptureIds(id, color) {
  // if no id is provided, return an empty array
  if (!id) {
    return [];
  }

  // get all possible moves for the bishop in all diagonal directions
  let highlightSquareIds = giveBishopHighlightIds(id);

  // temporary array to store moves for each diagonal direction
  let temp = [];

  // destructure the diagonal directions from the highlightSquareIds object
  const { bottomLeft, topLeft, bottomRight, topRight } = highlightSquareIds;

  // array to store valid capture squares
  let returnArr = [];

  temp.push(bottomLeft); // add squares in bottom-left direction to temp
  temp.push(topLeft); // add squares in top-left direction to temp
  temp.push(bottomRight); // add squares in bottom-right direction to temp
  temp.push(topRight); // add squares in top-right direction to temp

  // loop through each diagonal direction
  for (let index = 0; index < temp.length; index++) {
    // get the squares in the current direction
    const arr = temp[index];

    // loop through each square in the current direction
    for (let j = 0; j < arr.length; j++) {
      // get the current square id
      const element = arr[j];

      // check if there is a piece on the current square
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);

      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes(color)
      ) {
        // if there is a piece of the same color, stop checking further in this direction
        break;
      }

      if (checkPieceOfOpponentOnElementNoDom(element, color)) {
        // if the square contains an opponent's piece, add it to the return array
        returnArr.push(element);
        // stop checking further in this direction after capturing
        break;
      }
    }
  }

  // return the squares where the bishop can capture an opponent's piece
  return returnArr;
}

// calculates all possible squares a knight can move to based on its current position
function giveKnightHighlightIds(id) {
  // if no id is given, return nothing
  if (!id) {
    return;
  }

  // function to get squares left of the knight's position
  function left() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    // loop until the knight moves 2 steps to the left
    while (alpha != "a") {
      if (temp == 2) {
        // stop after moving 2 squares
        break;
      }

      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1); // move left
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    // check if the knight moved 2 steps, then move up/down from the last square
    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (number < 8) {
        // move one square up
        finalReturnArray.push(`${alpha}${number + 1}`);
      }
      if (number > 1) {
        // move one square down
        finalReturnArray.push(`${alpha}${number - 1}`);
      }
      // return the valid squares
      return finalReturnArray;
    } else {
      return [];
    }
  }

  // function to get squares above the knight's position
  function top() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    // loop until the knight moves 2 steps up
    while (num != "8") {
      if (temp == 2) {
        // stop after moving 2 squares
        break;
      }

      num = num + 1; // move up
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    // check if the knight moved 2 steps, then move left/right from the last square
    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`); // move right
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`); // move left
      }
      // return the valid squares
      return finalReturnArray;
    } else {
      return [];
    }
  }

  // function to get squares right of the knight's position
  function right() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    // loop until the knight moves 2 steps to the right
    while (alpha != "h") {
      if (temp == 2) {
        // stop after moving 2 squares
        break;
      }

      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1); // move right
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    // check if the knight moved 2 steps, then move up/down from the last square
    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (number < 8) {
        finalReturnArray.push(`${alpha}${number + 1}`); // move one square up
      }
      if (number > 1) {
        finalReturnArray.push(`${alpha}${number - 1}`); // move one square down
      }
      return finalReturnArray; // return the valid squares
    } else {
      return [];
    }
  }

  // function to get squares below the knight's position
  function bottom() {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    let temp = 0;

    // loop until the knight moves 2 steps down
    while (num != "1") {
      if (temp == 2) {
        // stop after moving 2 squares
        break;
      }

      num = num - 1; // move down
      resultArray.push(`${alpha}${num}`);
      temp += 1;
    }

    // check if the knight moved 2 steps, then move left/right from the last square
    if (resultArray.length == 2) {
      let finalReturnArray = [];
      const lastElement = resultArray[resultArray.length - 1];
      let alpha = lastElement[0];
      let number = Number(lastElement[1]);
      if (alpha != "h") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
        finalReturnArray.push(`${alpha2}${number}`); // move right
      }
      if (alpha != "a") {
        let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
        finalReturnArray.push(`${alpha2}${number}`); // move left
      }
      // return the valid squares
      return finalReturnArray;
    } else {
      return [];
    }
  }

  // return all valid knight moves (combining all directions)
  return [...top(), ...bottom(), ...left(), ...right()];
}

// calculates all the squares where a knight can capture an opponent's piece
function giveKnightCaptureIds(id, color) {
  // return empty array if no id is provided
  if (!id) {
    return [];
  }

  // get all valid knight moves
  let returnArr = giveKnightHighlightIds(id);

  // filter out the squares that contain opponent's pieces
  returnArr = returnArr.filter((element) => {
    if (checkPieceOfOpponentOnElementNoDom(element, color)) {
      return true; // keep only the squares with opponent's pieces
    }
  });

  // return the valid capture squares
  return returnArr;
}

// calculates all possible squares a queen can move to based on its current position
function giveQueenHighlightIds(id) {
  // get rook moves for queen
  const rookMoves = giveRookHighlightIds(id);

  // get bishop moves for queen
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

// calculates all the squares where a queen can capture an opponent's piece
function giveQueenCaptureIds(id, color) {
  // if no id is provided, return empty array
  if (!id) return [];

  // initialize empty array to store capture squares
  let returnArr = [];

  // add bishop capture squares
  returnArr.push(giveBishopCaptureIds(id, color));

  // add rook capture squares
  returnArr.push(giveRookCaptureIds(id, color));

  // flatten the array and return all capture squares
  return returnArr.flat();
}

// calculates all possible squares a king can move to based on its current position
function giveKingHighlightIds(id) {
  // get rook moves for king
  const rookMoves = giveRookHighlightIds(id);

  // get bishop moves for king
  const bishopMoves = giveBishopHighlightIds(id);

  const returnResult = {
    left: rookMoves.left,
    right: rookMoves.right,
    top: rookMoves.top,
    bottom: rookMoves.bottom,
    topLeft: bishopMoves.topLeft,
    bottomLeft: bishopMoves.bottomLeft,
    bottomRight: bishopMoves.bottomRight,
    topRight: bishopMoves.topRight,
  };

  // loop through each direction
  for (const key in returnResult) {
    if (Object.hasOwnProperty.call(returnResult, key)) {
      const element = returnResult[key];
      if (element.length != 0) {
        // for king, only one step in each direction
        returnResult[key] = new Array(element[0]);
      }
    }
  }
  // return the valid moves for the king
  return returnResult;
}

// calculates all the squares where a king can capture an opponent's piece
function giveKingCaptureIds(id, color) {
  // return empty array if no id is provided
  if (!id) {
    return [];
  }

  // get all valid king moves
  let result = giveKingHighlightIds(id);

  // flatten the result
  result = Object.values(result).flat();

  result = result.filter((element) => {
    if (checkPieceOfOpponentOnElementNoDom(element, color)) {
      return true; // keep only squares with opponent's pieces
    }
  });

  // return the valid capture squares for the king
  return result;
}

export {
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
};
