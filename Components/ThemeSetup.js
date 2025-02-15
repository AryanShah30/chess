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
    <button class="settings-button">
      <img src="Assets/images/settings.png" alt="Settings" />
    </button>
  `;

  const themeModalHTML = `
    <div class="theme-modal">
      <div class="theme-modal-content">
        <div class="theme-header">
          <h3>Board Themes</h3>
          <div class="theme-header-buttons">
            <button class="reset-button" title="Reset to default colors">Reset</button>
            <button class="apply-button" title="Apply changes">Apply</button>
          </div>
        </div>
        
        <div class="theme-section">
          <div class="theme-section-header">
            <h4>White Squares</h4>
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

        <div class="theme-section">
          <div class="theme-section-header">
            <h4>Black Squares</h4>
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

        <div class="theme-section">
          <div class="theme-section-header">
            <h4>Highlight Color</h4>
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

        <div class="theme-section">
          <div class="theme-section-header">
            <h4>Piece Theme</h4>
            <button class="custom-button" id="piece-theme-btn">Change</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add styles to document
  const styles = `
    .theme-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .custom-color-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-picker {
      width: 0;
      height: 0;
      padding: 0;
      border: none;
      visibility: hidden;
      position: absolute;
    }

    .custom-button {
      background-color: #2a2927;
      border: 1px solid #3a3937;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #b4b4b4;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .custom-button:hover {
      background-color: #3a3937;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }

    .custom-button:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Add elements to DOM
  document.querySelector('.chess-container').insertAdjacentHTML("beforeend", settingsButtonHTML);
  document.body.insertAdjacentHTML("beforeend", themeModalHTML);

  // Get DOM elements
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
  });

  // Add click event for apply button
  applyBtn.addEventListener('click', () => {
    themeModal.style.display = 'none';
  });

  // Add reset functionality
  resetBtn.addEventListener('click', () => {
    // Reset localStorage to default values
    localStorage.setItem('chess-theme-white squares', defaultColors['white squares']);
    localStorage.setItem('chess-theme-black squares', defaultColors['black squares']);
    localStorage.setItem('chess-theme-highlight color', defaultColors['highlight color']);
    
    // Update colors
    updateColors();
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
    }
  });

  // Create piece theme modal
  const pieceThemeModal = document.createElement('div');
  pieceThemeModal.className = 'theme-modal';
  pieceThemeModal.innerHTML = `
    <div class="theme-modal-content">
      <h3>Select Piece Theme</h3>
      <div class="piece-options">
        ${pieceThemes.map(theme => `
          <div class="piece-option" data-theme="${theme}" title="${theme}">
            <img src="Assets/images/pieces/${theme}/black/bN.png" alt="${theme}">
          </div>
        `).join('')}
      </div>
      <div class="modal-buttons">
        <button class="apply-button">Apply</button>
        <button class="reset-button"></button>
      </div>
    </div>
  `;
  document.body.appendChild(pieceThemeModal);
  pieceThemeModal.style.display = 'none';

  // Add click event for piece theme button
  document.getElementById('piece-theme-btn').addEventListener('click', () => {
    pieceThemeModal.style.display = 'flex';
    themeModal.style.display = 'none';
  });

  // Add click events for piece options
  const pieceOptions = pieceThemeModal.querySelectorAll('.piece-option');
  pieceOptions.forEach(option => {
    option.addEventListener('click', () => {
      pieceOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      const theme = option.dataset.theme;
      localStorage.setItem('chess-piece-theme', theme);
      updatePieceTheme();
    });
  });

  // Add click event for piece theme apply button
  pieceThemeModal.querySelector('.apply-button').addEventListener('click', () => {
    pieceThemeModal.style.display = 'none';
    themeModal.style.display = 'flex';
  });

  // Add click event for piece theme reset button
  pieceThemeModal.querySelector('.reset-button').addEventListener('click', () => {
    localStorage.setItem('chess-piece-theme', 'default');
    updatePieceTheme();
  });

  // Close modal when clicking outside
  pieceThemeModal.addEventListener('click', (e) => {
    if (e.target === pieceThemeModal) {
      pieceThemeModal.style.display = 'none';
      themeModal.style.display = 'flex';
    }
  });

  // Function to update piece theme
  const updatePieceTheme = () => {
    const theme = localStorage.getItem('chess-piece-theme') || 'default';
    document.querySelectorAll('.piece').forEach(piece => {
      const currentSrc = piece.src;
      const fileName = currentSrc.split('/').pop(); // Get the file name (e.g., bN.png)
      piece.src = `Assets/images/pieces/${theme}/${fileName.startsWith('w') ? 'white' : 'black'}/${fileName}`;
    });
  };

  // Initial piece theme setup
  updatePieceTheme();

  // Initial color setup
  updateColors();
}

export { createThemeSetup }; 