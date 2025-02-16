function createDocumentation() {
  const docIcon = document.createElement("button");
  docIcon.className = "doc-icon";
  docIcon.innerHTML =
    '<img src="Assets/images/documentation.png" alt="Documentation" />';
  document.body.appendChild(docIcon);

  const docHTML = `
    <div class="documentation-overlay" style="display: flex;">
      <div class="documentation-modal">
        <div class="doc-header">
          <h2>
            <img src="Assets/images/documentation.png" alt="Documentation" class="doc-header-icon">
            Project Overview
          </h2>
          <button class="doc-close-btn">CLOSE</button>
        </div>

        <div class="intro-section">
          <p>This project aims to deliver a lightweight, fully accessible chess experience that operates entirely in the browser, without relying on backend servers. Unlike many existing chess platforms that require account creation, track user data, or depend on slow server interactions, this application offers a seamless and privacy-focused alternative.</p>
          <p> A fully open-source chess platform built from the ground up, allowing anyone to play, modify, and learn from the code. No external chess libraries were used—every aspect of the game, from move validation to special rules like castling and en passant, has been meticulously implemented using pure JavaScript, strictly following chess regulations. </p>
          <div class="key-features">
            <h3>Key Features</h3>
            <ul>
              <li>
                <img src="assets/images/features/no-signup-required.png" class="feature-icon" alt="No Signup" />
                <div class="feature-text">
                  <strong>No Signups Required</strong>
                  <p>Start playing immediately without account creation</p>
                </div>
              </li>
              <li>
                <img src="assets/images/features/always-available.png" class="feature-icon" alt="Always Available" />
                <div class="feature-text">
                  <strong>Always Available</strong>
                  <p>Access anytime without interruptions</p>
                </div>
              </li>
              <li>
                <img src="assets/images/features/multi-device.png" class="feature-icon" alt="Cross Device" />
                <div class="feature-text">
                  <strong>Cross-Device Compatibility</strong>
                  <p>Play on various devices and platforms</p>
                </div>
              </li>
              <li>
                <img src="assets/images/features/open-source.png" class="feature-icon" alt="Open Source" />
                <div class="feature-text">
                  <strong>Open Source</strong>
                  <p>Modify and extend the code for your needs</p>
                </div>
              </li>
              <li>
                <img src="assets/images/features/privacy-focused.png" class="feature-icon" alt="Privacy" />
                <div class="feature-text">
                  <strong>Privacy-Focused</strong>
                  <p>No data collection or storage</p>
                </div>
              </li>
              <li>
                <img src="assets/images/features/free-access.png" class="feature-icon" alt="Free" />
                <div class="feature-text">
                  <strong>Free Access</strong>
                  <p>No fees or licensing costs</p>
                </div>
              </li>
              <li>
                <img src="assets/images/features/optimized-performance.png" class="feature-icon" alt="Performance" />
                <div class="feature-text">
                  <strong>Optimized Performance</strong>
                  <p>Fast and responsive gameplay</p>
                </div>
              </li>
              <li>
                <img src="assets/images/features/backend-independence.png" class="feature-icon" alt="Backend" />
                <div class="feature-text">
                  <strong>Back-End Independence</strong>
                  <p>Operates without a server</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="doc-section">
          <div class="doc-section-header collapsed" data-section="whats-new">
            <h3>What's New on the Board</h3>
            <button class="dropdown-toggle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="doc-section-content" style="display: none;">
            <div class="feature-grid">
              <div class="feature-card">
                <img src="Assets/images/updates/personalised-experience.png" class="feature-icon" alt="Personalized Experience" />
                <h4>Personalized Experience</h4>
                <p>Customize player names and avatars to reflect your unique style.</p>
              </div>

              <div class="feature-card">
                <img src="Assets/images/updates/chess-clock.png" class="feature-icon" alt="Dynamic Time Controls" />
                <h4>Dynamic Time Controls</h4>
                <p>Flexible time settings with options for hours, minutes, and seconds for any game type.</p>
              </div>

              <div class="feature-card">
                <img src="Assets/images/updates/diverse-piece-styles.png" class="feature-icon" alt="Diverse Piece Styles" />
                <h4>Diverse Piece Styles</h4>
                <p>Choose from over 30 stunning piece designs like Alpha, Celtic, and Fantasy to personalize your board.</p>
              </div>

              <div class="feature-card">
                <img src="Assets/images/updates/multi-colors.png" class="feature-icon" alt="Tailored Board Colors" />
                <h4>Tailored Board Colors</h4>
                <p>Create the perfect ambiance with custom board colors using our intuitive color picker.</p>
              </div>

              <div class="feature-card">
                <img src="Assets/images/updates/scoresheet.png" class="feature-icon" alt="Complete Game Scoresheet" />
                <h4>Complete Game Scoresheet</h4>
                <p>Access a detailed scoresheet for each game, ensuring you have all the information at your fingertips.</p>
              </div>

              <div class="feature-card">
                <img src="Assets/images/updates/special-move-notation.png" class="feature-icon" alt="Special Move Notation" />
                <h4>Special Move Notation</h4>
                <p>Keep track of special moves like castling and en passant with dedicated notation.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-section">
          <div class="doc-section-header collapsed" data-section="future">
            <h3>Future Strategies</h3>
            <button class="dropdown-toggle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="doc-section-content" style="display: none;">
            <div class="feature-grid">
              <div class="feature-card future-card">
                <img src="Assets/images/upcoming/share.png" class="feature-icon" alt="PGN Export" />
                <h4>PGN Export</h4>
                <p>Easily export your game scoresheets in PGN format for analysis, sharing, or archiving.</p>
              </div>

              <div class="feature-card future-card">
                <img src="Assets/images/upcoming/stockfish.png" class="feature-icon" alt="Stockfish Integration" />
                <h4>Stockfish Integration</h4>
                <p>Get real-time insights with integrated Stockfish analysis, including an evaluation bar to understand the dynamics of each move, and challenge yourself by playing against Stockfish at various difficulty levels.</p>
              </div>

              <div class="feature-card future-card">
                <img src="Assets/images/upcoming/link.png" class="feature-icon" alt="Multiplayer Link Sharing" />
                <h4>Multiplayer Link Sharing</h4>
                <p>Invite friends for a game with easy link sharing, making multiplayer matches more accessible than ever.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-section">
          <div class="doc-section-header collapsed" data-section="feedback">
            <h3>Your Move: Share Your Thoughts</h3>
            <button class="dropdown-toggle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="doc-section-content" style="display: none;">
            <p>This project is a work in progress and not yet complete. As a complex front-end application without backend support, it may occasionally experience glitches or bugs. Efforts are ongoing to minimize these issues, but due to the intricacies of the code, unexpected behavior may occur in certain edge cases. In many cases, simply refreshing the page can resolve minor glitches.</p>

<p>Your feedback is invaluable in identifying and addressing these scenarios. Feel free to suggest new features, report any issues, or share your experience. You can reach out through the contact button or contribute directly via the GitHub repository: GitHub Repo. Join the community and help improve the project!</p>
            <div class="github-link-container">
              <a href="https://github.com/AryanShah30/chess" target="_blank" class="github-link">
                <svg height="32" viewBox="0 0 16 16" width="32" class="github-icon">
                  <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", docHTML);

  const docStyle = document.createElement("style");
  docStyle.textContent = `
    .doc-header h2 {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .doc-header-icon {
      width: 24px;
      height: 24px;
    }

    .doc-header-icon {
      filter: none;
    }

    [data-theme="dark"] .doc-header-icon {
      filter: brightness(0) invert(1);
    }

    .documentation-modal {
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .documentation-overlay {
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;
  document.head.appendChild(docStyle);

  const docOverlay = document.querySelector(".documentation-overlay");
  const docModal = docOverlay.querySelector(".documentation-modal");
  const closeBtn = docOverlay.querySelector(".doc-close-btn");

  const animateClose = () => {
    const docIcon = document.querySelector(".doc-icon");
    const iconRect = docIcon.getBoundingClientRect();

    docModal.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    docModal.style.transform = `translate(${
      iconRect.left - docModal.offsetWidth / 2 + iconRect.width / 2
    }px, ${
      iconRect.top - docModal.offsetHeight / 2 + iconRect.height / 2
    }px) scale(0.1)`;
    docModal.style.opacity = "0";
    docOverlay.style.opacity = "0";

    setTimeout(() => {
      docOverlay.style.display = "none";
      docModal.style.transform = "";
      docModal.style.opacity = "1";
    }, 600);
  };

  docOverlay.style.opacity = "0";
  setTimeout(() => {
    docOverlay.style.opacity = "1";
  }, 100);

  closeBtn.addEventListener("click", animateClose);

  docIcon.addEventListener("click", () => {
    // Reset all sections to collapsed state
    document.querySelectorAll('.doc-section-header').forEach(header => {
      header.classList.add('collapsed');
      const content = header.nextElementSibling;
      if (content) {
        content.style.display = 'none';
      }
      const svg = header.querySelector('svg');
      if (svg) {
        svg.style.transform = 'rotate(0deg)';
      }
    });

    // Show the modal
    docModal.style.transform = "";
    docModal.style.opacity = "1";
    docOverlay.style.opacity = "1";
    docOverlay.style.display = "flex";
  });

  document.querySelectorAll('.doc-section-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isCollapsed = header.classList.contains('collapsed');
      
      // Close all other sections
      document.querySelectorAll('.doc-section-header').forEach(h => {
        if (h !== header) {
          h.classList.add('collapsed');
          h.nextElementSibling.style.display = 'none';
          const svg = h.querySelector('svg');
          if (svg) svg.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current section
      header.classList.toggle('collapsed');
      content.style.display = isCollapsed ? 'block' : 'none';
      
      // Rotate arrow
      const svg = header.querySelector('svg');
      if (svg) {
        svg.style.transform = isCollapsed ? 'rotate(-180deg)' : 'rotate(0deg)';
      }
    });
  });

  // Add click handler for code icon
  const codeIcon = document.createElement("button");
  codeIcon.className = "code-icon";
  codeIcon.innerHTML =
    '<img src="Assets/images/code.png" alt="Code Documentation" />';
  document.body.appendChild(codeIcon);

  codeIcon.addEventListener("click", () => {
    window.open("https://github.com/AryanShah30/chess", "_blank");
  });
}

export { createDocumentation };
