document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const submitButton = form.querySelector('button[type="submit"]');
  const statusMessage = document.createElement("div");
  statusMessage.className = "status-message";
  form.appendChild(statusMessage);

  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate password strength
  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase || !hasLowerCase) {
      return "Password must contain both uppercase and lowercase letters";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return null;
  }

  // Function to show status message
  function showMessage(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${isError ? "error" : "success"}`;
    statusMessage.style.display = "block";

    setTimeout(() => {
      statusMessage.style.display = "none";
    }, 5000);
  }

  // Function to check if email is already registered
  function isEmailRegistered(email) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.some((user) => user.email === email);
  }

  // Function to store new user
  function storeUser(userData) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    // Store current user data
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...userData,
        isLoggedIn: true,
        registeredAt: new Date().toISOString(),
      }),
    );
  }

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const university = formData.get("university");

    // Validate all fields
    if (!username || !email || !password || !confirmPassword || !university) {
      showMessage("Please fill out all fields", true);
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address", true);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showMessage(passwordError, true);
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match", true);
      return;
    }

    // Check if email is already registered
    if (isEmailRegistered(email)) {
      showMessage("This email is already registered", true);
      return;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

    try {
      // Create user data
      const userData = {
        id: Date.now(),
        username,
        email,
        university,
        password, // Note: In a real app, this would be hashed
        registeredAt: new Date().toISOString(),
      };

      // Store user data
      storeUser(userData);

      // Show success message
      showMessage("Registration successful! Redirecting...");

      // Update side menu
      if (typeof updateSideMenu === "function") {
        updateSideMenu();
      }

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "index-logedin.html";
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      showMessage("Registration failed. Please try again.", true);
      submitButton.disabled = false;
      submitButton.innerHTML =
        '<i class="fas fa-user-plus"></i> Create Account';
    }
  });

  // Password strength indicator
  const passwordInput = form.querySelector("#password");
  const strengthIndicator = form.querySelector(".password-strength");

  if (passwordInput && strengthIndicator) {
    passwordInput.addEventListener("input", function () {
      const password = this.value;
      let strength = 0;

      if (password.length >= 8) strength++;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
      if (password.match(/\d/)) strength++;
      if (password.match(/[^a-zA-Z\d]/)) strength++;

      strengthIndicator.className = "password-strength";
      if (strength >= 3) {
        strengthIndicator.classList.add("strong");
        strengthIndicator.textContent = "Strong password";
      } else if (strength >= 2) {
        strengthIndicator.classList.add("medium");
        strengthIndicator.textContent = "Medium password";
      } else if (strength >= 1) {
        strengthIndicator.classList.add("weak");
        strengthIndicator.textContent = "Weak password";
      } else {
        strengthIndicator.textContent = "";
      }
    });
  }

  // Email availability check on blur
  const emailInput = form.querySelector("#email");
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      const email = this.value.trim();
      if (email && isValidEmail(email)) {
        if (isEmailRegistered(email)) {
          showMessage("This email is already registered", true);
        }
      }
    });
  }
});
