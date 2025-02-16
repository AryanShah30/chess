function createDocumentation() {
  console.log("Documentation function called"); // Debug log

  // First create and show the documentation overlay
  const docHTML = `
    <div class="documentation-overlay" style="display: flex !important;">
      <div class="documentation-modal">
        <div class="doc-header">
          <h2>Chess Documentation</h2>
          <button class="doc-close-btn">CLOSE</button>
        </div>
        
        <div class="doc-section">
          <div class="doc-section-header" data-section="whats-new">
            <h3>What's New on the Board</h3>
            <button class="dropdown-toggle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="doc-section-content">
            <ul>
              <li>🎮 Custom Game Setup: Set player names and time controls</li>
              <li>🎨 Theme Customization: Choose from various piece styles and board colors</li>
              <li>⏱️ Chess Clock: Professional timing system with increment support</li>
              <li>📝 Move Notation: Automatic chess notation recording</li>
            </ul>
          </div>
        </div>

        <div class="doc-section">
          <div class="doc-section-header" data-section="future">
            <h3>Future Strategies</h3>
            <button class="dropdown-toggle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="doc-section-content">
            <ul>
              <li>🤖 AI Integration: Play against different difficulty levels</li>
              <li>🌐 Online Multiplayer: Challenge players worldwide</li>
              <li>📊 Performance Analytics: Track your progress and improvement</li>
              <li>📱 Mobile Support: Play on any device</li>
            </ul>
          </div>
        </div>

        <div class="doc-section">
          <div class="doc-section-header" data-section="feedback">
            <h3>Your Move: Share Your Thoughts</h3>
            <button class="dropdown-toggle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="doc-section-content">
            <ul>
              <li>💡 Suggest new features</li>
              <li>🐛 Report bugs or issues</li>
              <li>🌟 Share your experience</li>
              <li>🤝 Join our community</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add documentation to body first
  document.body.insertAdjacentHTML("beforeend", docHTML);
  
  console.log("Documentation HTML added"); // Debug log
  
  // Get the overlay reference
  const docOverlay = document.querySelector('.documentation-overlay');
  console.log("Overlay element:", docOverlay); // Debug log
  
  // Force display
  if (docOverlay) {
    docOverlay.style.display = 'flex';
    docOverlay.style.visibility = 'visible';
    docOverlay.style.opacity = '1';
    console.log("Overlay display set to flex"); // Debug log
  }

  // Hide documentation after 3 seconds
  setTimeout(() => {
    if (docOverlay) {
      docOverlay.style.display = 'none';
      console.log("Documentation hidden"); // Debug log
      
      // Create and add the documentation icon
      const docIconHTML = `
        <button class="doc-icon" title="Documentation">
          <img src="Assets/images/documentation.png" alt="Documentation" class="doc-icon-img" />
        </button>
      `;
      
      document.body.insertAdjacentHTML('beforeend', docIconHTML);
      console.log("Doc icon added"); // Debug log
      
      // Add click event to show documentation
      const docIcon = document.querySelector('.doc-icon');
      if (docIcon) {
        docIcon.addEventListener('click', () => {
          docOverlay.style.display = 'flex';
          console.log("Doc icon clicked"); // Debug log
        });
      }
    }
  }, 3000);

  // Add close button functionality
  const closeBtn = document.querySelector('.doc-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      docOverlay.style.display = 'none';
      console.log("Close button clicked"); // Debug log
    });
  }

  // Add click outside to close
  if (docOverlay) {
    docOverlay.addEventListener('click', (e) => {
      if (e.target === docOverlay) {
        docOverlay.style.display = 'none';
        console.log("Clicked outside"); // Debug log
      }
    });
  }

  // Handle section toggles
  document.querySelectorAll('.doc-section-header').forEach((header) => {
    const toggleBtn = header.querySelector('.dropdown-toggle');
    const content = header.nextElementSibling;
    
    // Add click handler to the toggle button
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      header.classList.toggle('collapsed');
      content.classList.toggle('collapsed');
      
      // Animate the dropdown icon
      const svg = toggleBtn.querySelector('svg');
      if (header.classList.contains('collapsed')) {
        svg.style.transform = 'rotate(-180deg)';
      } else {
        svg.style.transform = 'rotate(0deg)';
      }
    });
  });
}

export { createDocumentation }; 