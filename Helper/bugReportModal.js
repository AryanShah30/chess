export function createBugReportModal() {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "bug-report-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "bug-report-modal";

  modalContent.innerHTML = `
    <div class="modal-header">
      <h3>Report a Bug</h3>
      <button class="doc-close-btn">CLOSE</button>
    </div>
    <form class="bug-report-form">
      <label for="user-email">Your Email (optional)</label>
      <input type="email" id="user-email" placeholder="your@email.com">

      <label for="bug-description">Bug Description</label>
      <textarea id="bug-description" required placeholder="Please describe the bug you encountered..."></textarea>

      <button type="submit" class="bug-submit-btn">
        <span class="button-text">Submit Report</span>
        <span class="loading-spinner" style="display: none;">Sending...</span>
      </button>
    </form>
  `;

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  function showSuccessMessage() {
    modalContent.innerHTML = `
      <div class="success-message">
        <div class="success-icon">✓</div>
        <h3>Thank You!</h3>
        <p>Your bug report has been successfully submitted.</p>
        <button class="close-success-btn">Close</button>
      </div>
    `;

    const closeSuccessBtn = modalContent.querySelector(".close-success-btn");
    closeSuccessBtn.addEventListener("click", () => modalOverlay.remove());

    setTimeout(() => modalOverlay.remove(), 3000);
  }

  function showErrorMessage(error) {
    modalContent.innerHTML = `
      <div class="error-message">
        <div class="error-icon">!</div>
        <h3>Oops!</h3>
        <p>Something went wrong while submitting your report.</p>
        <p class="error-details">Please try again later.</p>
        <button class="close-error-btn">Close</button>
      </div>
    `;

    const closeErrorBtn = modalContent.querySelector(".close-error-btn");
    closeErrorBtn.addEventListener("click", () => modalOverlay.remove());
  }

  const closeBtn = modalContent.querySelector(".doc-close-btn");
  closeBtn.addEventListener("click", () => modalOverlay.remove());

  const form = modalContent.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".bug-submit-btn");
    const buttonText = submitBtn.querySelector(".button-text");
    const loadingSpinner = submitBtn.querySelector(".loading-spinner");

    buttonText.style.display = "none";
    loadingSpinner.style.display = "inline";
    submitBtn.disabled = true;

    try {
      const description = form.querySelector("#bug-description").value;
      const userEmail = form.querySelector("#user-email").value;

      await emailjs.send("service_16cjexb", "template_kjzrmdq", {
        from_email: userEmail || "Anonymous User",
        bug_description: description,
        date: new Date().toLocaleString(),
        url: window.location.href,
        user_agent: navigator.userAgent,
      });

      showSuccessMessage();
    } catch (error) {
      showErrorMessage(error);
    }
  });
}