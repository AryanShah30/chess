import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/global.js";

const globalState = initGame();

let keySquareMapper = {};

globalState.flat().forEach((square) => {
  keySquareMapper[square.id] = square;
});

initGameRender(globalState);

globalEvent();

export { globalState, keySquareMapper };
