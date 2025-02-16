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
            Chess Documentation
          </h2>
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

  setTimeout(animateClose, 5000);

  closeBtn.addEventListener("click", animateClose);

  docIcon.addEventListener("click", () => {
    docModal.style.transform = "";
    docModal.style.opacity = "1";
    docOverlay.style.opacity = "1";
    docOverlay.style.display = "flex";
  });

  document.querySelectorAll(".doc-section-header").forEach((header) => {
    const toggleBtn = header.querySelector(".dropdown-toggle");
    const content = header.nextElementSibling;

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      header.classList.toggle("collapsed");
      content.classList.toggle("collapsed");

      const svg = toggleBtn.querySelector("svg");
      if (header.classList.contains("collapsed")) {
        svg.style.transform = "rotate(-180deg)";
      } else {
        svg.style.transform = "rotate(0deg)";
      }
    });
  });
}

export { createDocumentation };
