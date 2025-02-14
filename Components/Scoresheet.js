class Scoresheet {
    constructor() {
        this.moves = [];
        this.currentMove = 1;
    }

    getPieceSymbol(piece) {
        // Standard chess notation uses:
        // K for King
        // Q for Queen
        // R for Rook
        // B for Bishop
        // N for Knight
        // (no symbol) for Pawn
        if (piece.piece_name.includes('PAWN')) {
            return '';
        } else if (piece.piece_name.includes('KNIGHT')) {
            return 'N';
        } else if (piece.piece_name.includes('BISHOP')) {
            return 'B';
        } else if (piece.piece_name.includes('ROOK')) {
            return 'R';
        } else if (piece.piece_name.includes('QUEEN')) {
            return 'Q';
        } else if (piece.piece_name.includes('KING')) {
            return 'K';
        }
    }

    convertPositionToNotation(piece, fromPos, toPos, isCapture, isCheck, isCheckmate, isCastle) {
        if (isCastle) {
            return toPos[0] === 'g' ? 'O-O' : 'O-O-O';
        }

        let notation = '';
        
        // Add piece symbol (except for pawns)
        if (!piece.piece_name.includes('PAWN')) {
            notation += piece.piece_name[0];
        }
        
        // Add capture symbol
        if (isCapture) {
            if (piece.piece_name.includes('PAWN')) {
                notation += fromPos[0];
            }
            notation += 'x';
        }
        
        // Add destination square
        notation += toPos;
        
        // Add check or checkmate symbol
        if (isCheckmate) {
            notation += '#';
        } else if (isCheck) {
            notation += '+';
        }

        return notation;
    }

    addMove(piece, fromPos, toPos, isCapture, isCheck, isCheckmate, isCastle) {
        const notation = this.convertPositionToNotation(
            piece, fromPos, toPos, isCapture, isCheck, isCheckmate, isCastle
        );

        const isWhite = piece.piece_name.includes('WHITE');
        
        if (isWhite) {
            this.moves.push({ white: notation, black: '' });
        } else {
            if (this.moves.length === 0 || this.moves[this.moves.length - 1].black) {
                this.moves.push({ white: '...', black: notation });
            } else {
                this.moves[this.moves.length - 1].black = notation;
            }
        }

        this.render();
    }

    render() {
        const scoresheet = document.getElementById('scoresheet');
        
        // Keep the header row
        while (scoresheet.children.length > 1) {
            scoresheet.removeChild(scoresheet.lastChild);
        }

        this.moves.forEach((move, index) => {
            const moveRow = document.createElement('div');
            moveRow.className = 'move-row';

            const moveNumber = document.createElement('div');
            moveNumber.className = 'move-number';
            moveNumber.textContent = index + 1;

            const whiteMove = document.createElement('div');
            whiteMove.className = 'move';
            if (index === this.moves.length - 1 && !move.black) {
                whiteMove.classList.add('last');
            }
            whiteMove.textContent = move.white;

            const blackMove = document.createElement('div');
            blackMove.className = 'move';
            if (index === this.moves.length - 1 && move.black) {
                blackMove.classList.add('last');
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