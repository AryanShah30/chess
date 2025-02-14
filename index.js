import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/global.js";
import { ChessClock } from "./Components/ChessClock.js";
import { createClockSetup } from "./Components/ClockSetup.js";
import { Scoresheet } from "./Components/Scoresheet.js";

let chessClock;
let globalState;
let keySquareMapper = {};
let scoresheet;

function initializeGame(player1Name, player2Name, time1, time2, increment1, increment2) {
    // Log the received values
    console.log('Received values:', {
        player1Name,
        player2Name,
        time1,
        time2,
        increment1,
        increment2
    });

    globalState = initGame();
    
    chessClock = new ChessClock(
        player1Name, 
        player2Name, 
        time1, 
        time2, 
        increment1, 
        increment2
    );
    chessClock.start();

    // Update player names in the DOM
    const player1Element = document.getElementById('player1-name');
    const player2Element = document.getElementById('player2-name');
    
    if (player1Element) player1Element.textContent = player1Name;
    if (player2Element) player2Element.textContent = player2Name;

    // Log the DOM update
    console.log('Updated DOM with names:', {
        player1: player1Element?.textContent,
        player2: player2Element?.textContent
    });

    // Update player clock styles
    document.getElementById('player1-clock').classList.add('active');
    document.getElementById('player2-clock').classList.remove('active');

    globalState.flat().forEach((square) => {
        keySquareMapper[square.id] = square;
    });

    initGameRender(globalState);
    globalEvent();

    scoresheet = new Scoresheet();
}

// Show setup form when page loads
createClockSetup(initializeGame);

export { globalState, keySquareMapper, chessClock, scoresheet };
