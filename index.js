import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/global.js";
import { ChessClock } from "./Components/ChessClock.js";
import { createClockSetup } from "./Components/ClockSetup.js";

let chessClock;
let globalState;
let keySquareMapper = {};

function initializeGame(player1Name, player2Name, time1, time2, increment1, increment2) {
    globalState = initGame();
    
    chessClock = new ChessClock(player1Name, player2Name, time1, time2, increment1, increment2);
    chessClock.start();

    document.getElementById('player1-name').textContent = player1Name;
    document.getElementById('player2-name').textContent = player2Name;

    // Update player clock styles
    document.getElementById('player1-clock').classList.add('active');
    document.getElementById('player2-clock').classList.remove('active');

    globalState.flat().forEach((square) => {
        keySquareMapper[square.id] = square;
    });

    initGameRender(globalState);
    globalEvent();
}

// Show setup form when page loads
createClockSetup(initializeGame);

export { globalState, keySquareMapper, chessClock };
