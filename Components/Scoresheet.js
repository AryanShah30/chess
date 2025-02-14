class Scoresheet {
  constructor() {
    this.moves = [];
    this.currentMove = 1;
    this.promotedTo = null;
  }

  getPieceSymbol(piece) {
    // Standard chess notation uses:
    // K for King
    // Q for Queen
    // R for Rook
    // B for Bishop
    // N for Knight
    // (no symbol) for Pawn
    if (piece.piece_name.includes("PAWN")) {
      return "";
    } else if (piece.piece_name.includes("KNIGHT")) {
      return "N";
    } else if (piece.piece_name.includes("BISHOP")) {
      return "B";
    } else if (piece.piece_name.includes("ROOK")) {
      return "R";
    } else if (piece.piece_name.includes("QUEEN")) {
      return "Q";
    } else if (piece.piece_name.includes("KING")) {
      return "K";
    }
  }

  convertPositionToNotation(
    piece,
    fromPos,
    toPos,
    isCapture,
    isCheck,
    isCheckmate,
    isCastle
  ) {
    console.log('Converting to notation:', {
      piece_name: piece.piece_name,
      fromPos,
      toPos,
      isCapture,
      isCheck,
      isCheckmate,
      isCastle,
      promotedTo: this.promotedTo
    });

    let notation = "";

    // Handle castling first
    if (isCastle) {
      return toPos[0] === "g" ? "O-O" : "O-O-O";
    }

    // For pawns, only add piece symbol for non-pawns
    if (!piece.piece_name.includes("PAWN")) {
      notation += this.getPieceSymbol(piece);
      console.log('Added piece symbol:', notation);
    }

    // For pawn captures, add the file of origin
    if (isCapture) {
      if (piece.piece_name.includes("PAWN")) {
        notation += fromPos[0];
        console.log('Added pawn capture file:', notation, 'from position:', fromPos);
      }
      notation += "x";
    }

    // Add destination square
    notation += toPos;

    // Add promotion symbol if applicable
    if (this.promotedTo) {
      notation += "=" + this.promotedTo;
      console.log('Added promotion:', notation);
    }

    // Add check or checkmate symbol
    if (isCheckmate) {
      notation += "#";
      console.log('Added checkmate:', notation);
    } else if (isCheck) {
      notation += "+";
      console.log('Added check:', notation);
    }

    console.log('Final notation:', notation);
    return notation;
  }

  addMove(piece, fromPos, toPos, isCapture, isCheck, isCheckmate, isCastle, promotedTo = null) {
    this.promotedTo = promotedTo; // Store the promotion piece
    const notation = this.convertPositionToNotation(
      piece,
      fromPos,
      toPos,
      isCapture,
      isCheck,
      isCheckmate,
      isCastle
    );

    const isWhite = piece.piece_name.includes("WHITE");

    if (isWhite) {
      this.moves.push({ white: notation, black: "" });
    } else {
      if (this.moves.length === 0 || this.moves[this.moves.length - 1].black) {
        this.moves.push({ white: "...", black: notation });
      } else {
        this.moves[this.moves.length - 1].black = notation;
      }
    }

    this.render();
  }

  render() {
    const scoresheet = document.getElementById("scoresheet");

    // Keep the header row
    while (scoresheet.children.length > 1) {
      scoresheet.removeChild(scoresheet.lastChild);
    }

    this.moves.forEach((move, index) => {
      const moveRow = document.createElement("div");
      moveRow.className = "move-row";

      const moveNumber = document.createElement("div");
      moveNumber.className = "move-number";
      moveNumber.textContent = index + 1;

      const whiteMove = document.createElement("div");
      whiteMove.className = "move";
      if (index === this.moves.length - 1 && !move.black) {
        whiteMove.classList.add("last");
      }
      whiteMove.textContent = move.white;

      const blackMove = document.createElement("div");
      blackMove.className = "move";
      if (index === this.moves.length - 1 && move.black) {
        blackMove.classList.add("last");
      }
      blackMove.textContent = move.black;

      moveRow.appendChild(moveNumber);
      moveRow.appendChild(whiteMove);
      moveRow.appendChild(blackMove);
      scoresheet.appendChild(moveRow);
    });

    // Scroll to bottom
    scoresheet.scrollTop = scoresheet.scrollHeight;
  }
}

export { Scoresheet };
