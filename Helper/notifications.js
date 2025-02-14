import { chessClock } from "../index.js";

function createNotificationModal(message, isGameOver = false) {
  if (chessClock) chessClock.pause();

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "notification-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "notification-modal";

  const messageText = document.createElement("p");
  messageText.textContent = message;

  modalContent.appendChild(messageText);

  if (isGameOver) {
    if (chessClock) chessClock.endGame();

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const resetButton = document.createElement("button");
    resetButton.textContent = "New Game";
    resetButton.onclick = () => location.reload();

    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.onclick = () => {
      modalOverlay.remove();
    };

    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(continueButton);
    modalContent.appendChild(buttonContainer);
  } else {
    setTimeout(() => {
      modalOverlay.remove();
      if (chessClock && !chessClock.isGameOver) chessClock.resume();
    }, 900);
  }

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

export { createNotificationModal };
