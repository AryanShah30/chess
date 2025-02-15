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

class ModalCreator {
  constructor(body) {
    if (!body) {
      throw new Error("Please pass the body");
    }

    this.open = false;

    this.body = body;
  }

  show() {
    this.open = true;

    document.body.appendChild(this.body);

    document.getElementById("root").classList.add("blur");
  }

  hide() {
    this.open = false;

    document.body.removeChild(this.body);

    document.getElementById("root").classList.remove("blur");
  }
}

export function pawnPromotion(color, callback) {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "promotion-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "promotion-modal";

  const pieces = color === "white" 
    ? [whiteQueen, whiteRook, whiteBishop, whiteKnight]
    : [blackQueen, blackRook, blackBishop, blackKnight];

  pieces.forEach((Constructor) => {
    const pieceDiv = document.createElement("div");
    pieceDiv.className = "promotion-piece";

    const img = document.createElement("img");
    const tempPiece = Constructor("temp");
    img.src = tempPiece.img;

    pieceDiv.appendChild(img);
    pieceDiv.addEventListener("click", () => {
      modalOverlay.remove();
      callback(Constructor);  // The callback will receive the Constructor
    });

    modalContent.appendChild(pieceDiv);
  });

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

function callbackPawnPromotion(newPiece, id) {
  console.log("Callback called with:", newPiece, id);
  if (typeof newPiece === "function") {
    const piece = newPiece(id);
  } else {
    console.error("Expected a function to create a piece, but got:", newPiece);
  }
}

