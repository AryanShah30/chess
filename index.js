import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/global.js";
import { ChessClock } from "./Components/ChessClock.js";
import { createClockSetup } from "./Components/ClockSetup.js";
import { Scoresheet } from "./Components/Scoresheet.js";
import { createThemeSetup } from "./Components/ThemeSetup.js";
import { createDocumentation } from "./Components/Documentation.js";

let chessClock;
let globalState;
let keySquareMapper = {};
let scoresheet;

function initializeGame(
  player1Name,
  player2Name,
  time1,
  time2,
  increment1,
  increment2
) {
  console.log("Received values:", {
    player1Name,
    player2Name,
    time1,
    time2,
    increment1,
    increment2,
  });

  const rootDiv = document.getElementById("root");
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  globalState = initGame();
  initGameRender(globalState);
  globalEvent();

  keySquareMapper = {};
  globalState.flat().forEach((square) => {
    keySquareMapper[square.id] = square;
  });

  scoresheet = new Scoresheet();

  chessClock = new ChessClock(
    player1Name,
    player2Name,
    time1,
    time2,
    increment1,
    increment2
  );

  const player1Element = document.getElementById("player1-name");
  const player2Element = document.getElementById("player2-name");
  if (player1Element) player1Element.textContent = player1Name;
  if (player2Element) player2Element.textContent = player2Name;

  document.getElementById("player1-clock").classList.add("active");
  document.getElementById("player2-clock").classList.remove("active");

  chessClock.start();
}

document.addEventListener("DOMContentLoaded", () => {
  createDocumentation();

  globalState = initGame();
  initGameRender(globalState);
  globalEvent();

  globalState.flat().forEach((square) => {
    keySquareMapper[square.id] = square;
  });

  createClockSetup(initializeGame);

  createThemeSetup();

  initializeTheme();
  loadThemes();
});

const loadThemes = () => {
  const whiteSquareColor =
    localStorage.getItem("chess-theme-white squares") || "#c5d5dc";
  const blackSquareColor =
    localStorage.getItem("chess-theme-black squares") || "#7a9db2";
  const highlightColor =
    localStorage.getItem("chess-theme-highlight color") || "#72c9dd";

  document.documentElement.style.setProperty(
    "--white-square-color",
    whiteSquareColor
  );
  document.documentElement.style.setProperty(
    "--black-square-color",
    blackSquareColor
  );
  document.documentElement.style.setProperty(
    "--highlight-color",
    highlightColor
  );
};

function initializeTheme() {
  document.body.removeAttribute("data-theme");

  const savedTheme = localStorage.getItem("chess-theme") || "light";
  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
  }
}

export { globalState, keySquareMapper, chessClock, scoresheet };
