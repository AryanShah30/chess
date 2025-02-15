function blackPawn(current_position) {
  return {
    current_position,
    img: `Assets/images/pieces/${localStorage.getItem('chess-theme-piece-style') || 'default'}/black/bP.png`,
    piece_name: "BLACK_PAWN",
  };
}

function blackRook(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: `Assets/images/pieces/${localStorage.getItem('chess-theme-piece-style') || 'default'}/black/bR.png`,
    piece_name: "BLACK_ROOK",
  };
}

function blackKnight(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/default/black/bN.png",
    piece_name: "BLACK_KNIGHT",
  };
}

function blackBishop(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/default/black/bB.png",
    piece_name: "BLACK_BISHOP",
  };
}

function blackQueen(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/default/black/bQ.png",
    piece_name: "BLACK_QUEEN",
  };
}

function blackKing(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: "Assets/images/pieces/default/black/bK.png",
    piece_name: "BLACK_KING",
  };
}

function whitePawn(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/default/white/wP.png",
    piece_name: "WHITE_PAWN",
  };
}

function whiteRook(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: "Assets/images/pieces/default/white/wR.png",
    piece_name: "WHITE_ROOK",
  };
}

function whiteKnight(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/default/white/wN.png",
    piece_name: "WHITE_KNIGHT",
  };
}

function whiteBishop(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/default/white/wB.png",
    piece_name: "WHITE_BISHOP",
  };
}

function whiteQueen(current_position) {
  return {
    current_position,
    img: "Assets/images/pieces/default/white/wQ.png",
    piece_name: "WHITE_QUEEN",
  };
}

function whiteKing(current_position) {
  return {
    move: false,
    hasMoved: false,
    current_position,
    img: `Assets/images/pieces/${localStorage.getItem('chess-theme-piece-style') || 'default'}/white/wK.png`,
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
