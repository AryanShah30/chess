function createClockSetup(onGameStart) {
    const setupHTML = `
        <div class="clock-setup-overlay">
            <div class="clock-setup-modal">
                <h2>Game Setup</h2>
                <div class="player-setup">
                    <h3>Player 1 (White)</h3>
                    <input type="text" id="player1-name-input" placeholder="Enter name">
                    <div class="time-setup">
                        <div class="time-input-group">
                            <input type="number" id="player1-hours" min="0" max="10" value="0">
                            <label>Hours</label>
                        </div>
                        <div class="time-input-group">
                            <input type="number" id="player1-minutes" min="0" max="59" value="10">
                            <label>Minutes</label>
                        </div>
                        <div class="time-input-group">
                            <input type="number" id="player1-seconds" min="0" max="59" value="0">
                            <label>Seconds</label>
                        </div>
                        <div class="time-input-group">
                            <input type="number" id="player1-increment" min="0" max="60" value="0">
                            <label>Increment</label>
                        </div>
                    </div>
                </div>
                <div class="player-setup">
                    <h3>Player 2 (Black)</h3>
                    <input type="text" id="player2-name-input" placeholder="Enter name">
                    <div class="time-setup">
                        <div class="time-input-group">
                            <input type="number" id="player2-hours" min="0" max="10" value="0">
                            <label>Hours</label>
                        </div>
                        <div class="time-input-group">
                            <input type="number" id="player2-minutes" min="0" max="59" value="10">
                            <label>Minutes</label>
                        </div>
                        <div class="time-input-group">
                            <input type="number" id="player2-seconds" min="0" max="59" value="0">
                            <label>Seconds</label>
                        </div>
                        <div class="time-input-group">
                            <input type="number" id="player2-increment" min="0" max="60" value="0">
                            <label>Increment</label>
                        </div>
                    </div>
                </div>
                <button id="start-game">Start Game</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', setupHTML);

    document.getElementById('start-game').addEventListener('click', () => {
        // Get input values
        const p1Input = document.getElementById('player1-name-input').value;
        const p2Input = document.getElementById('player2-name-input').value;

        // Use input values if they exist, otherwise use defaults
        const p1Name = p1Input !== '' ? p1Input : 'Player 1';
        const p2Name = p2Input !== '' ? p2Input : 'Player 2';
        
        const p1Time = 
            (parseInt(document.getElementById('player1-hours').value || 0) * 3600 +
            parseInt(document.getElementById('player1-minutes').value || 10) * 60 +
            parseInt(document.getElementById('player1-seconds').value || 0)) * 1000;
            
        const p2Time = 
            (parseInt(document.getElementById('player2-hours').value || 0) * 3600 +
            parseInt(document.getElementById('player2-minutes').value || 10) * 60 +
            parseInt(document.getElementById('player2-seconds').value || 0)) * 1000;
            
        const p1Inc = parseInt(document.getElementById('player1-increment').value || 0);
        const p2Inc = parseInt(document.getElementById('player2-increment').value || 0);

        console.log('Starting game with:', p1Name, p2Name, p1Time, p2Time, p1Inc, p2Inc);
        
        onGameStart(p1Name, p2Name, p1Time, p2Time, p1Inc, p2Inc);
        document.querySelector('.clock-setup-overlay').remove();
    });
}

export { createClockSetup }; 