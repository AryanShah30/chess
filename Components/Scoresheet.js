class Scoresheet {
  constructor() {
    this.moves = [];
    this.currentMove = 1;
    this.promotedTo = null;
  }

  getPieceSymbol(piece) {
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
    isCastle,
    isEnPassant
  ) {
    console.log("Converting to notation with checkmate status:", isCheckmate);
    let notation = "";

    if (isCastle) {
      return toPos[0] === "g" ? "O-O" : "O-O-O";
    }

    if (!piece.piece_name.includes("PAWN")) {
      notation += this.getPieceSymbol(piece);
      console.log("Added piece symbol:", notation);
    }

    if (isCapture) {
      if (piece.piece_name.includes("PAWN")) {
        notation += fromPos[0];
        console.log(
          "Added pawn capture file:",
          notation,
          "from position:",
          fromPos
        );
      }
      notation += "x";
    }

    notation += toPos;

    if (this.promotedTo) {
      notation += "=" + this.promotedTo;
      console.log("Added promotion:", notation);
    }

    if (isCheckmate) {
      console.log("Adding checkmate symbol to notation");
      notation += "#";
    } else if (isCheck) {
      console.log("Adding check symbol to notation");
      notation += "+";
    }

    if (isEnPassant) {
      notation += " e.p.";
      console.log("Added en passant:", notation);
    }

    console.log("Final notation with symbols:", notation);
    return notation;
  }

  addMove(
    piece,
    fromPos,
    toPos,
    isCapture,
    isCheck,
    isCheckmate,
    isCastle,
    promotedTo = null,
    isEnPassant = false
  ) {
    console.log("Adding move with checkmate status:", isCheckmate);

    this.promotedTo = promotedTo;
    const notation = this.convertPositionToNotation(
      piece,
      fromPos,
      toPos,
      isCapture,
      isCheck,
      isCheckmate,
      isCastle,
      isEnPassant
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

    scoresheet.scrollTop = scoresheet.scrollHeight;
  }
}

export { Scoresheet };
