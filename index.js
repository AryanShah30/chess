import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/global.js";
import { ChessClock } from "./Components/ChessClock.js";
import { createClockSetup } from "./Components/ClockSetup.js";
import { Scoresheet } from "./Components/Scoresheet.js";
import { createThemeSetup } from "./Components/ThemeSetup.js";

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

// Add this after line 64
createThemeSetup();

// Load saved theme preferences
const loadThemes = () => {
  const whiteSquareColor = localStorage.getItem('chess-theme-white squares') || '#c5d5dc';
  const blackSquareColor = localStorage.getItem('chess-theme-black squares') || '#7a9db2';
  const highlightColor = localStorage.getItem('chess-theme-highlight color') || '#72c9dd';

  document.documentElement.style.setProperty('--white-square-color', whiteSquareColor);
  document.documentElement.style.setProperty('--black-square-color', blackSquareColor);
  document.documentElement.style.setProperty('--highlight-color', highlightColor);
};

loadThemes();

export { globalState, keySquareMapper, chessClock, scoresheet };
