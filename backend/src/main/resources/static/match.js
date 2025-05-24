document.addEventListener('DOMContentLoaded', function () {
    // Profile data for the application
    const profiles = [
        {
            name: "Μαρία Λαπατα, 19",
            location: "CSE student at University of Ioannina",
            bio: "Early riser who loves starting the day with yoga and meditation. Enjoys cooking healthy meals and spending weekends exploring nature. Looking for someone who shares similar lifestyle habits.",
            interests: ["Early Bird", "Fitness Enthusiast", "Clean Freak", "Nature Lover", "Cooking"]
        },
        {
            name: "Αλέξανδρος Παππάς, 21",
            location: "Computer Science student at Aristotle University",
            bio: "Night owl who enjoys coding late into the night. Loves playing guitar and hosting small gatherings. Prefers a clean and organized living space.",
            interests: ["Night Owl", "Music Lover", "Social Butterfly", "Clean Freak", "Tech Enthusiast"]
        },
        {
            name: "Ειρήνη Κωνσταντίνου, 22",
            location: "Architecture student at NTUA",
            bio: "Creative soul who loves art and design. Enjoys quiet evenings with a good book and occasional social gatherings. Maintains a balanced lifestyle with regular exercise.",
            interests: ["Bookworm", "Fitness Enthusiast", "Creative", "Social Butterfly", "Early Bird"]
        },
        {
            name: "Ελένη Παπαδοπούλου, 21",
            location: "Medical student at Democritus University",
            bio: "Dedicated student who balances study time with self-care. Enjoys cooking, reading, and occasional movie nights. Values cleanliness and organization.",
            interests: ["Clean Freak", "Bookworm", "Homebody", "Early Bird", "Cooking"]
        },
        {
            name: "Ανδρέας Γεωργίου, 23",
            location: "Business student at Ionian University",
            bio: "Active lifestyle enthusiast who enjoys sports and outdoor activities. Social and outgoing, loves meeting new people. Maintains a clean and organized living space.",
            interests: ["Fitness Enthusiast", "Social Butterfly", "Clean Freak", "Early Bird", "Sports Lover"]
        }
    ];

    // DOM elements
    const photoContainers = document.querySelectorAll('.photo-container');
    const skipButton = document.getElementById('skip-button');
    const likeButton = document.getElementById('like-button');
    const profileName = document.querySelector('.profile-name');
    const profileLocation = document.querySelector('.profile-location');
    const profileBio = document.querySelector('.profile-bio p');
    const interestTags = document.querySelector('.interest-tags');
    const profileSection = document.querySelector('.profile-section');

    // Backend API URL - Replace with your actual API endpoint
    const API_URL = 'http://localhost:8080/api/users/{userId}/like/{postId}';

    // Track current profile
    let currentProfileIndex = 0;

    // Initialize profile display
    updateProfileDisplay(currentProfileIndex);
    expandCurrentPhoto();

    // Set up event listeners for the buttons
    skipButton.addEventListener('click', function () {
        handleSwipe('left');
    });

    likeButton.addEventListener('click', function () {
        handleSwipe('right');
    });

    // Function to handle swiping (left for skip, right for like)
    function handleSwipe(direction) {
        const currentPhoto = photoContainers[currentProfileIndex];
        const nextPhoto = photoContainers[(currentProfileIndex + 1) % profiles.length];
        const currentProfile = profiles[currentProfileIndex];

        // Add the appropriate animation class
        if (direction === 'left') {
            currentPhoto.classList.add('swipe-left');
        } else {
            currentPhoto.classList.add('swipe-right');
            // Send like to backend
            sendLikeToBackend(currentProfile, currentProfileIndex);
        }

        // Prepare next photo before animation completes
        nextPhoto.style.display = 'block';
        nextPhoto.style.opacity = '0';

        // After animation starts, begin transitioning to next photo
        setTimeout(() => {
            currentPhoto.style.opacity = '0';
            nextPhoto.style.opacity = '1';
        }, 100); // Faster transition

        // After animation completes, clean up and update
        setTimeout(() => {
            // Remove animation classes
            currentPhoto.classList.remove('swipe-left', 'swipe-right');
            
            // Move to next profile with wrap-around
            currentProfileIndex = (currentProfileIndex + 1) % profiles.length;

            // Update the display for the new profile
            updateProfileDisplay(currentProfileIndex);
            expandCurrentPhoto();

            // Show feedback message
            showFeedbackMessage(direction);
        }, 300); // Match animation duration
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}` // Get your auth token
            },
            body: JSON.stringify(likeData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Like successfully sent to backend:', data);
            
            // Check if this is a match
            if (data.isMatch) {
                showMatchNotification(profile);
            }
        })
        .catch(error => {
            console.error('Error sending like to backend:', error);
            // Optionally implement retry logic or user notification
        });
    }
    
    // Helper function to get the current user ID
    function getCurrentUserId() {
        // Replace with your actual implementation
        // This could come from localStorage, a cookie, or your auth system
        return localStorage.getItem('currentUserId') || 'user123';
    }
    
    // Helper function to get the authentication token
    function getAuthToken() {
        // Replace with your actual implementation
        return localStorage.getItem('authToken') || 'default-auth-token';
    }
    
    // Function to show a match notification
    function showMatchNotification(matchedProfile) {
        const matchModal = document.createElement('div');
        matchModal.className = 'match-modal';
        matchModal.innerHTML = `
            <div class="match-content">
                <h2>It's a Match!</h2>
                <p>You and ${matchedProfile.name.split(',')[0]} liked each other</p>
                <div class="match-buttons">
                    <button class="send-message-btn">Send Message</button>
                    <button class="continue-swiping-btn">Keep Swiping</button>
                </div>
            </div>
        `;
        
        // Style the modal
        Object.assign(matchModal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '2000'
        });
        
        document.body.appendChild(matchModal);
        
        // Add event listeners to buttons
        matchModal.querySelector('.continue-swiping-btn').addEventListener('click', function() {
            document.body.removeChild(matchModal);
        });
        
        matchModal.querySelector('.send-message-btn').addEventListener('click', function() {
            // Redirect to messages or open message UI
            window.location.href = `/messages?with=${encodeURIComponent(matchedProfile.name)}`;
        });
    }

    // Function to update the profile display
    function updateProfileDisplay(index) {
        const profile = profiles[index];

        // Update profile details
        profileName.textContent = profile.name;
        profileLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${profile.location}`;
        profileBio.textContent = profile.bio;

        // Update interest tags
        interestTags.innerHTML = '';
        profile.interests.forEach(interest => {
            const tag = document.createElement('span');
            tag.className = 'interest-tag';
            tag.textContent = interest;
            interestTags.appendChild(tag);
        });
    }

    // Function to expand the current photo to match the profile section size
    function expandCurrentPhoto() {
        // Get the current photo container
        const currentPhoto = photoContainers[currentProfileIndex];
        const nextPhoto = photoContainers[(currentProfileIndex + 1) % profiles.length];
        
        // Get the dimensions of the profile section
        const profileSectionRect = profileSection.getBoundingClientRect();
        
        // Prepare all photos
        photoContainers.forEach((container, index) => {
            if (index === currentProfileIndex) {
                // Current photo
                container.style.display = 'block';
                container.style.opacity = '1';
                container.style.position = 'relative';
                container.style.zIndex = '2';
            } else if (index === (currentProfileIndex + 1) % profiles.length) {
                // Next photo (preload)
                container.style.display = 'block';
                container.style.opacity = '0';
                container.style.position = 'absolute';
                container.style.top = '0';
                container.style.left = '0';
                container.style.zIndex = '1';
            } else {
                // Other photos
                container.style.display = 'none';
                container.style.opacity = '0';
                container.style.zIndex = '0';
            }
        });
        
        // Set dimensions for both current and next photo
        [currentPhoto, nextPhoto].forEach(photo => {
            if (photo) {
                photo.style.width = `${profileSectionRect.width}px`;
                photo.style.height = `${profileSectionRect.height}px`;
                photo.style.transition = 'opacity 0.3s ease';
            }
        });
    }

    // Function to show feedback message after swipe
    function showFeedbackMessage(direction) {
        const message = document.createElement('div');
        message.className = 'feedback-message';

        if (direction === 'left') {
            message.textContent = 'Skipped';
            message.style.backgroundColor = 'var(--skip-button-bg)';
        } else {
            message.textContent = 'Liked!';
            message.style.backgroundColor = 'var(--like-button-bg)';
        }

        // Style the message
        Object.assign(message.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            borderRadius: '20px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '1000',
            opacity: '0',
            transition: 'opacity 0.2s ease' // Faster transition
        });

        // Add to DOM
        document.body.appendChild(message);

        // Show the message with a slight delay
        setTimeout(() => {
            message.style.opacity = '1';

            // Hide and remove after 1.5 seconds (faster feedback)
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 200); // Faster removal
            }, 1500);
        }, 50); // Faster initial show
    }

    // Add keyboard controls
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            skipButton.click();
        } else if (event.key === 'ArrowRight') {
            likeButton.click();
        }
    });

    // Initialize by expanding the first photo
    expandCurrentPhoto();
});