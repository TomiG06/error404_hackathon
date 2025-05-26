document.addEventListener("DOMContentLoaded", function () {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Update side menu with user data
  updateSideMenu();

  // Initialize match cards
  initializeMatchCards();

  // Set up filter event listeners
  setupFilters();
});

function updateSideMenu() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const avatarLetter = document.querySelector(".side-nav-avatar-letter");
  const userName = document.querySelector(".side-nav-user-name");

  if (userData.username) {
    avatarLetter.textContent = userData.username.charAt(0).toUpperCase();
    userName.textContent = userData.username;
  }
}

function initializeMatchCards() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const matchCards = document.getElementById("matchCards");
  const matchCount = document.getElementById("matchCount");

  // Filter out current user and create match cards
  const potentialMatches = users.filter((user) => user.id !== userData.id);
  matchCount.textContent = potentialMatches.length;

  // Clear existing cards
  matchCards.innerHTML = "";

  // Create match cards
  potentialMatches.forEach((match) => {
    const card = createMatchCard(match, userData);
    matchCards.appendChild(card);
  });
}

function createMatchCard(match, currentUser) {
  const template = document.getElementById("matchCardTemplate");
  const card = template.content.cloneNode(true);

  // Set basic info
  card.querySelector(".avatar-letter").textContent = match.username
    .charAt(0)
    .toUpperCase();
  card.querySelector(".match-name").textContent = match.username;
  card.querySelector(".match-university").textContent = match.university;

  // Set preferences and budget
  card.querySelector(".preference-text").textContent =
    "Looking for a quiet study environment";
  card.querySelector(".budget-text").textContent = "€200-€300";

  // Calculate compatibility (mock for now)
  const compatibility = Math.floor(Math.random() * 40) + 60; // 60-100%
  const compatibilityFill = card.querySelector(".compatibility-fill");
  const compatibilityText = card.querySelector(".compatibility-text");

  compatibilityFill.style.width = `${compatibility}%`;
  compatibilityText.textContent = `${compatibility}% Match`;

  // Add event listeners for actions
  const likeButton = card.querySelector(".match-action.like");
  const messageButton = card.querySelector(".match-action.message");

  likeButton.addEventListener("click", () => handleLike(match.id));
  messageButton.addEventListener("click", () => handleMessage(match.id));

  return card;
}

function setupFilters() {
  const filterButton = document.querySelector(".filter-button");
  filterButton.addEventListener("click", applyFilters);
}

function applyFilters() {
  const university = document.getElementById("university").value;
  const preferences = document.getElementById("preferences").value;
  const budget = document.getElementById("budget").value;

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const matchCards = document.getElementById("matchCards");
  const matchCount = document.getElementById("matchCount");

  // Filter users based on criteria
  let filteredMatches = users.filter((user) => user.id !== userData.id);

  if (university) {
    filteredMatches = filteredMatches.filter(
      (user) => user.university === university,
    );
  }

  // Update match count
  matchCount.textContent = filteredMatches.length;

  // Clear and update cards
  matchCards.innerHTML = "";
  filteredMatches.forEach((match) => {
    const card = createMatchCard(match, userData);
    matchCards.appendChild(card);
  });
}

function handleLike(matchId) {
  // Get current likes from localStorage
  const likes = JSON.parse(localStorage.getItem("likes") || "[]");

  // Check if already liked
  if (likes.includes(matchId)) {
    // Unlike
    const newLikes = likes.filter((id) => id !== matchId);
    localStorage.setItem("likes", JSON.stringify(newLikes));
    showNotification("Removed from favorites");
  } else {
    // Like
    likes.push(matchId);
    localStorage.setItem("likes", JSON.stringify(likes));
    showNotification("Added to favorites");
  }

  // Update UI
  updateLikeButton(matchId);
}

function handleMessage(matchId) {
  // For now, just show a notification
  showNotification("Messaging feature coming soon!");
}

function updateLikeButton(matchId) {
  const likes = JSON.parse(localStorage.getItem("likes") || "[]");
  const likeButton = document.querySelector(
    `.match-action.like[data-match-id="${matchId}"]`,
  );

  if (likeButton) {
    if (likes.includes(matchId)) {
      likeButton.classList.add("active");
    } else {
      likeButton.classList.remove("active");
    }
  }
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  // Add to document
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function refreshMatches() {
  initializeMatchCards();
  showNotification("Matches refreshed!");
}

function updatePreferences() {
  // For now, just show a notification
  showNotification("Preference update feature coming soon!");
}

// Add some CSS for notifications
const style = document.createElement("style");
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .match-action.like.active {
        color: #ff4757;
    }
    
    .match-action.like.active i {
        animation: heartBeat 0.3s ease;
    }
    
    @keyframes heartBeat {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
