function createDocumentation() {
  // Create documentation HTML
  const docHTML = `
    <div class="documentation-overlay">
      <div class="documentation-modal">
        <div class="documentation-header">
          <h2>About Chess</h2>
          <button class="doc-close-btn">×</button>
        </div>
        <div class="documentation-content">
          <h3>Welcome to Chess!</h3>
          <p>This is a modern implementation of the classic game of chess.</p>
          <div class="doc-sections">
            <section>
              <h4>Features</h4>
              <ul>
                <li>Full chess rules implementation</li>
                <li>Customizable themes</li>
                <li>Chess clock with increment support</li>
                <li>Move notation</li>
                <li>Board flip option</li>
              </ul>
            </section>
            <section>
              <h4>How to Play</h4>
              <p>Click the "Start New Game" button below to begin a new game. You can:</p>
              <ul>
                <li>Drag and drop pieces to move them</li>
                <li>Click pieces to see valid moves</li>
                <li>Use the clock to time your moves</li>
                <li>Customize the board and piece themes</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  `;

  // Create minimized icon
  const docIconHTML = `
    <div class="doc-icon" style="display: none;">
      <img src="Assets/images/document.png" alt="Documentation" title="Open Documentation">
    </div>
  `;

  // Add to DOM
  document.body.insertAdjacentHTML('beforeend', docHTML);
  document.body.insertAdjacentHTML('beforeend', docIconHTML);

  // Get elements
  const overlay = document.querySelector('.documentation-overlay');
  const closeBtn = document.querySelector('.doc-close-btn');
  const docIcon = document.querySelector('.doc-icon');

  // Function to close documentation
  const closeDocumentation = () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      docIcon.style.display = 'block';
    }, 300);
  };

  // Handle close button click
  closeBtn.addEventListener('click', closeDocumentation);

  // Handle icon click
  docIcon.addEventListener('click', () => {
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    docIcon.style.display = 'none';
  });

  // Show documentation immediately
  overlay.style.display = 'flex';
  overlay.style.opacity = '1';

  // Auto-close after 3 seconds
  setTimeout(closeDocumentation, 3000);

  // Fetch and load documentation content if available
  fetch('doc.txt')
    .then(response => response.text())
    .then(content => {
      if (content.trim()) {
        const docContent = document.querySelector('.documentation-content');
        if (docContent) {
          docContent.innerHTML = content;
        }
      }
    })
    .catch(error => console.error('Error loading documentation:', error));

  return overlay;
}

export { createDocumentation }; 