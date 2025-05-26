document.addEventListener("DOMContentLoaded", function () {
  // Profile data for the application
  const profiles = [
    {
      name: "Mary Jameson, 19",
      location: "CSE student at University of Ioannina",
      bio: "Early riser who loves starting the day with yoga and meditation. Enjoys cooking healthy meals. Looking for someone who shares similar lifestyle habits.",
      interests: [
        "Early Bird",
        "Fitness Enthusiast",
        "Clean Freak",
        "Nature Lover",
        "Cooking",
      ],
    },
    {
      name: "Alex Papas, 21",
      location: "Computer Science student at Aristotle University",
      bio: "Night owl who enjoys coding late into the night. Loves playing guitar and hosting small gatherings. Prefers a clean and organized living space.",
      interests: [
        "Night Owl",
        "Music Lover",
        "Social Butterfly",
        "Clean Freak",
        "Tech Enthusiast",
      ],
    },
    {
      name: "Eirini Konstantinou, 22",
      location: "Architecture student at NTUA",
      bio: "Creative soul who loves art and design. Enjoys quiet evenings with a good book and occasional social gatherings. Maintains a balanced lifestyle with regular exercise.",
      interests: [
        "Bookworm",
        "Fitness Enthusiast",
        "Creative",
        "Social Butterfly",
        "Early Bird",
      ],
    },
    {
      name: "Eleni Papadopoulou, 21",
      location: "Medical student at Democritus University",
      bio: "Dedicated student who balances study time with self-care. Enjoys cooking, reading, and occasional movie nights. Values cleanliness and organization.",
      interests: [
        "Clean Freak",
        "Bookworm",
        "Homebody",
        "Early Bird",
        "Cooking",
      ],
    },
    {
      name: "Andreas Georgiou, 23",
      location: "Business student at Ionian University",
      bio: "Active lifestyle enthusiast who enjoys sports and outdoor activities. Social and outgoing, loves meeting new people. Maintains a clean and organized living space.",
      interests: [
        "Fitness Enthusiast",
        "Social Butterfly",
        "Clean Freak",
        "Early Bird",
        "Sports Lover",
      ],
    },
  ];

  // Update the userPhotos object to only use alex1-3.jpg
  const userPhotos = {
    "Mary Jameson, 19": ["alex1.jpg", "alex2.jpg", "alex3.jpg"],
    "Alex Papas, 21": ["alex1.jpg", "alex2.jpg", "alex3.jpg"],
    "Eirini Konstantinou, 22": ["alex1.jpg", "alex2.jpg", "alex3.jpg"],
    "Eleni Papadopoulou, 21": ["alex1.jpg", "alex2.jpg", "alex3.jpg"],
    "Andreas Georgiou, 23": ["alex1.jpg", "alex2.jpg", "alex3.jpg"],
  };

  // DOM elements
  const photoContainers = document.querySelectorAll(".photo-container");
  const skipButton = document.getElementById("skip-button");
  const likeButton = document.getElementById("like-button");
  const profileName = document.querySelector(".profile-name");
  const profileLocation = document.querySelector(".profile-location");
  const profileBio = document.querySelector(".bio-content");
  const interestTags = document.querySelector(".interest-tags");
  const profileSection = document.querySelector(".profile-section");

  // Backend API URL - Replace with your actual API endpoint
  const API_URL = "http://localhost:8080/api/users/{userId}/like/{postId}";

  // Track current profile
  let currentProfileIndex = 0;
  let currentPhotoIndex = 0;
  let isGalleryOpen = false;

  // Initialize profile display
  updateProfileDisplay(currentProfileIndex);
  expandCurrentPhoto();

  // Set up event listeners for the buttons
  skipButton.addEventListener("click", function () {
    handleSwipe("left");
  });

  likeButton.addEventListener("click", function () {
    handleSwipe("right");
  });

  // Move these to the top level, outside DOMContentLoaded
  const GalleryManager = {
    modal: null,
    isOpen: false,
    currentIndex: 0,

    init() {
      if (this.modal) return;
      this.createGalleryModal();
      this.bindEvents();
    },

    createGalleryModal() {
      this.modal = document.createElement("div");
      this.modal.className = "photo-gallery-modal";
      this.modal.innerHTML = `
                <div class="gallery-content">
                    <img class="gallery-main-photo" src="" alt="Profile photo">
                    <div class="gallery-thumbnails"></div>
                    <button class="gallery-close">&times;</button>
                    <button class="gallery-nav gallery-prev">&lt;</button>
                    <button class="gallery-nav gallery-next">&gt;</button>
                </div>
            `;
      document.body.appendChild(this.modal);
    },

    bindEvents() {
      if (!this.modal) return;

      const closeBtn = this.modal.querySelector(".gallery-close");
      const prevBtn = this.modal.querySelector(".gallery-prev");
      const nextBtn = this.modal.querySelector(".gallery-next");

      if (closeBtn) closeBtn.onclick = () => this.close();
      if (prevBtn) prevBtn.onclick = () => this.navigate("prev");
      if (nextBtn) nextBtn.onclick = () => this.navigate("next");

      this.modal.onclick = (e) => {
        if (e.target === this.modal) this.close();
      };

      document.addEventListener("keydown", (e) => {
        if (!this.isOpen) return;
        switch (e.key) {
          case "Escape":
            this.close();
            break;
          case "ArrowLeft":
            this.navigate("prev");
            break;
          case "ArrowRight":
            this.navigate("next");
            break;
        }
      });
    },

    open(userName) {
      if (!userName || !userPhotos[userName]) return;

      const photos = userPhotos[userName];
      if (!photos || !photos.length) return;

      this.isOpen = true;
      this.currentIndex = 0;
      this.updateGallery(photos);
      this.modal.classList.add("active");
      document.body.style.overflow = "hidden";
    },

    close() {
      this.isOpen = false;
      this.modal.classList.remove("active");
      document.body.style.overflow = "";
    },

    navigate(direction) {
      const currentProfile = profiles[currentProfileIndex];
      const photos = userPhotos[currentProfile.name];
      if (!photos || !photos.length) return;

      this.currentIndex =
        direction === "prev"
          ? (this.currentIndex - 1 + photos.length) % photos.length
          : (this.currentIndex + 1) % photos.length;

      this.updateGallery(photos);
    },

    updateGallery(photos) {
      const mainPhoto = this.modal.querySelector(".gallery-main-photo");
      const thumbnails = this.modal.querySelector(".gallery-thumbnails");

      if (!mainPhoto || !thumbnails) return;

      // Preload the current photo
      const currentPhoto = new Image();
      currentPhoto.onload = () => {
        mainPhoto.src = photos[this.currentIndex];
        mainPhoto.style.opacity = "0";
        requestAnimationFrame(() => {
          mainPhoto.style.opacity = "1";
        });
      };
      currentPhoto.onerror = () => {
        console.error("Failed to load photo:", photos[this.currentIndex]);
        mainPhoto.src = "placeholder.jpg";
      };
      currentPhoto.src = photos[this.currentIndex];

      // Update thumbnails
      thumbnails.innerHTML = photos
        .map(
          (photo, i) => `
                <img class="gallery-thumbnail ${i === this.currentIndex ? "active" : ""}" 
                     src="${photo}" 
                     alt="Thumbnail ${i + 1}"
                     data-index="${i}"
                     onclick="GalleryManager.currentIndex = ${i}; GalleryManager.updateGallery(${JSON.stringify(photos)})">
            `,
        )
        .join("");
    },
  };

  // Initialize gallery immediately
  GalleryManager.init();

  // Function to update the profile display
  function updateProfileDisplay(index) {
    const profile = profiles[index];

    // Update profile details
    profileName.textContent = profile.name;
    profileLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${profile.location}`;

    // Transform bio into more engaging bullet points
    const bioPoints = profile.bio
      .split(". ")
      .filter((point) => point.trim().length > 0)
      .map((point) => {
        // Remove common phrases and make it more direct
        point = point
          .replace(
            /Looking for someone who shares similar lifestyle habits\.?/i,
            "",
          )
          .replace(/Enjoys?/i, "")
          .replace(/Loves?/i, "")
          .replace(/Prefers?/i, "")
          .replace(/Maintains?/i, "")
          .replace(/Values?/i, "")
          .replace(/Dedicated to/i, "")
          .replace(/Creative soul who/i, "")
          .replace(/Active lifestyle enthusiast who/i, "")
          .replace(/Social and outgoing,/i, "")
          .replace(/who enjoys/i, "")
          .replace(/who loves/i, "")
          .replace(/who balances/i, "")
          .trim();

        // Add personality to the statements
        if (point.toLowerCase().includes("early riser")) {
          return "🌅 Early bird who starts the day with yoga & meditation";
        }
        if (point.toLowerCase().includes("night owl")) {
          return "🌙 Night owl who codes into the wee hours";
        }
        if (point.toLowerCase().includes("cooking")) {
          return "👨‍🍳 Loves whipping up healthy meals";
        }
        if (point.toLowerCase().includes("nature")) {
          return "🌿 Weekend warrior exploring nature trails";
        }
        if (point.toLowerCase().includes("guitar")) {
          return "🎸 Jams on guitar & hosts cozy gatherings";
        }
        if (point.toLowerCase().includes("art and design")) {
          return "🎨 Creative mind with an eye for design";
        }
        if (point.toLowerCase().includes("book")) {
          return "📚 Curls up with a good book on quiet evenings";
        }
        if (point.toLowerCase().includes("exercise")) {
          return "💪 Keeps fit with regular workouts";
        }
        if (point.toLowerCase().includes("clean")) {
          return "✨ Takes pride in a spotless space";
        }
        if (point.toLowerCase().includes("social gatherings")) {
          return "🎉 Life of the party at social events";
        }
        if (point.toLowerCase().includes("sports")) {
          return "⚡️ Sports enthusiast always up for a game";
        }
        if (point.toLowerCase().includes("meeting new people")) {
          return "🤝 Social butterfly who loves making new friends";
        }
        if (point.toLowerCase().includes("study")) {
          return "📖 Dedicated student with a passion for learning";
        }
        if (point.toLowerCase().includes("movie nights")) {
          return "🎬 Movie buff who loves cozy film nights";
        }

        // For any remaining points, make them more concise and add an emoji
        return (
          "✨ Takes pride in a spotless space" +
          point.charAt(0).toUpperCase() +
          point.slice(1).toLowerCase()
        );
      });

    // Update bio with transformed points
    profileBio.innerHTML = `
            <ul class="bio-points">
                ${bioPoints.map((point) => `<li>${point}</li>`).join("")}
            </ul>
        `;

    // Update interest tags
    interestTags.innerHTML = "";
    profile.interests.forEach((interest) => {
      const tag = document.createElement("span");
      tag.className = "interest-tag";
      tag.textContent = interest;
      interestTags.appendChild(tag);
    });
  }

  // Function to handle swiping (left for skip, right for like)
  function handleSwipe(direction) {
    const currentPhoto = photoContainers[currentProfileIndex];
    const nextPhoto =
      photoContainers[(currentProfileIndex + 1) % profiles.length];
    const currentProfile = profiles[currentProfileIndex];

    // Show feedback message immediately
    showFeedbackMessage(direction === "left" ? "Skipped" : "Liked");

    // Add animation class
    currentPhoto.classList.add(`swipe-${direction}`);

    if (direction === "right") {
      sendLikeToBackend(currentProfile, currentProfileIndex);
    }

    // Prepare next photo
    nextPhoto.style.display = "block";
    nextPhoto.style.opacity = "0";
    nextPhoto.style.transform = "scale(0.95)";

    // Transition to next photo
    setTimeout(() => {
      currentPhoto.style.opacity = "0";
      nextPhoto.style.opacity = "1";
      nextPhoto.style.transform = "scale(1)";
    }, 150);

    // Clean up and update
    setTimeout(() => {
      currentPhoto.classList.remove("swipe-left", "swipe-right");
      currentPhoto.style.transform = "scale(1)";
      currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
      updateProfileDisplay(currentProfileIndex);
      expandCurrentPhoto();
    }, 500);
  }

  // Function to send like data to the backend
  function sendLikeToBackend(profile, profileIndex) {
    // Get the current user ID (you'll need to implement how you store this)
    const currentUserId = getCurrentUserId();

    // Create like data
    const likeData = {
      userId: "7",
      postId: "1",
      //likedProfile: profile.name, // Assuming name is unique identifier
      //profileIndex: profileIndex,
      //timestamp: new Date().toISOString()
    };

    // Send the data to your backend
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`, // Get your auth token
      },
      body: JSON.stringify(likeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Like successfully sent to backend:", data);

        // Check if this is a match
        if (data.isMatch) {
          showMatchNotification(profile);
        }
      })
      .catch((error) => {
        console.error("Error sending like to backend:", error);
        // Optionally implement retry logic or user notification
      });
  }

  // Helper function to get the current user ID
  function getCurrentUserId() {
    // Replace with your actual implementation
    // This could come from localStorage, a cookie, or your auth system
    return localStorage.getItem("currentUserId") || "user123";
  }

  // Helper function to get the authentication token
  function getAuthToken() {
    // Replace with your actual implementation
    return localStorage.getItem("authToken") || "default-auth-token";
  }

  // Function to show a match notification
  function showMatchNotification(matchedProfile) {
    const matchModal = document.createElement("div");
    matchModal.className = "match-modal";
    matchModal.innerHTML = `
            <div class="match-content">
                <h2>It's a Match!</h2>
                <p>You and ${matchedProfile.name.split(",")[0]} liked each other</p>
                <div class="match-buttons">
                    <button class="send-message-btn">Send Message</button>
                    <button class="continue-swiping-btn">Keep Swiping</button>
                </div>
            </div>
        `;

    // Style the modal
    Object.assign(matchModal.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "2000",
    });

    document.body.appendChild(matchModal);

    // Add event listeners to buttons
    matchModal
      .querySelector(".continue-swiping-btn")
      .addEventListener("click", function () {
        document.body.removeChild(matchModal);
      });

    matchModal
      .querySelector(".send-message-btn")
      .addEventListener("click", function () {
        // Redirect to messages or open message UI
        window.location.href = `/messages?with=${encodeURIComponent(matchedProfile.name)}`;
      });
  }

  // Function to expand the current photo to match the profile section size
  function expandCurrentPhoto() {
    const currentPhoto = photoContainers[currentProfileIndex];
    const nextPhoto =
      photoContainers[(currentProfileIndex + 1) % profiles.length];
    const profileSectionRect = profileSection.getBoundingClientRect();

    photoContainers.forEach((container, index) => {
      const img = container.querySelector("img");

      // Add gallery button if it doesn't exist
      if (!container.querySelector(".gallery-button")) {
        const profile = profiles[index];
        const photos = userPhotos[profile.name] || [];
        const photoCount = photos.length;

        // Only add gallery button if there are multiple photos
        if (photoCount > 1) {
          const button = document.createElement("button");
          button.className = "gallery-button";
          button.setAttribute(
            "aria-label",
            `View ${photoCount} photos of ${profile.name}`,
          );
          button.setAttribute("role", "button");
          button.setAttribute("tabindex", "0");
          button.innerHTML = `
                        <i class="fas fa-images" aria-hidden="true"></i>
                        <span class="photo-count" aria-label="${photoCount} photos">${photoCount}</span>
                    `;

          // Add click handler with debounce
          let clickTimeout;
          button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Prevent double clicks
            if (clickTimeout) return;
            clickTimeout = setTimeout(() => {
              clickTimeout = null;
            }, 300);

            if (profile && profile.name && userPhotos[profile.name]) {
              // Add visual feedback
              button.style.transform = "scale(0.95)";
              setTimeout(() => {
                button.style.transform = "";
              }, 150);

              GalleryManager.open(profile.name);
            }
          };

          // Add keyboard support with proper focus management
          button.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              button.click();
            }
          };

          // Add focus management
          button.addEventListener("focus", () => {
            container.style.outline = "none";
          });

          // Add hover state management for touch devices
          let touchTimeout;
          button.addEventListener("touchstart", () => {
            button.style.transform = "scale(0.98)";
            clearTimeout(touchTimeout);
          });

          button.addEventListener("touchend", () => {
            touchTimeout = setTimeout(() => {
              button.style.transform = "";
            }, 150);
          });

          container.appendChild(button);
        }
      }

      // Add like/skip indicators if they don't exist
      if (!container.querySelector(".like-indicator")) {
        const likeIndicator = document.createElement("div");
        likeIndicator.className = "like-indicator";
        likeIndicator.textContent = "LIKE";
        container.appendChild(likeIndicator);
      }

      if (!container.querySelector(".skip-indicator")) {
        const skipIndicator = document.createElement("div");
        skipIndicator.className = "skip-indicator";
        skipIndicator.textContent = "SKIP";
        container.appendChild(skipIndicator);
      }

      // Remove swipe handling from the container itself
      container.style.cursor = "default";
      container.removeEventListener("mousedown", handleDragStart);
      container.removeEventListener("touchstart", handleDragStart);

      if (index === currentProfileIndex) {
        container.style.display = "block";
        container.style.opacity = "1";
        container.style.position = "relative";
        container.style.zIndex = "2";

        // Ensure the current photo's indicators are visible
        const likeIndicator = container.querySelector(".like-indicator");
        const skipIndicator = container.querySelector(".skip-indicator");
        if (likeIndicator) likeIndicator.style.display = "block";
        if (skipIndicator) skipIndicator.style.display = "block";

        if (img) {
          if (!img.complete) {
            img.onload = () => {
              img.classList.add("loaded");
              // Ensure gallery button is visible after image loads
              const galleryButton = container.querySelector(".gallery-button");
              if (galleryButton) {
                galleryButton.style.opacity = "1";
              }
            };
            img.onerror = () => {
              img.style.display = "none";
              container.style.backgroundColor = "var(--bg-color)";
            };
          } else {
            img.classList.add("loaded");
          }
        }
      } else {
        // Hide indicators for non-current photos
        const likeIndicator = container.querySelector(".like-indicator");
        const skipIndicator = container.querySelector(".skip-indicator");
        if (likeIndicator) likeIndicator.style.display = "none";
        if (skipIndicator) skipIndicator.style.display = "none";

        container.style.display = "block";
        container.style.opacity = "0";
        container.style.position = "absolute";
        container.style.top = "0";
        container.style.left = "0";
        container.style.zIndex = "1";

        if (img) {
          if (!img.complete) {
            img.onload = () => img.classList.add("loaded");
            img.onerror = () => {
              img.style.display = "none";
              container.style.backgroundColor = "var(--bg-color)";
            };
          } else {
            img.classList.add("loaded");
          }
        }
      }
    });

    // Update photo container sizes
    [currentPhoto, nextPhoto].forEach((photo) => {
      if (photo) {
        photo.style.width = `${profileSectionRect.width}px`;
        photo.style.height = `${profileSectionRect.height}px`;
        photo.style.transition = "opacity 0.3s ease";
      }
    });
  }

  // Update CSS for the gallery indicator to ensure it's clickable
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
            .gallery-indicator {
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(4px);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 20px;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 10;
                border: 2px solid rgba(255, 255, 255, 0.2);
                cursor: pointer;
                pointer-events: auto;
            }

            .photo-container:hover .gallery-indicator {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }

            .gallery-indicator:hover {
                background: rgba(255, 255, 255, 0.25);
                transform: translateX(-50%) translateY(2px);
                border-color: rgba(255, 255, 255, 0.3);
            }

            .gallery-indicator:active {
                transform: translateX(-50%) translateY(0);
                background: rgba(255, 255, 255, 0.2);
            }

            .photo-container {
                cursor: default !important;
            }

            .photo-container img {
                pointer-events: none;
            }

            .like-indicator, .skip-indicator {
                position: absolute;
                top: 20px;
                padding: 8px 16px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 24px;
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 2;
                pointer-events: none;
                text-transform: uppercase;
                letter-spacing: 1px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.2);
                backdrop-filter: blur(4px);
            }

            .like-indicator {
                right: 20px;
                background: rgba(53, 199, 89, 0.9);
                color: white;
                border: 2px solid rgba(255,255,255,0.8);
            }

            .skip-indicator {
                left: 20px;
                background: rgba(254, 60, 114, 0.9);
                color: white;
                border: 2px solid rgba(255,255,255,0.8);
            }

            .photo-container.swipe-left .skip-indicator,
            .photo-container.swipe-right .like-indicator {
                opacity: 1;
                transform: scale(1);
            }
        </style>
    `,
  );

  // Smooth drag handling for cards
  const cards = document.querySelectorAll(".photo-container");
  let currentCard = null;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;
  let dragThreshold = 50; // pixels to drag before committing to swipe
  let velocityThreshold = 0.3; // minimum velocity for swipe
  let startTime = 0; // Add this at the top with other variables

  function handleDragStart(e) {
    if (isDragging) return;

    const card = e.target.closest(".photo-container");
    if (
      !card ||
      card.classList.contains("swipe-left") ||
      card.classList.contains("swipe-right")
    )
      return;

    isDragging = true;
    currentCard = card;
    startTime = Date.now();
    card.classList.add("dragging");

    // Get initial touch/click position
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;
    currentX = 0;
    currentY = 0;

    // Prepare next profile
    const nextIndex = (currentProfileIndex + 1) % profiles.length;
    const nextPhoto = photoContainers[nextIndex];
    if (nextPhoto) {
      nextPhoto.style.display = "block";
      nextPhoto.style.opacity = "0";
      nextPhoto.style.transform = "scale(0.95)";
      nextPhoto.style.zIndex = "1";
    }
  }

  function handleDragMove(e) {
    if (!isDragging || !currentCard) return;

    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    // Add physics-based movement
    const dragDistance = Math.abs(deltaX);
    const resistance = Math.min(dragDistance / 1000, 0.3); // Add resistance as you drag further
    const verticalResistance = 0.3; // Reduce vertical movement

    currentX = deltaX * (1 - resistance);
    currentY = deltaY * verticalResistance;

    // Calculate rotation based on drag distance and direction
    const rotate = deltaX * 0.1 * (1 - resistance);

    // Calculate opacity based on drag distance
    const opacity = 1 - Math.min(Math.abs(deltaX) / 400, 0.5);

    // Update card transform with physics
    updateCardTransform(currentCard, currentX, currentY, rotate, opacity);

    // Update next card preview
    const nextIndex = (currentProfileIndex + 1) % profiles.length;
    const nextPhoto = photoContainers[nextIndex];
    if (nextPhoto) {
      const nextOpacity = Math.min(Math.abs(deltaX) / 400, 0.5);
      const nextScale = 0.95 + nextOpacity * 0.1;
      nextPhoto.style.opacity = nextOpacity.toString();
      nextPhoto.style.transform = `scale(${nextScale})`;
    }

    e.preventDefault();
  }

  function updateCardTransform(card, x, y, rotate, opacity) {
    card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
    card.style.opacity = opacity;

    // Update like/skip indicators
    card.classList.remove("dragging-left", "dragging-right");
    if (x > dragThreshold) {
      card.classList.add("dragging-right");
    } else if (x < -dragThreshold) {
      card.classList.add("dragging-left");
    }
  }

  function handleDragEnd(e) {
    if (!isDragging || !currentCard) return;

    const touch = e.changedTouches ? e.changedTouches[0] : e;
    const deltaX = touch.clientX - startX;
    const deltaTime = Date.now() - startTime;
    const velocity = Math.abs(deltaX) / deltaTime;

    // Enhanced swipe detection with velocity and distance
    const shouldSwipe =
      Math.abs(deltaX) > dragThreshold || velocity > velocityThreshold;
    const direction = deltaX > 0 ? "right" : "left";

    if (shouldSwipe) {
      // Add swipe animation class
      currentCard.classList.add(`swipe-${direction}`);

      // Handle the swipe
      handleSwipe(direction);

      // Clean up after animation
      setTimeout(() => {
        currentCard.remove();
        // Update profile display
        currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
        updateProfileDisplay(currentProfileIndex);
        expandCurrentPhoto();
      }, 300);
    } else {
      // Spring back animation
      currentCard.style.transition = "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
      currentCard.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
      currentCard.style.opacity = "1";

      // Reset next card
      const nextIndex = (currentProfileIndex + 1) % profiles.length;
      const nextPhoto = photoContainers[nextIndex];
      if (nextPhoto) {
        nextPhoto.style.opacity = "0";
        nextPhoto.style.transform = "scale(0.95)";
      }

      // Remove transition after animation
      setTimeout(() => {
        currentCard.style.transition = "";
      }, 300);
    }

    isDragging = false;
    currentCard = null;
  }

  // Add keyboard controls
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      skipButton.click();
    } else if (event.key === "ArrowRight") {
      likeButton.click();
    }
  });

  // Initialize by expanding the first photo
  expandCurrentPhoto();

  // Add event listeners to all cards
  cards.forEach((card) => {
    card.addEventListener("mousedown", handleDragStart);
    card.addEventListener("touchstart", handleDragStart, { passive: false });

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("touchmove", handleDragMove, { passive: false });

    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);
  });

  // Prevent text selection while dragging
  document.addEventListener("selectstart", (e) => {
    if (isDragging) e.preventDefault();
  });

  // Call after DOM content loaded
  document.addEventListener("DOMContentLoaded", function () {
    // ... rest of initialization code ...
  });

  // Add back the original feedback message function
  function showFeedbackMessage(message) {
    const feedback = document.createElement("div");
    feedback.className = "feedback-message";
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Force reflow
    feedback.offsetHeight;

    // Add active class
    feedback.classList.add("active");

    // Remove after animation
    setTimeout(() => {
      feedback.classList.remove("active");
      setTimeout(() => feedback.remove(), 300);
    }, 1000);
  }

  // Update the CSS for feedback messages and gallery
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
            .feedback-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px 40px;
                border-radius: 8px;
                font-size: 24px;
                font-weight: bold;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1000;
                pointer-events: none;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            .feedback-message.active {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }

            .photo-gallery-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }

            .photo-gallery-modal.active {
                display: flex !important;
            }

            .gallery-content {
                position: relative;
                width: 90%;
                max-width: 1200px;
                height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }

            .gallery-main-photo {
                max-width: 100%;
                max-height: 70vh;
                width: auto;
                height: auto;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .gallery-thumbnails {
                display: flex;
                gap: 10px;
                padding: 10px;
                overflow-x: auto;
                max-width: 100%;
                scrollbar-width: thin;
                scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
            }

            .gallery-thumbnails::-webkit-scrollbar {
                height: 6px;
            }

            .gallery-thumbnails::-webkit-scrollbar-track {
                background: transparent;
            }

            .gallery-thumbnails::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }

            .gallery-thumbnail {
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                opacity: 0.6;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }

            .gallery-thumbnail:hover {
                opacity: 0.8;
                transform: scale(1.05);
            }

            .gallery-thumbnail.active {
                opacity: 1;
                border-color: white;
                transform: scale(1.05);
            }

            .gallery-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.5);
                border: none;
                color: white;
                font-size: 30px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            }

            .gallery-close:hover {
                background: rgba(0, 0, 0, 0.8);
            }

            .gallery-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                border: none;
                color: white;
                font-size: 24px;
                width: 50px;
                height: 50px;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .gallery-prev { left: 20px; }
            .gallery-next { right: 20px; }

            .gallery-nav:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: translateY(-50%) scale(1.1);
            }

            @media (max-width: 768px) {
                .gallery-content {
                    width: 95%;
                }

                .gallery-thumbnail {
                    width: 80px;
                    height: 80px;
                }

                .gallery-nav {
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                }
            }
        </style>
    `,
  );

  function createSticker(type) {
    // Create sticker with initial styles for better performance
    const sticker = document.createElement("div");
    sticker.className = `sticker ${type}`;
    sticker.textContent = type.toUpperCase();

    // Force GPU acceleration and optimize initial render
    sticker.style.transform = "translate(-50%, -50%) translate3d(0, 0, 0)";
    sticker.style.opacity = "0";

    // Add to DOM before animation starts
    document.body.appendChild(sticker);

    // Force a reflow to ensure initial styles are applied
    sticker.offsetHeight;

    // Start animation in the next frame
    requestAnimationFrame(() => {
      sticker.style.animation =
        "stickerPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    });

    return sticker;
  }

  function showSticker(type) {
    const sticker = createSticker(type);

    // Use requestAnimationFrame for smoother timing
    requestAnimationFrame(() => {
      setTimeout(() => {
        sticker.classList.add("fade-out");
        setTimeout(() => {
          sticker.remove();
        }, 400);
      }, 500);
    });
  }

  function handleLike(container) {
    if (!container || container.classList.contains("swiped")) return;

    container.classList.add("swiped");
    showSticker("like");

    // Optimize container animation
    requestAnimationFrame(() => {
      container.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      container.classList.add("swipe-right");

      setTimeout(() => {
        container.style.opacity = "0";
        container.style.transform = "translateX(150%) rotate(15deg)";
        setTimeout(() => {
          container.remove();
          updateProfileInfo();
        }, 400);
      }, 50);
    });
  }

  function handleSkip(container) {
    if (!container || container.classList.contains("swiped")) return;

    container.classList.add("swiped");
    showSticker("skip");

    // Optimize container animation
    requestAnimationFrame(() => {
      container.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      container.classList.add("swipe-left");

      setTimeout(() => {
        container.style.opacity = "0";
        container.style.transform = "translateX(-150%) rotate(-15deg)";
        setTimeout(() => {
          container.remove();
          updateProfileInfo();
        }, 400);
      }, 50);
    });
  }

  // Update the event listeners
  document.getElementById("like-button").addEventListener("click", () => {
    const currentContainer = document.querySelector(
      ".photo-container:not(.swiped)",
    );
    if (currentContainer) {
      handleLike(currentContainer);
    }
  });

  document.getElementById("skip-button").addEventListener("click", () => {
    const currentContainer = document.querySelector(
      ".photo-container:not(.swiped)",
    );
    if (currentContainer) {
      handleSkip(currentContainer);
    }
  });

  // Update the swipe handlers
  function handleSwipeEnd(container, xDiff) {
    if (Math.abs(xDiff) > 100) {
      if (xDiff > 0) {
        handleLike(container);
      } else {
        handleSkip(container);
      }
    } else {
      // Reset position if swipe wasn't far enough
      container.style.transform = "";
      container.style.opacity = "";
    }
  }
});
