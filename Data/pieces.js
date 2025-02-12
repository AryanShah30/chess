// each function represents a specific type of chess piece
// accepts the piece's current position as an argument
// returns an object containing the position, piece's image, piece name

// for rook and king, 'move' defined for tracking castling restrictions

function blackPawn(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/black/pawn.png",
    piece_name: "BLACK_PAWN",
  };
}

function blackRook(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: "Assets/images/pieces/black/rook.png",
    piece_name: "BLACK_ROOK",
  };
}

function blackKnight(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/black/knight.png",
    piece_name: "BLACK_KNIGHT",
  };
}

function blackBishop(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/black/bishop.png",
    piece_name: "BLACK_BISHOP",
  };
}

function blackQueen(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/black/queen.png",
    piece_name: "BLACK_QUEEN",
  };
}

function blackKing(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: "Assets/images/pieces/black/king.png",
    piece_name: "BLACK_KING",
  };
}

function whitePawn(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/white/pawn.png",
    piece_name: "WHITE_PAWN",
  };
}

function whiteRook(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: "Assets/images/pieces/white/rook.png",
    piece_name: "WHITE_ROOK",
  };
}

function whiteKnight(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/white/knight.png",
    piece_name: "WHITE_KNIGHT",
  };
}

function whiteBishop(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/white/bishop.png",
    piece_name: "WHITE_BISHOP",
  };
}

function whiteQueen(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/white/queen.png",
    piece_name: "WHITE_QUEEN",
  };
}

function whiteKing(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: "Assets/images/pieces/white/king.png",
    piece_name: "WHITE_KING",
  };
}

export {
  blackPawn,
  blackRook,
  blackBishop,
  blackKnight,
  blackQueen,
  blackKing,
  whitePawn,
  whiteRook,
  whiteBishop,
  whiteKnight,
  whiteQueen,
  whiteKing,
};
