import { updatePieceImages } from "../Render/main.js";
import { flipBoard } from "../Render/main.js";
import { chessClock } from "../index.js";
import { createBugReportModal } from "../Helper/bugReportModal.js";

const pieceThemes = [
  "alpha",
  "anarcandy",
  "cburnett",
  "celtic",
  "chess7",
  "chessnut",
  "companion",
  "cooke",
  "default",
  "dubrovny",
  "fantasy",
  "fresca",
  "gioco",
  "governor",
  "horsey",
  "icpieces",
  "kiwen-suwi",
  "kosal",
  "leipzig",
  "letter",
  "maestro",
  "merida",
  "monarchy",
  "mono",
  "mpchess",
  "pirouetti",
  "pixel",
  "riohacha",
  "shapes",
  "spatial",
  "staunty",
  "tatiana",
];

function createThemeSetup() {
  const defaultColors = {
    "white squares": "#c5d5dc",
    "black squares": "#7a9db2",
    "highlight color": "#72c9dd",
  };

  if (!localStorage.getItem("chess-theme-white squares")) {
    localStorage.setItem(
      "chess-theme-white squares",
      defaultColors["white squares"]
    );
  }
  if (!localStorage.getItem("chess-theme-black squares")) {
    localStorage.setItem(
      "chess-theme-black squares",
      defaultColors["black squares"]
    );
  }
  if (!localStorage.getItem("chess-theme-highlight color")) {
    localStorage.setItem(
      "chess-theme-highlight color",
      defaultColors["highlight color"]
    );
  }

  const settingsButtonHTML = `
    <div class="board-controls">
      <button class="mobile-nav-toggle" aria-label="Toggle navigation">☰</button>
      <button class="settings-button" title="Settings">
        <img src="Assets/images/settings.png" alt="Settings" />
      </button>
      <button class="flip-button" title="Flip Board">⟳</button>
      <button class="timer-button" title="Stop Clock" data-start-title="Start Clock" data-stop-title="Stop Clock">
        <img src="Assets/images/timer.png" alt="Timer" />
      </button>
      <button class="theme-toggle-button" title="Switch Theme">
        <img src="Assets/images/dark-mode.png" alt="Theme Toggle" />
      </button>
      <button class="contact-button" title="Contact">
        <img src="Assets/images/contact.png" alt="Contact" />
      </button>
      <button class="code-button" title="GitHub" onclick="window.open('https://github.com/AryanShah30/chess', '_blank')">
        <img src="Assets/images/code.png" alt="GitHub" />
      </button>
      <button class="bug-report-button theme-toggle-button" title="Report Bugs">
        <img src="Assets/images/bug.png" alt="Report Bugs" />
      </button>
    </div>
  `;

  const themeModalHTML = `
    <div class="theme-modal">
      <div class="theme-modal-content">
        <div class="theme-header">
          <h3><img src="Assets/images/settings.png" alt="Settings" class="header-icon">Settings</h3>
          <div class="theme-header-buttons">
            <button class="reset-button" title="Reset to default">Reset</button>
            <button class="apply-button" title="Apply changes">Apply</button>
          </div>
        </div>

        <div class="theme-section">
          <div class="theme-section-header" data-section="game">
            <h4>
              <img src="Assets/images/game-settings.png" alt="Game Settings" class="section-icon">
              Game Settings
            </h4>
            <button class="dropdown-toggle">
              <img src="Assets/images/drop-down.png" alt="dropdown" class="arrow">
            </button>
          </div>

          <div class="theme-section-content game-settings">
            <div class="setting-option" id="flip-board-container">
              <label class="setting-label">
                <span 
                  class="flip-icon ${
                    localStorage.getItem("chess-flip-board") === "true"
                      ? "active"
                      : ""
                  }" 
                  id="flip-board-setting"
                >⟳</span>
                Flip Board After Each Move
              </label>
            </div>
            <div class="setting-description">
              Automatically rotates the board 180° when a player completes their turn, providing each player's perspective.
            </div>
            <div class="setting-option" id="auto-promotion-container">
              <label class="setting-label">
                <span class="setting-icon ${
                  localStorage.getItem("chess-auto-queen") === "true"
                    ? "active-green"
                    : ""
                }" id="auto-queen-setting">
                  <img src="Assets/images/queen.png" alt="Auto Queen">
                </span>
                Auto Queen Promotion
              </label>
            </div>
            <div class="setting-description" style="margin-bottom: 16px;">
              Automatically promotes pawns to queens without showing the promotion dialog.
            </div>
          </div>
        </div>

        <div class="theme-section">
          <div class="theme-section-header" data-section="board">
            <h4>
              <img src="Assets/images/board-theme.png" alt="Board Theme" class="section-icon">
              Board Theme
            </h4>
            <button class="dropdown-toggle">
              <img src="Assets/images/drop-down.png" alt="dropdown" class="arrow">
            </button>
          </div>

          <div class="theme-section-content board-themes">
            <div class="color-section">
              <div class="color-section-header">
                <h5>White Squares</h5>
                <div class="custom-color-container">
                  <input type="color" data-type="white" class="color-picker" value="#c5d5dc">
                  <button class="custom-button">CUSTOM</button>
                </div>
              </div>
              <div class="color-options">
                <button class="color-option" style="background-color: #c5d5dc;" data-type="white" data-color="#c5d5dc" title="Classic Light Blue"></button>
                <button class="color-option" style="background-color: #FFFFFF;" data-type="white" data-color="#FFFFFF" title="Pure White"></button>
                <button class="color-option" style="background-color: #E8D0B0;" data-type="white" data-color="#E8D0B0" title="Light Wood"></button>
                <button class="color-option" style="background-color: #EED7C5;" data-type="white" data-color="#EED7C5" title="Peach"></button>
                <button class="color-option" style="background-color: #F0E4D4;" data-type="white" data-color="#F0E4D4" title="Cream"></button>
                <button class="color-option" style="background-color: #F5F6E8;" data-type="white" data-color="#F5F6E8" title="Eggshell"></button>
                <button class="color-option" style="background-color: #E8E3D5;" data-type="white" data-color="#E8E3D5" title="Pearl"></button>
                <button class="color-option" style="background-color: #DFE5DC;" data-type="white" data-color="#DFE5DC" title="Sage White"></button>
                <button class="color-option" style="background-color: #E8DFE6;" data-type="white" data-color="#E8DFE6" title="Lavender White"></button>
                <button class="color-option" style="background-color: #F3E5D5;" data-type="white" data-color="#F3E5D5" title="Antique"></button>
              </div>
            </div>

            <div class="color-section">
              <div class="color-section-header">
                <h5>Black Squares</h5>
                <div class="custom-color-container">
                  <input type="color" data-type="black" class="color-picker" value="#7a9db2">
                  <button class="custom-button">CUSTOM</button>
                </div>
              </div>
              <div class="color-options">
                <button class="color-option" style="background-color: #7a9db2;" data-type="black" data-color="#7a9db2" title="Classic Blue"></button>
                <button class="color-option" style="background-color: #4B7399;" data-type="black" data-color="#4B7399" title="Deep Blue"></button>
                <button class="color-option" style="background-color: #B58863;" data-type="black" data-color="#B58863" title="Classic Wood"></button>
                <button class="color-option" style="background-color: #8B4513;" data-type="black" data-color="#8B4513" title="Dark Wood"></button>
                <button class="color-option" style="background-color: #6F4E37;" data-type="black" data-color="#6F4E37" title="Coffee"></button>
                <button class="color-option" style="background-color: #5C4033;" data-type="black" data-color="#5C4033" title="Deep Brown"></button>
                <button class="color-option" style="background-color: #4A5859;" data-type="black" data-color="#4A5859" title="Slate"></button>
                <button class="color-option" style="background-color: #4B6455;" data-type="black" data-color="#4B6455" title="Forest"></button>
                <button class="color-option" style="background-color: #4A4E4D;" data-type="black" data-color="#4A4E4D" title="Charcoal"></button>
                <button class="color-option" style="background-color: #534B4F;" data-type="black" data-color="#534B4F" title="Dark Gray"></button>
              </div>
            </div>

            <div class="color-section">
              <div class="color-section-header">
                <h5>Highlight Color</h5>
                <div class="custom-color-container">
                  <input type="color" data-type="highlight" class="color-picker" value="#72c9dd">
                  <button class="custom-button">CUSTOM</button>
                </div>
              </div>
              <div class="color-options">
                <button class="color-option" style="background-color: #72c9dd;" data-type="highlight" data-color="#72c9dd" title="Classic Blue"></button>
                <button class="color-option" style="background-color: #aaa23a;" data-type="highlight" data-color="#aaa23a" title="Olive"></button>
                <button class="color-option" style="background-color: #f7ec59;" data-type="highlight" data-color="#f7ec59" title="Yellow"></button>
                <button class="color-option" style="background-color: #ff9f40;" data-type="highlight" data-color="#ff9f40" title="Orange"></button>
                <button class="color-option" style="background-color: #90EE90;" data-type="highlight" data-color="#90EE90" title="Light Green"></button>
                <button class="color-option" style="background-color: #FFB6C1;" data-type="highlight" data-color="#FFB6C1" title="Light Pink"></button>
                <button class="color-option" style="background-color: #E6E6FA;" data-type="highlight" data-color="#E6E6FA" title="Lavender"></button>
                <button class="color-option" style="background-color: #98FB98;" data-type="highlight" data-color="#98FB98" title="Mint"></button>
                <button class="color-option" style="background-color: #DDA0DD;" data-type="highlight" data-color="#DDA0DD" title="Plum"></button>
                <button class="color-option" style="background-color: #87CEEB;" data-type="highlight" data-color="#87CEEB" title="Sky Blue"></button>
              </div>
            </div>
          </div>
        </div>

        <div class="theme-section">
          <div class="theme-section-header" data-section="pieces">
            <h4>
              <img src="Assets/images/piece-theme.png" alt="Piece Theme" class="section-icon">
              Piece Theme
            </h4>
            <button class="dropdown-toggle">
              <img src="Assets/images/drop-down.png" alt="dropdown" class="arrow">
            </button>
          </div>

          <div class="theme-section-content piece-themes">
            <div class="piece-options">
              ${pieceThemes
                .map(
                  (theme) => `
                <div class="piece-option" data-theme="${theme}" title="${theme}">
                  <img src="Assets/images/pieces/${theme}/black/bN.png" alt="${theme}">
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const contactModalHTML = `
    <div class="contact-modal">
      <div class="contact-modal-content">
        <div class="contact-header">
          <h3>
            <img src="Assets/images/contact.png" alt="Contact" class="header-icon">
            Reach Out
          </h3>
          <button class="close-contact-btn">×</button>
        </div>
        <div class="contact-links">
          <a href="https://www.linkedin.com/in/aryanashah/" target="_blank" class="contact-link">
            <img src="Assets/images/linkedin.png" alt="LinkedIn" class="contact-icon">
            <span>LinkedIn Profile</span>
          </a>
          <a href="https://github.com/AryanShah30" target="_blank" class="contact-link">
            <img src="Assets/images/github.png" alt="GitHub" class="contact-icon">
            <span>GitHub Profile</span>
          </a>
          <a href="mailto:aryanshah1957@gmail.com" class="contact-link">
            <img src="Assets/images/mail.png" alt="Email" class="contact-icon">
            <span>aryanshah1957@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  `;

  const styles = `
    .theme-section {
      border: 1px solid #3a3937;
      border-radius: 8px;
      margin-bottom: 16px;
      overflow: hidden;
    }

    .theme-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #2a2927;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .theme-section-header:hover {
      background: #3a3937;
    }

    .theme-section-header h4 {
      margin: 0;
      color: #fff;
      font-size: 16px;
    }

    .dropdown-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      margin-right: 16px;
      display: flex;
      align-items: center;
      position: relative;
      right: 8px;
    }

    .dropdown-toggle .arrow {
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
      filter: brightness(0) invert(1);
    }

    .theme-section-header.collapsed .arrow {
      transform: rotate(-90deg);
    }

    .theme-section-content {
      padding: 16px;
      background: #262522;
      transition: all 0.3s ease;
    }

    .theme-section-content.collapsed {
      padding: 0 16px;
      height: 0;
      overflow: hidden;
    }

    .color-section {
      margin-bottom: 24px;
    }

    .color-section:last-child {
      margin-bottom: 0;
    }

    .color-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .color-section-header h5 {
      margin: 0;
      color: #b4b4b4;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 600;
    }

    .custom-color-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-picker {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      padding: 0;
      margin: 0;
      pointer-events: none;
    }

    .custom-button {
      background: #3a3937;
      border: none;
      color: #fff;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: background-color 0.2s ease;
    }

    .custom-button:hover {
      background: #4a4947;
    }

    .theme-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .theme-header h3 {
      margin: 0;
      color: #fff;
      font-size: 20px;
    }

    .theme-header-buttons {
      display: flex;
      gap: 8px;
    }

    .theme-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      overflow: hidden;
    }

    .theme-modal-content {
      background: #262522;
      padding: 24px;
      border-radius: 8px;
      width: 600px;
      max-height: 80vh;
      overflow-y: hidden;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .theme-modal-content::-webkit-scrollbar {
      display: none;
    }

    .theme-modal-content:has(.theme-section-content:not(.collapsed)) {
      overflow-y: auto;
    }

    .setting-option {
      padding: 12px 16px;
      border-bottom: 1px solid #3a3937;
    }

    .setting-option:last-child {
      border-bottom: none;
    }

    .setting-label {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      cursor: pointer;
    }

    .setting-label input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .flip-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      opacity: 0.5;
      cursor: pointer;
      user-select: none;
    }

    .flip-icon.active {
      opacity: 1;
      color: #4caf50;
      text-shadow: 0 0 2px rgba(76, 175, 80, 0.5);
    }

    .flip-icon:hover {
      transform: rotate(180deg);
    }

    .timer-button {
      background: var(--button-bg, #ffffff);
      border: 1px solid var(--border-color, #d1d9e6);
      border-radius: 8px;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      width: 37px;
      height: 37px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .timer-button img {
      width: 24px;
      height: 24px;
      filter: ${
        localStorage.getItem("chess-theme-mode") === "light"
          ? "brightness(0) invert(1)"
          : "none"
      };
    }

    .timer-button:hover {
      background: var(--button-hover, #f0f0f0);
    }

    .timer-button.active {
      background: #4caf50;
      border-color: #45a049;
    }

    .timer-button.active img {
      filter: brightness(0) invert(1);
    }

    .theme-toggle-button {
      background: var(--button-bg, #ffffff);
      border: 1px solid var(--border-color, #d1d9e6);
      border-radius: 8px;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      width: 38px;
      height: 38px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .theme-toggle-button img {
      width: 20px;
      height: 20px;
      filter: ${
        localStorage.getItem("chess-theme-mode") === "light"
          ? "brightness(0) invert(1)"
          : "none"
      };
    }

    .theme-toggle-button:hover {
      background: var(--button-hover, #f0f0f0);
    }

    .theme-toggle-button.active {
      background: #4caf50;
      border-color: #45a049;
    }

    .clock-setup-modal h2,
    .clock-setup-modal h3,
    .clock-setup-modal label {
      color: var(--modal-text-color) !important;
    }

    .clock-setup-modal input[type="text"],
    .clock-setup-modal input[type="number"] {
      color: var(--modal-text-color) !important;
    }

    .clock-setup-modal input::placeholder {
      color: var(--modal-text-color) !important;
      opacity: 0.7;
    }

    .section-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      vertical-align: middle;
    }

    .theme-section-header h4 {
      display: flex;
      align-items: center;
    }

    .contact-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    }

    .contact-modal-content {
      background: var(--container-bg-color);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border-color);
    }

    .contact-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .contact-header h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      color: var(--text-color);
      font-size: 18px;
    }

    .close-contact-btn {
      background: none;
      border: none;
      color: var(--text-color);
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      text-decoration: none;
      color: var(--text-color);
      background: var(--button-bg);
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .contact-link:hover {
      background: var(--button-hover);
      transform: translateY(-2px);
    }

    .contact-icon {
      width: 24px;
      height: 24px;
      filter: var(--icon-filter);
    }

    [data-theme="dark"] .contact-icon {
      filter: brightness(0) invert(1);
    }

    .contact-button {
      background: var(--button-bg, #ffffff);
      border: 1px solid var(--border-color, #d1d9e6);
      border-radius: 8px;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      width: 38px;
      height: 38px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .contact-button img {
      width: 28px;
      height: 28px;
      filter: ${
        localStorage.getItem("chess-theme-mode") === "light"
          ? "brightness(0)"
          : "none"
      };
    }

    [data-theme="dark"] .contact-button img {
      filter: brightness(0) invert(1);
    }

    .contact-button:hover {
      background: var(--button-hover, #f0f0f0);
    }

    .code-button {
      background: var(--button-bg, #ffffff);
      border: 1px solid var(--border-color, #d1d9e6);
      border-radius: 8px;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      width: 38px;
      height: 38px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .code-button img {
      width: 24px;
      height: 24px;
      filter: ${
        localStorage.getItem("chess-theme-mode") === "light"
          ? "brightness(0)"
          : "none"
      };
    }

    [data-theme="dark"] .code-button img {
      filter: brightness(0) invert(1);
    }

    .code-button:hover {
      background: var(--button-hover, #f0f0f0);
    }

    .setting-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .setting-status {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    [data-theme="dark"] .setting-status {
      color: var(--dark-secondary-text-color);
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  document
    .querySelector(".chess-container")
    .insertAdjacentHTML("beforeend", settingsButtonHTML);
  document.body.insertAdjacentHTML("beforeend", themeModalHTML);
  document.body.insertAdjacentHTML("beforeend", contactModalHTML);

  const flipBtn = document.querySelector(".flip-button");
  const settingsBtn = document.querySelector(".settings-button");
  const themeModal = document.querySelector(".theme-modal");
  const applyBtn = document.querySelector(".apply-button");
  const resetBtn = document.querySelector(".reset-button");
  const colorOptions = document.querySelectorAll(".color-option");
  const customButtons = document.querySelectorAll(".custom-button");
  const colorPickers = document.querySelectorAll(".color-picker");
  const contactBtn = document.querySelector(".contact-button");
  const contactModal = document.querySelector(".contact-modal");
  const closeContactBtn = document.querySelector(".close-contact-btn");

  themeModal.style.display = "none";

  settingsBtn.addEventListener("click", () => {
    const isDarkMode = localStorage.getItem("chess-theme-mode") === "dark";

    if (!isDarkMode) {
      const modalStyle = document.createElement("style");
      modalStyle.id = "modal-style";
      modalStyle.textContent = `
        .theme-modal-content {
          background-color: #ffffff !important;
          color: #333333 !important;
        }
        .theme-section-header h4,
        .theme-header h3 {
          color: #333333 !important;
        }
        .theme-section-header {
          background-color: #f0f0f0 !important;
          border-bottom: 1px solid #e0e0e0 !important;
        }
        .theme-section-content {
          background-color: #f8f9fa !important;
        }
        .setting-label {
          color: #333333 !important;
        }
        .setting-description {
          color: #666666 !important;
        }
        .section-icon {
          filter: none !important; 
        }
      `;
      const oldStyle = document.getElementById("modal-style");
      if (oldStyle) oldStyle.remove();
      document.head.appendChild(modalStyle);
    } else {
      const modalStyle = document.createElement("style");
      modalStyle.id = "modal-style";
      modalStyle.textContent = `
        .theme-modal-content {
          background-color: #262522 !important;
          color: #ffffff !important;
        }
        .theme-section-header h4,
        .theme-header h3 {
          color: #ffffff !important;
        }
        .theme-section-header {
          background-color: #2a2927 !important;
          border-bottom: 1px solid #3a3937 !important;
        }
        .theme-section-content {
          background-color: #262522 !important;
        }
        .setting-label {
          color: #ffffff !important;
        }
        .setting-description {
          color: #b4b4b4 !important;
        }
        .section-icon {
          filter: brightness(0) invert(1) !important; 
        }
        .color-option:hover::after,
        .piece-option:hover::after {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        #flip-board-container .setting-label {
          color: #ffffff !important; 
        }
        .piece-option {
          background: #3a3937 !important; 
          border: 2px solid #4a4947 !important; 
          border-radius: 4px; 
        }
        .piece-option img[src*="bN.png"] {
          background-color: #3a3937 !important; 
          border-radius: 4px; 
        }
        .piece-options {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
        }
        .custom-button {
          background: #3a3937 !important;
          color: #ffffff !important;
          border: 1px solid #4a4947 !important;
        }
        .custom-button:hover {
          background: #4a4947 !important;
        }
      `;
      const oldStyle = document.getElementById("modal-style");
      if (oldStyle) oldStyle.remove();
      document.head.appendChild(modalStyle);
    }

    themeModal.style.display = "flex";
    document.querySelector(".theme-modal-content").scrollTop = 0;

    document.querySelectorAll(".theme-section-header").forEach((header) => {
      header.classList.add("collapsed");
      header.nextElementSibling.classList.add("collapsed");
      header.nextElementSibling.scrollTop = 0;
    });
  });

  applyBtn.addEventListener("click", () => {
    themeModal.style.display = "none";

    document.querySelectorAll(".theme-section-header").forEach((header) => {
      header.classList.add("collapsed");
      header.nextElementSibling.classList.add("collapsed");
    });
  });

  resetBtn.addEventListener("click", () => {
    localStorage.setItem("chess-flip-board", "false");
    const flipIcon = document.getElementById("flip-board-setting");
    flipIcon.classList.remove("active");

    localStorage.setItem(
      "chess-theme-white squares",
      defaultColors["white squares"]
    );
    localStorage.setItem(
      "chess-theme-black squares",
      defaultColors["black squares"]
    );
    localStorage.setItem(
      "chess-theme-highlight color",
      defaultColors["highlight color"]
    );

    localStorage.setItem("chess-theme-piece-style", "default");

    localStorage.setItem("chess-auto-queen", "false");
    const autoPromotionIcon = document.querySelector(
      "#auto-promotion-container .setting-icon"
    );
    if (autoPromotionIcon) {
      autoPromotionIcon.classList.remove("active-green");
    }

    updateColors();
    updatePieceImages();
  });

  const updateColors = () => {
    const whiteColor = localStorage.getItem("chess-theme-white squares");
    const blackColor = localStorage.getItem("chess-theme-black squares");
    const highlightColor = localStorage.getItem("chess-theme-highlight color");

    document.documentElement.style.setProperty(
      "--white-square-color",
      whiteColor
    );
    document.documentElement.style.setProperty(
      "--black-square-color",
      blackColor
    );
    document.documentElement.style.setProperty(
      "--highlight-color",
      highlightColor
    );

    document.querySelectorAll(".white").forEach((square) => {
      square.style.backgroundColor = whiteColor;
    });

    document.querySelectorAll(".black").forEach((square) => {
      square.style.backgroundColor = blackColor;
    });
  };

  colorOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      const color = e.target.dataset.color;
      const type = e.target.dataset.type;

      switch (type) {
        case "white":
          localStorage.setItem("chess-theme-white squares", color);
          break;
        case "black":
          localStorage.setItem("chess-theme-black squares", color);
          break;
        case "highlight":
          localStorage.setItem("chess-theme-highlight color", color);
          break;
      }

      updateColors();
    });
  });

  customButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      colorPickers[index].click();
    });
  });

  colorPickers.forEach((picker) => {
    picker.addEventListener("input", (e) => {
      const color = e.target.value;
      const type = e.target.dataset.type;

      switch (type) {
        case "white":
          localStorage.setItem("chess-theme-white squares", color);
          break;
        case "black":
          localStorage.setItem("chess-theme-black squares", color);
          break;
        case "highlight":
          localStorage.setItem("chess-theme-highlight color", color);
          break;
      }

      updateColors();
    });
  });

  themeModal.addEventListener("click", (e) => {
    if (e.target === themeModal) {
      themeModal.style.display = "none";

      document.querySelectorAll(".theme-section-header").forEach((header) => {
        header.classList.add("collapsed");
        header.nextElementSibling.classList.add("collapsed");
      });
    }
  });

  document.querySelectorAll(".theme-section-header").forEach((header) => {
    header.classList.add("collapsed");
    const content = header.nextElementSibling;
    content.classList.add("collapsed");

    header.addEventListener("click", () => {
      document
        .querySelectorAll(".theme-section-header")
        .forEach((otherHeader) => {
          if (otherHeader !== header) {
            otherHeader.classList.add("collapsed");
            otherHeader.nextElementSibling.classList.add("collapsed");
          }
        });

      header.classList.toggle("collapsed");
      content.classList.toggle("collapsed");
    });
  });

  const pieceHeader = document.querySelector('[data-section="pieces"]');
  const pieceContent = pieceHeader.nextElementSibling;
  pieceHeader.classList.add("collapsed");
  pieceContent.classList.add("collapsed");

  updateColors();

  const pieceOptions = document.querySelectorAll(".piece-option");
  pieceOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      const theme = e.currentTarget.dataset.theme;

      localStorage.setItem("chess-theme-piece-style", theme);

      pieceOptions.forEach((opt) => opt.classList.remove("selected"));
      e.currentTarget.classList.add("selected");

      updatePieceImages();
    });
  });

  const flipBoardContainer = document.getElementById("flip-board-container");
  const flipBoardIcon = document.getElementById("flip-board-setting");

  flipBoardContainer.addEventListener("click", () => {
    const currentState = localStorage.getItem("chess-flip-board") === "true";
    const newState = !currentState;
    localStorage.setItem("chess-flip-board", newState);
    flipBoardIcon.classList.toggle("active");
  });

  flipBtn.addEventListener("click", () => {
    flipBtn.classList.toggle("active");
    flipBoard();
  });

  const timerBtn = document.querySelector(".timer-button");
  timerBtn.addEventListener("click", function () {
    const isActive = this.classList.toggle("active");
    if (isActive) {
      this.setAttribute("title", this.dataset.startTitle);
      if (chessClock) chessClock.pause();
    } else {
      this.setAttribute("title", this.dataset.stopTitle);
      if (chessClock) chessClock.resume();
    }
  });

  const themeToggleBtn = document.querySelector(".theme-toggle-button");
  themeToggleBtn.addEventListener("click", async () => {
    document.body.style.opacity = "0.5";
    document.body.style.transition = "opacity 0.2s ease";

    await new Promise((resolve) => setTimeout(resolve, 50));

    themeToggleBtn.classList.toggle("active");
    const isDarkMode = themeToggleBtn.classList.contains("active");
    const newTheme = isDarkMode ? "dark" : "light";

    localStorage.setItem("chess-theme-mode", newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);

    const themeIcon = themeToggleBtn.querySelector("img");
    themeIcon.src = `Assets/images/${
      isDarkMode ? "light-mode.png" : "dark-mode.png"
    }`;

    const existingModalStyle = document.getElementById("modal-style");
    if (existingModalStyle) {
      existingModalStyle.remove();
    }

    const modalStyle = document.createElement("style");
    modalStyle.id = "modal-style";
    modalStyle.textContent = isDarkMode ? darkModeStyles : lightModeStyles;
    document.head.appendChild(modalStyle);

    document.body.style.opacity = "1";
  });

  const lightModeStyles = `
    .theme-modal-content {
      background-color: #ffffff !important;
      color: #333333 !important;
    }

  `;

  const darkModeStyles = `
    .theme-modal-content {
      background-color: #262522 !important;
      color: #ffffff !important;
    }

  `;

  if (!localStorage.getItem("chess-theme-mode")) {
    localStorage.setItem("chess-theme-mode", "light");
  }

  const initialTheme = localStorage.getItem("chess-theme-mode");
  document.documentElement.setAttribute("data-theme", initialTheme);

  if (initialTheme === "dark") {
    themeToggleBtn.classList.add("active");
    const themeIcon = themeToggleBtn.querySelector("img");
    if (themeIcon) {
      themeIcon.src = "Assets/images/light-mode.png";
    }
  }

  contactBtn.addEventListener("click", () => {
    contactModal.style.display = "flex";
  });

  closeContactBtn.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
  });

  function setupMobileNavigation() {
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const boardControls = document.querySelector(".board-controls");

    if (!mobileNavToggle || !boardControls) return;

    const modalHTML = `
      <div class="mobile-nav-modal" style="display: none;">
        <div class="mobile-nav-content">
          <div class="modal-header">
            <button class="doc-close-btn">CLOSE</button>
          </div>
          <div class="nav-buttons">
          <div class="nav-button" data-action="settings">
          <img src="Assets/images/game-settings.png" alt="Game Settings" class="section-icon">
              <span>Game Settings</span>
              <div class="button-description">Customize settings and themes</div>
          </div>
            <div class="nav-button" data-action="flip">
              <img src="Assets/images/reset.png" alt="Flip Board" />
              <span>Flip Board</span>
              <div class="button-description">Rotate the board 180 degrees</div>
            </div>
            <div class="nav-button" data-action="timer">
              <img src="Assets/images/timer.png" alt="Clock Control" />
              <span>Clock Control</span>
              <div class="button-description">Control game clock to start and stop</div>
            </div>
            <div class="nav-button" data-action="theme">
              <img src="Assets/images/dark-mode.png" alt="Theme" />
              <span>Theme</span>
              <div class="button-description">Switch between light and dark mode</div>
            </div>
            <div class="nav-button" data-action="contact">
              <img src="Assets/images/contact.png" alt="Contact" />
              <span>Contact</span>
              <div class="button-description">Get in touch</div>
            </div>
            <div class="nav-button" data-action="github">
              <img src="Assets/images/code.png" alt="GitHub" />
              <span>GitHub</span>
              <div class="button-description">View source code</div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (!document.querySelector(".mobile-nav-modal")) {
      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    const modal = document.querySelector(".mobile-nav-modal");
    const modalClose = modal.querySelector(".doc-close-btn");

    mobileNavToggle.replaceWith(mobileNavToggle.cloneNode(true));

    const newToggle = document.querySelector(".mobile-nav-toggle");

    newToggle.addEventListener("click", () => {
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("active");
      }, 10);
    });

    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    });

    const navButtons = modal.querySelectorAll(".nav-button");
    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;

        switch (action) {
          case "settings":
            document.querySelector(".settings-button").click();
            break;
          case "flip":
            const flipBtn = document.querySelector(".flip-button");
            flipBtn.click();
            button.classList.toggle(
              "active",
              flipBtn.classList.contains("active")
            );
            break;
          case "timer":
            const timerBtn = document.querySelector(".timer-button");
            timerBtn.click();
            button.classList.toggle(
              "active",
              timerBtn.classList.contains("active")
            );
            break;
          case "theme":
            const themeBtn = document.querySelector(".theme-toggle-button");
            themeBtn.click();
            button.classList.toggle(
              "active",
              themeBtn.classList.contains("active")
            );
            break;
          case "contact":
            document.querySelector(".contact-button").click();
            break;
          case "github":
            window.open("https://github.com/AryanShah30/chess", "_blank");
            break;
        }

        setTimeout(() => {
          modal.classList.remove("active");
          setTimeout(() => {
            modal.style.display = "none";
          }, 300);
        }, 100);
      });
    });

    newToggle.addEventListener("click", () => {
      modal.style.display = "flex";

      const flipBtn = document.querySelector(".flip-button");
      const timerBtn = document.querySelector(".timer-button");
      const themeBtn = document.querySelector(".theme-toggle-button");

      modal
        .querySelector('[data-action="flip"]')
        .classList.toggle("active", flipBtn.classList.contains("active"));
      modal
        .querySelector('[data-action="timer"]')
        .classList.toggle("active", timerBtn.classList.contains("active"));
      modal
        .querySelector('[data-action="theme"]')
        .classList.toggle("active", themeBtn.classList.contains("active"));

      setTimeout(() => {
        modal.classList.add("active");
      }, 10);
    });
  }

  setupMobileNavigation();

  window.addEventListener("resize", setupMobileNavigation);

  const autoPromotionContainer = document.querySelector(
    "#auto-promotion-container"
  );
  if (autoPromotionContainer) {
    autoPromotionContainer.addEventListener("click", () => {
      const icon = autoPromotionContainer.querySelector(".setting-icon");
      const currentValue = localStorage.getItem("chess-auto-queen") === "true";
      localStorage.setItem("chess-auto-queen", !currentValue);
      icon.classList.toggle("active-green");
    });
  }

  const bugReportButton = document.querySelector(".bug-report-button");
  bugReportButton.addEventListener("click", () => {
    createBugReportModal();
  });
}

export { createThemeSetup };
