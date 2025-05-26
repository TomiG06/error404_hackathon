// JavaScript to handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitButton = form.querySelector("button[type='submit']");
  const statusMessage = document.createElement("div");
  statusMessage.className = "status-message";
  form.appendChild(statusMessage);

  // Form validation function
  function validateForm(formData) {
    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.get("name").trim()) {
      return "Please enter your name";
    }
    if (!email.trim() || !emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    if (!formData.get("message").trim()) {
      return "Please enter a message";
    }
    return null; // No errors
  }

  // Display status message
  function showMessage(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${isError ? "error" : "success"}`;
    statusMessage.style.display = "block";

    // Hide message after 5 seconds
    setTimeout(() => {
      statusMessage.style.display = "none";
    }, 5000);
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Get form data
    const formData = new FormData(form);

    // Validate form
    const validationError = validateForm(formData);
    if (validationError) {
      showMessage(validationError, true);
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      return;
    }

    const data = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      subject: formData.get("subject")
        ? formData.get("subject").trim()
        : "Contact Form Submission",
      message: formData.get("message").trim(),
    };

    try {
      // Send data to the backend
      const response = await fetch(
        "https://your-backend-api-url.com/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "same-origin", // Include cookies for same-origin requests
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        showMessage("Thank you! Your message has been sent successfully.");
        form.reset();
      } else {
        showMessage(
          `Failed to send: ${result.error || "Please try again later."}`,
          true,
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showMessage(
        "Network error. Please check your connection and try again.",
        true,
      );
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
});
