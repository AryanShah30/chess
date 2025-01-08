// initializes and manages the game's global state
// sets up a key-to-square mapping
// triggers rendering and event handling for the game

import { initGame } from "./Data/data.js"; // returns a representation of the chessboard
import { initGameRender } from "./Render/main.js"; // draws the board and pieces
import { globalEvent } from "./Events/global.js"; // sets up event listeners for user interaction

// centralized data structure representing the entire state of the game (board, pieces, their positions)
const globalState = initGame();

// used for quick lookup of squares by their id (used as performance optimizer)
let keySquareMapper = {};

// flattens the 2D array into 1D array for easy iteration
globalState.flat().forEach((square) => {
  // dictionary mapping square.id to its corresponding square object
  keySquareMapper[square.id] = square;
});

// calls the rendering function to display the initial state of game board
initGameRender(globalState);

// initializers event listeners for player interactions
globalEvent();

export { globalState, keySquareMapper };
