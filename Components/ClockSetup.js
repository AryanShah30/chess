import { initGame } from "../Data/data.js";
import { initGameRender } from "../Render/main.js";
import { globalEvent } from "../Events/global.js";

function createClockSetup(onGameStart) {
  const setupHTML = `
    <div class="clock-setup-overlay" style="display: none;">
      <div class="clock-setup-modal">
        <div class="setup-header">
          <h2>
            <img src="Assets/images/chess-clock.png" alt="Clock" class="header-icon">
            Game Setup
          </h2>
          <button class="close-setup-btn">CLOSE</button>
        </div>
        <div class="setup-disclaimer">
          ⚠️ Starting a new game will reset the current game
        </div>
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
        <div class="button-container">
          <button id="start-game">Start Game</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", setupHTML);

  const setupStyle = document.createElement("style");
  setupStyle.textContent = `
    .setup-header h2 {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-icon {
      width: 24px;
      height: 24px;
    }

    .header-icon {
      filter: none;
    }

    .setup-disclaimer {
      background-color: #fff3cd;
      color: #856404;
      padding: 12px;
      margin: 12px 0;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
    }

    [data-theme="dark"] .header-icon {
      filter: brightness(0) invert(1);
    }

    [data-theme="dark"] .setup-disclaimer {
      background-color: #382f1a;
      color: #ffd970;
    }
  `;
  document.head.appendChild(setupStyle);

  const gameSetupBtn = document.querySelector(".game-setup-btn");
  if (gameSetupBtn) {
    gameSetupBtn.addEventListener("click", () => {
      document.querySelector(".clock-setup-overlay").style.display = "flex";
    });
  }

  const closeBtn = document.querySelector(".close-setup-btn");
  const setupOverlay = document.querySelector(".clock-setup-overlay");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      setupOverlay.style.display = "none";
    });
  }

  const gameStartBtn = document.getElementById("start-game");
  if (gameStartBtn) {
    gameStartBtn.addEventListener("click", () => {
      const p1Input = document.getElementById("player1-name-input").value;
      const p2Input = document.getElementById("player2-name-input").value;

      const p1Name = p1Input !== "" ? p1Input : "Player 1";
      const p2Name = p2Input !== "" ? p2Input : "Player 2";

      const p1Time =
        (parseInt(document.getElementById("player1-hours").value || 0) * 3600 +
          parseInt(document.getElementById("player1-minutes").value || 10) *
            60 +
          parseInt(document.getElementById("player1-seconds").value || 0)) *
        1000;

      const p2Time =
        (parseInt(document.getElementById("player2-hours").value || 0) * 3600 +
          parseInt(document.getElementById("player2-minutes").value || 10) *
            60 +
          parseInt(document.getElementById("player2-seconds").value || 0)) *
        1000;

      const p1Inc = parseInt(
        document.getElementById("player1-increment").value || 0
      );
      const p2Inc = parseInt(
        document.getElementById("player2-increment").value || 0
      );

      const rootDiv = document.getElementById("root");
      while (rootDiv.firstChild) {
        rootDiv.removeChild(rootDiv.firstChild);
      }

      const globalState = initGame();
      initGameRender(globalState);
      globalEvent();

      const timerBtn = document.querySelector(".timer-button");
      if (timerBtn) {
        timerBtn.classList.remove("active");
        timerBtn.setAttribute("title", timerBtn.dataset.stopTitle);
      }

      onGameStart(p1Name, p2Name, p1Time, p2Time, p1Inc, p2Inc);
      document.querySelector(".clock-setup-overlay").style.display = "none";
    });
  }
}

export { createClockSetup };
