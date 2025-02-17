import { chessClock } from "../index.js";

function createNotificationModal(message, isGameOver = false) {
  if (chessClock) chessClock.pause();

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "notification-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "notification-modal";

  if (isGameOver) {
    modalContent.classList.add("game-over");
    if (message.toLowerCase().includes("stalemate")) {
      modalContent.classList.add("stalemate");
    } else if (message.toLowerCase().includes("checkmate")) {
      modalContent.classList.add("checkmate");
    }
  }

  const messageText = document.createElement("p");
  messageText.textContent = message;

  modalContent.appendChild(messageText);

  if (isGameOver) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.onclick = () => location.reload();

    const continueButton = document.createElement("button");
    continueButton.textContent = "Review Game";
    continueButton.onclick = () => modalOverlay.remove();

    buttonContainer.appendChild(newGameButton);
    buttonContainer.appendChild(continueButton);
    modalContent.appendChild(buttonContainer);
  } else {
    setTimeout(() => {
      modalOverlay.style.opacity = "0";
      modalOverlay.style.transition = "opacity 0.6s ease-out";

      setTimeout(() => {
        modalOverlay.remove();
        if (chessClock && !chessClock.isGameOver) chessClock.resume();
      }, 600);
    }, 1500);
  }

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

export { createNotificationModal };
