import { updatePieceImages } from '../Render/main.js';
import { flipBoard } from '../Render/main.js';

const pieceThemes = [
  'alpha', 'anarcandy', 'caliente', 'california', 'cardinal', 'cburnett',
  'celtic', 'chess7', 'chessnut', 'companion', 'cooke', 'default',
  'dubrovny', 'fantasy', 'fresca', 'gioco', 'governor', 'horsey',
  'icpieces', 'kiwen-suwi', 'kosal', 'leipzig', 'letter', 'maestro',
  'merida', 'monarchy', 'mono', 'mpchess', 'pirouetti', 'pixel',
  'riohacha', 'shapes', 'spatial', 'staunty', 'tatiana'
];

function createThemeSetup() {
  const defaultColors = {
    'white squares': '#c5d5dc',
    'black squares': '#7a9db2',
    'highlight color': '#72c9dd'
  };

  // Set default colors if not already in localStorage
  if (!localStorage.getItem('chess-theme-white squares')) {
    localStorage.setItem('chess-theme-white squares', defaultColors['white squares']);
  }
  if (!localStorage.getItem('chess-theme-black squares')) {
    localStorage.setItem('chess-theme-black squares', defaultColors['black squares']);
  }
  if (!localStorage.getItem('chess-theme-highlight color')) {
    localStorage.setItem('chess-theme-highlight color', defaultColors['highlight color']);
  }

  const settingsButtonHTML = `
    <div class="board-controls">
      <button class="settings-button" title="Settings">
        <img src="Assets/images/settings.png" alt="Settings" />
      </button>
      <button class="flip-button" title="Flip Board">⟳</button> 
    </div>
  `;

  const themeModalHTML = `
    <div class="theme-modal">
      <div class="theme-modal-content">
        <div class="theme-header">
          <h3>Settings</h3>
          <div class="theme-header-buttons">
            <button class="reset-button" title="Reset to default">Reset</button>
            <button class="apply-button" title="Apply changes">Apply</button>
          </div>
        </div>
        
        <div class="theme-section">
          <div class="theme-section-header" data-section="game">
            <h4>Game Settings</h4>
            <button class="dropdown-toggle">
              <img src="Assets/images/drop-down.png" alt="dropdown" class="arrow">
            </button>
          </div>
          
          <div class="theme-section-content game-settings">
            <div class="setting-option" id="flip-board-container">
              <label class="setting-label">
                <span 
                  class="flip-icon ${localStorage.getItem('chess-flip-board') === 'true' ? 'active' : ''}" 
                  id="flip-board-setting"
                >⟳</span>
                Flip Board After Each Move
              </label>
            </div>
            <div class="setting-description">
              Automatically rotates the board 180° when a player completes their turn, providing each player's perspective.
            </div>
          </div>
        </div>

        <div class="theme-section">
          <div class="theme-section-header" data-section="board">
            <h4>Board Theme</h4>
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
            <h4>Piece Theme</h4>
            <button class="dropdown-toggle">
              <img src="Assets/images/drop-down.png" alt="dropdown" class="arrow">
            </button>
          </div>
          
          <div class="theme-section-content piece-themes">
            <div class="piece-options">
              ${pieceThemes.map(theme => `
                <div class="piece-option" data-theme="${theme}" title="${theme}">
                  <img src="Assets/images/pieces/${theme}/black/bN.png" alt="${theme}">
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add styles to document
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
  `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Add elements to DOM
  document.querySelector('.chess-container').insertAdjacentHTML("beforeend", settingsButtonHTML);
  document.body.insertAdjacentHTML("beforeend", themeModalHTML);

  // Get DOM elements
  const flipBtn = document.querySelector('.flip-button');
  const settingsBtn = document.querySelector('.settings-button');
  const themeModal = document.querySelector('.theme-modal');
  const applyBtn = document.querySelector('.apply-button');
  const resetBtn = document.querySelector('.reset-button');
  const colorOptions = document.querySelectorAll('.color-option');
  const customButtons = document.querySelectorAll('.custom-button');
  const colorPickers = document.querySelectorAll('.color-picker');

  // Initially hide the modal
  themeModal.style.display = 'none';

  // Add click event for settings button
  settingsBtn.addEventListener('click', () => {
    themeModal.style.display = 'flex';
    
    // Reset modal scroll position
    document.querySelector('.theme-modal-content').scrollTop = 0;
    
    // Reset section states - keep all sections collapsed
    document.querySelectorAll('.theme-section-header').forEach(header => {
      header.classList.add('collapsed');
      header.nextElementSibling.classList.add('collapsed');
      header.nextElementSibling.scrollTop = 0;
    });
  });

  // Add click event for apply button
  applyBtn.addEventListener('click', () => {
    // Hide the modal
    themeModal.style.display = 'none';
    
    // Collapse both sections
    document.querySelectorAll('.theme-section-header').forEach(header => {
      header.classList.add('collapsed');
      header.nextElementSibling.classList.add('collapsed');
    });
  });

  // Update the reset button click handler
  resetBtn.addEventListener('click', () => {
    // Reset other theme settings...
    
    // Reset flip board setting
    localStorage.setItem('chess-flip-board', 'false');
    const flipIcon = document.getElementById('flip-board-setting');
    flipIcon.classList.remove('active');
    
    // Reset colors...
    localStorage.setItem('chess-theme-white squares', defaultColors['white squares']);
    localStorage.setItem('chess-theme-black squares', defaultColors['black squares']);
    localStorage.setItem('chess-theme-highlight color', defaultColors['highlight color']);
    
    // Reset piece style...
    localStorage.setItem('chess-theme-piece-style', 'default');
    
    // Update the visual state of other settings...
    updateColors();
    updatePieceImages();
  });

  // Function to update colors
  const updateColors = () => {
    const whiteColor = localStorage.getItem('chess-theme-white squares');
    const blackColor = localStorage.getItem('chess-theme-black squares');
    const highlightColor = localStorage.getItem('chess-theme-highlight color');

    document.documentElement.style.setProperty('--white-square-color', whiteColor);
    document.documentElement.style.setProperty('--black-square-color', blackColor);
    document.documentElement.style.setProperty('--highlight-color', highlightColor);

    // Update all white squares
    document.querySelectorAll('.white').forEach(square => {
      square.style.backgroundColor = whiteColor;
    });

    // Update all black squares
    document.querySelectorAll('.black').forEach(square => {
      square.style.backgroundColor = blackColor;
    });
  };

  // Add click events for color options
  colorOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const color = e.target.dataset.color;
      const type = e.target.dataset.type;

      switch(type) {
        case 'white':
          localStorage.setItem('chess-theme-white squares', color);
          break;
        case 'black':
          localStorage.setItem('chess-theme-black squares', color);
          break;
        case 'highlight':
          localStorage.setItem('chess-theme-highlight color', color);
          break;
      }
      
      updateColors();
    });
  });

  // Add click events for custom buttons
  customButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      colorPickers[index].click();
    });
  });

  // Add input events for color pickers
  colorPickers.forEach(picker => {
    picker.addEventListener('input', (e) => {
      const color = e.target.value;
      const type = e.target.dataset.type;

      switch(type) {
        case 'white':
          localStorage.setItem('chess-theme-white squares', color);
          break;
        case 'black':
          localStorage.setItem('chess-theme-black squares', color);
          break;
        case 'highlight':
          localStorage.setItem('chess-theme-highlight color', color);
          break;
      }
      
      updateColors();
    });
  });

  // Close modal when clicking outside
  themeModal.addEventListener('click', (e) => {
    if (e.target === themeModal) {
      themeModal.style.display = 'none';
      
      // Collapse both sections
      document.querySelectorAll('.theme-section-header').forEach(header => {
        header.classList.add('collapsed');
        header.nextElementSibling.classList.add('collapsed');
      });
    }
  });

  // Add click handlers for dropdowns
  document.querySelectorAll('.theme-section-header').forEach(header => {
    // Initially collapse all sections
    header.classList.add('collapsed');
    const content = header.nextElementSibling;
    content.classList.add('collapsed');

    header.addEventListener('click', () => {
      // Close all other sections first
      document.querySelectorAll('.theme-section-header').forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.classList.add('collapsed');
          otherHeader.nextElementSibling.classList.add('collapsed');
        }
      });

      // Toggle current section
      header.classList.toggle('collapsed');
      content.classList.toggle('collapsed');
    });
  });

  // Initialize with board theme expanded and piece theme collapsed
  const pieceHeader = document.querySelector('[data-section="pieces"]');
  const pieceContent = pieceHeader.nextElementSibling;
  pieceHeader.classList.add('collapsed');
  pieceContent.classList.add('collapsed');

  // Initial color setup
  updateColors();

  // Add click handler to each piece option
  const pieceOptions = document.querySelectorAll('.piece-option');
  pieceOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const theme = e.currentTarget.dataset.theme;
      console.log('Piece theme clicked:', theme);
      
      // Update localStorage
      localStorage.setItem('chess-theme-piece-style', theme);
      
      // Update visual selection
      pieceOptions.forEach(opt => opt.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      
      // Update piece images
      updatePieceImages();
    });
  });

  // Update the click handler to work with the entire container
  const flipBoardContainer = document.getElementById('flip-board-container');
  const flipBoardIcon = document.getElementById('flip-board-setting');

  flipBoardContainer.addEventListener('click', () => {
    const currentState = localStorage.getItem('chess-flip-board') === 'true';
    const newState = !currentState;
    localStorage.setItem('chess-flip-board', newState);
    flipBoardIcon.classList.toggle('active');
  });

  // Add click event for flip button
  flipBtn.addEventListener('click', () => {
    flipBtn.classList.toggle('active');  // Toggle active class
    flipBoard();
  });
}

export { createThemeSetup }; 