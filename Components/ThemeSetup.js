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
          <h4>Black Squares</h4>
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
          <h4>Highlight Color</h4>
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