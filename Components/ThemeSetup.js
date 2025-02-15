function createThemeSetup() {
  // Set default colors if not already in localStorage
  if (!localStorage.getItem('chess-theme-white squares')) {
    localStorage.setItem('chess-theme-white squares', '#c5d5dc');
  }
  if (!localStorage.getItem('chess-theme-black squares')) {
    localStorage.setItem('chess-theme-black squares', '#7a9db2');
  }
  if (!localStorage.getItem('chess-theme-highlight color')) {
    localStorage.setItem('chess-theme-highlight color', '#72c9dd');
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
          <button class="close-button" title="Close">×</button>
        </div>
        
        <div class="theme-section">
          <h4>White Squares</h4>
          <div class="color-options">
            <button class="color-option" style="background-color: #c5d5dc;" data-type="white" data-color="#c5d5dc"></button>
            <button class="color-option" style="background-color: #FFFFFF;" data-type="white" data-color="#FFFFFF"></button>
            <button class="color-option" style="background-color: #E8D0B0;" data-type="white" data-color="#E8D0B0"></button>
            <button class="color-option" style="background-color: #EED7C5;" data-type="white" data-color="#EED7C5"></button>
          </div>
        </div>

        <div class="theme-section">
          <h4>Black Squares</h4>
          <div class="color-options">
            <button class="color-option" style="background-color: #7a9db2;" data-type="black" data-color="#7a9db2"></button>
            <button class="color-option" style="background-color: #4B7399;" data-type="black" data-color="#4B7399"></button>
            <button class="color-option" style="background-color: #B58863;" data-type="black" data-color="#B58863"></button>
            <button class="color-option" style="background-color: #C3A48C;" data-type="black" data-color="#C3A48C"></button>
          </div>
        </div>

        <div class="theme-section">
          <h4>Highlight Color</h4>
          <div class="color-options">
            <button class="color-option" style="background-color: #72c9dd;" data-type="highlight" data-color="#72c9dd"></button>
            <button class="color-option" style="background-color: #aaa23a;" data-type="highlight" data-color="#aaa23a"></button>
            <button class="color-option" style="background-color: #f7ec59;" data-type="highlight" data-color="#f7ec59"></button>
            <button class="color-option" style="background-color: #ff9f40;" data-type="highlight" data-color="#ff9f40"></button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add elements to DOM
  document.querySelector('.chess-container').insertAdjacentHTML("beforeend", settingsButtonHTML);
  document.body.insertAdjacentHTML("beforeend", themeModalHTML);

  // Get DOM elements
  const settingsBtn = document.querySelector('.settings-button');
  const themeModal = document.querySelector('.theme-modal');
  const closeBtn = document.querySelector('.close-button');
  const colorOptions = document.querySelectorAll('.color-option');

  // Initially hide the modal
  themeModal.style.display = 'none';

  // Add click event for settings button
  settingsBtn.addEventListener('click', () => {
    themeModal.style.display = 'flex';
  });

  // Add click event for close button
  closeBtn.addEventListener('click', () => {
    themeModal.style.display = 'none';
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

  // Close modal when clicking outside
  themeModal.addEventListener('click', (e) => {
    if (e.target === themeModal) {
      themeModal.style.display = 'none';
    }
  });

  // Initial color setup
  updateColors();
}

export { createThemeSetup }; 