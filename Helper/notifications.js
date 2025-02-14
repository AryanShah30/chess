function createNotificationModal(message, isGameOver = false) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'notification-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'notification-modal';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    modalContent.appendChild(messageText);
    
    if (isGameOver) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const resetButton = document.createElement('button');
        resetButton.textContent = 'New Game';
        resetButton.onclick = () => location.reload();
        
        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continue';
        continueButton.onclick = () => modalOverlay.remove();
        
        buttonContainer.appendChild(resetButton);
        buttonContainer.appendChild(continueButton);
        modalContent.appendChild(buttonContainer);
    } else {
        setTimeout(() => {
            modalOverlay.remove();
        }, 2000);
    }
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

export { createNotificationModal }; 