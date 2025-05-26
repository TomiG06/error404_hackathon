// Profile Page JavaScript

// DOM Elements
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileUniversity = document.getElementById("profileUniversity");
const username = document.getElementById("username");
const email = document.getElementById("email");
const university = document.getElementById("university");
const studyYear = document.getElementById("studyYear");
const livingStyle = document.getElementById("livingStyle");
const budget = document.getElementById("budget");
const sleepSchedule = document.getElementById("sleepSchedule");
const smoking = document.getElementById("smoking");
const notifications = document.getElementById("notifications");

// Mock user data (replace with actual API calls)
let userData = {
  name: "Guest User",
  email: "guest@example.com",
  university: "uoi",
  studyYear: "1",
  livingStyle: "balanced",
  budget: "medium",
  sleepSchedule: "flexible",
  smoking: "no",
  notifications: true,
};

// Initialize profile data
function initializeProfile() {
  // Set profile header info
  profileName.textContent = userData.name;
  profileEmail.textContent = userData.email;
  profileUniversity.textContent = getUniversityName(userData.university);

  // Set form values
  username.value = userData.name;
  email.value = userData.email;
  university.value = userData.university;
  studyYear.value = userData.studyYear;
  livingStyle.value = userData.livingStyle;
  budget.value = userData.budget;
  sleepSchedule.value = userData.sleepSchedule;
  smoking.value = userData.smoking;
  notifications.checked = userData.notifications;

  // Set avatar letter
  const avatarLetters = document.querySelectorAll(".avatar-letter");
  avatarLetters.forEach((letter) => {
    letter.textContent = userData.name.charAt(0).toUpperCase();
  });
}

// Helper function to get university name
function getUniversityName(code) {
  const universities = {
    uoi: "University of Ioannina",
    auth: "Aristotle University of Thessaloniki",
    ntua: "National Technical University of Athens",
    duth: "Democritus University of Thrace",
    ionio: "Ionian University",
  };
  return universities[code] || code;
}

// Edit profile mode
let isEditMode = false;

function editProfile() {
  isEditMode = !isEditMode;
  const inputs = document.querySelectorAll(".profile-input");
  const editButton = document.querySelector(".action-button.primary");

  inputs.forEach((input) => {
    input.disabled = !isEditMode;
  });

  if (isEditMode) {
    editButton.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    editButton.onclick = saveProfile;
  } else {
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
    editButton.onclick = editProfile;
  }
}

// Save profile changes
function saveProfile() {
  // Collect form data
  const updatedData = {
    name: username.value,
    email: email.value,
    university: university.value,
    studyYear: studyYear.value,
    livingStyle: livingStyle.value,
    budget: budget.value,
    sleepSchedule: sleepSchedule.value,
    smoking: smoking.value,
    notifications: notifications.checked,
  };

  // Here you would typically make an API call to update the user data
  console.log("Saving profile changes:", updatedData);

  // Update local data
  userData = { ...userData, ...updatedData };

  // Update profile display
  profileName.textContent = userData.name;
  profileEmail.textContent = userData.email;
  profileUniversity.textContent = getUniversityName(userData.university);

  // Update avatar letters
  const avatarLetters = document.querySelectorAll(".avatar-letter");
  avatarLetters.forEach((letter) => {
    letter.textContent = userData.name.charAt(0).toUpperCase();
  });

  // Exit edit mode
  editProfile();

  // Show success message
  showNotification("Profile updated successfully!", "success");
}

// Change password
function changePassword() {
  // Here you would typically show a modal or redirect to a password change page
  console.log("Change password clicked");
  showNotification("Password change functionality coming soon!", "info");
}

// Delete account
function deleteAccount() {
  if (
    confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    )
  ) {
    // Here you would typically make an API call to delete the account
    console.log("Deleting account");
    showNotification("Account deletion functionality coming soon!", "warning");
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add("show"), 10);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

// Initialize profile when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeProfile);

// Add notification styles
const style = document.createElement("style");
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: var(--card-bg);
        color: var(--text-color);
        box-shadow: var(--card-shadow);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateX(120%);
        transition: transform 0.3s ease-in-out;
        z-index: 1000;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        background: var(--success-color);
        color: white;
    }

    .notification.error {
        background: var(--danger-color);
        color: white;
    }

    .notification.warning {
        background: var(--warning-color);
        color: white;
    }

    .notification.info {
        background: var(--info-color);
        color: white;
    }

    .notification i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);
