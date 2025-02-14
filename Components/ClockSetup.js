function createClockSetup(onGameStart) {
    const setupHTML = `
        <div class="clock-setup-overlay">
            <div class="clock-setup-modal">
                <h2>Game Setup</h2>
                <div class="player-setup">
                    <h3>Player 1 (White)</h3>
                    <input type="text" id="player1-name" placeholder="Player 1" value="Player 1">
                    <div class="time-setup">
                        <input type="number" id="player1-hours" min="0" max="10" value="0" placeholder="Hours">
                        <input type="number" id="player1-minutes" min="0" max="59" value="10" placeholder="Minutes">
                        <input type="number" id="player1-seconds" min="0" max="59" value="0" placeholder="Seconds">
                        <input type="number" id="player1-increment" min="0" max="60" value="0" placeholder="Increment (seconds)">
                    </div>
                </div>
                <div class="player-setup">
                    <h3>Player 2 (Black)</h3>
                    <input type="text" id="player2-name" placeholder="Player 2" value="Player 2">
                    <div class="time-setup">
                        <input type="number" id="player2-hours" min="0" max="10" value="0" placeholder="Hours">
                        <input type="number" id="player2-minutes" min="0" max="59" value="10" placeholder="Minutes">
                        <input type="number" id="player2-seconds" min="0" max="59" value="0" placeholder="Seconds">
                        <input type="number" id="player2-increment" min="0" max="60" value="0" placeholder="Increment (seconds)">
                    </div>
                </div>
                <button id="start-game">Start Game</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', setupHTML);

    document.getElementById('start-game').addEventListener('click', () => {
        const player1Name = document.getElementById('player1-name').value || "Player 1";
        const player2Name = document.getElementById('player2-name').value || "Player 2";
        
        const player1Time = 
            (parseInt(document.getElementById('player1-hours').value || 0) * 3600 +
            parseInt(document.getElementById('player1-minutes').value || 10) * 60 +
            parseInt(document.getElementById('player1-seconds').value || 0)) * 1000;
            
        const player2Time = 
            (parseInt(document.getElementById('player2-hours').value || 0) * 3600 +
            parseInt(document.getElementById('player2-minutes').value || 10) * 60 +
            parseInt(document.getElementById('player2-seconds').value || 0)) * 1000;
            
        const player1Increment = parseInt(document.getElementById('player1-increment').value || 0);
        const player2Increment = parseInt(document.getElementById('player2-increment').value || 0);

        document.querySelector('.clock-setup-overlay').remove();
        onGameStart(player1Name, player2Name, player1Time, player2Time, player1Increment, player2Increment);
    });
}

export { createClockSetup }; 