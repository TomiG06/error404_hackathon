// Function to update side menu with user data
function updateSideMenu() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const avatarLetter = document.querySelector(".side-nav-avatar-letter");
  const userName = document.querySelector(".side-nav-user-name");

  if (userData && userData.username) {
    // Update avatar and username
    if (avatarLetter) {
      avatarLetter.textContent = userData.username.charAt(0).toUpperCase();
      avatarLetter.style.backgroundColor = "#df4f00"; // Brand color
      avatarLetter.style.color = "#ffffff";
    }

    if (userName) {
      userName.textContent = userData.username;
    }

    // Update menu items based on login status
    const registerLink = document.querySelector('a[href="registration.html"]');
    if (registerLink) {
      registerLink.innerHTML =
        '<i class="fas fa-user"></i><span>Profile</span>';
      registerLink.href = "profile.html";
    }
  } else {
    // Reset to guest state
    if (avatarLetter) {
      avatarLetter.textContent = "G";
      avatarLetter.style.backgroundColor = "#132f58";
    }

    if (userName) {
      userName.textContent = "Guest";
    }

    // Reset register link
    const registerLink = document.querySelector('a[href="profile.html"]');
    if (registerLink) {
      registerLink.innerHTML =
        '<i class="fas fa-user-plus"></i><span>Register</span>';
      registerLink.href = "registration.html";
    }
  }
}

// Function to handle logout
function handleLogout() {
  localStorage.removeItem("userData");
  updateSideMenu();
  window.location.href = "index.html";
}

// Add logout button to side menu if user is logged in
function addLogoutButton() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const sideNavMenu = document.querySelector(".side-nav-menu");

  if (userData && userData.username && sideNavMenu) {
    // Check if logout button already exists
    if (!document.querySelector(".logout-button")) {
      const logoutLink = document.createElement("a");
      logoutLink.href = "#";
      logoutLink.className = "side-nav-link logout-button";
      logoutLink.innerHTML =
        '<i class="fas fa-sign-out-alt"></i><span>Logout</span>';
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        handleLogout();
      });

      sideNavMenu.appendChild(logoutLink);
    }
  } else {
    // Remove logout button if it exists
    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
      logoutButton.remove();
    }
  }
}

// Initialize side menu when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  updateSideMenu();
  addLogoutButton();

  // Add smooth transitions
  const avatarLetter = document.querySelector(".side-nav-avatar-letter");
  const userName = document.querySelector(".side-nav-user-name");

  if (avatarLetter) {
    avatarLetter.style.transition = "all 0.3s ease";
  }

  if (userName) {
    userName.style.transition = "all 0.3s ease";
  }
});

// Listen for storage changes (in case user logs in/out in another tab)
window.addEventListener("storage", function (e) {
  if (e.key === "userData") {
    updateSideMenu();
    addLogoutButton();
  }
});
