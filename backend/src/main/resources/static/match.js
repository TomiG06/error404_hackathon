document.addEventListener('DOMContentLoaded', function () {
    // Profile data for the application
    const profiles = [
        {
            name: "Μαρία Λαπατα, 19",
            location: "5 miles away from Univercity of Ioannina, 250$ per month",
            bio: "Ευρίχορο, Μοντερνο, Ανεκενισμενο, Επιπλομενο μερικος, Φοιτιτης, Γυναικα, Προτιμηση γυναικα συγγατικο, ",
            interests: ["Close to Uni", "Cheap", "Woman wanted", "Modern", "semi-furnished"]
        },
        {
            name: "Αλέξανδρος Παππάς, 21",
            location: "3 miles away from Aristotle University of Thessaloniki, 300$ per month",
            bio: "Μικρό διαμέρισμα, Άνετο, Πλήρως επιπλωμένο, Φοιτητής, Άνδρας, Προτιμώ άνδρα συγκάτοικο",
            interests: ["Close to Uni", "Fully furnished", "Male wanted", "Quiet neighborhood", "Budget-friendly"]
        },
        {
            name: "Ειρήνη Κωνσταντίνου, 22",
            location: "2 miles away from National Technical University of Athens, 280$ per month",
            bio: "Μεγάλο δωμάτιο σε διαμέρισμα, Μοντέρνο, Ησυχία, Μερικώς επιπλωμένο, Φοιτήτρια, Γυναίκα, Ανοιχτή σε οποιοδήποτε φύλο συγκάτοικο",
            interests: ["Close to Uni", "Spacious", "Modern", "Quiet area", "Shared expenses"]
        },
        {
            name: "Ελένη Παπαδοπούλου, 21",
            location: "4 miles away from Democritus University of Thrace, 250$ per month",
            bio: "Μικρό διαμέρισμα, Απλό, Μερικώς επιπλωμένο, Φοιτήτρια, Γυναίκα, Ανοιχτή σε οποιοδήποτε φύλο συγκάτοικο",
            interests: ["Simple", "Close to Uni", "Budget-friendly", "Shared bills", "Quiet area"]
        },
        {
            name: "Ανδρέας Γεωργίου, 23",
            location: "5 miles away from Ionian University, 300$ per month",
            bio: "Διαμέρισμα με μπαλκόνι, Μοντέρνο, Πλήρως επιπλωμένο, Φοιτητής, Άνδρας, Προτιμώ άνδρα συγκάτοικο",
            interests: ["Balcony", "Modern", "Fully furnished", "Close to Uni", "Male wanted"]
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
    const API_URL = 'http://localhost:8080/api/users';

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
        const currentProfile = profiles[currentProfileIndex];

        // Add the appropriate animation class
        if (direction === 'left') {
            currentPhoto.classList.add('swipe-left');
        } else {
            currentPhoto.classList.add('swipe-right');
            
            // Send like to backend
            sendLikeToBackend(currentProfile, currentProfileIndex);
        }

        // After animation completes, move to next profile
        setTimeout(() => {
            // Remove animation class
            currentPhoto.classList.remove('swipe-left', 'swipe-right');

            // Move to next profile with wrap-around
            currentProfileIndex = (currentProfileIndex + 1) % profiles.length;

            // Update the display for the new profile
            updateProfileDisplay(currentProfileIndex);
            expandCurrentPhoto();

            // Show feedback message
            showFeedbackMessage(direction);
        }, 500); // Should match animation duration
    }

    // Function to send like data to the backend
    function sendLikeToBackend(profile, profileIndex) {
        // Get the current user ID (you'll need to implement how you store this)
        const currentUserId = getCurrentUserId();
        
        // Create like data
        const likeData = {
            userId: currentUserId,
            likedProfile: profile.name, // Assuming name is unique identifier
            profileIndex: profileIndex,
            timestamp: new Date().toISOString()
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
        // Remove expanded class from all photos and display them none
        photoContainers.forEach(container => {
            container.classList.remove('expanded');
            container.style.display = 'none';
        });

        // Get the current photo container
        const currentPhoto = photoContainers[currentProfileIndex];
        
        // Get the dimensions of the profile section
        const profileSectionRect = profileSection.getBoundingClientRect();
        
        // Display the current photo
        currentPhoto.style.display = 'block';
        
        // Add the expanded class
        currentPhoto.classList.add('expanded');
        
        // Set the size to match the profile section
        currentPhoto.style.width = `${profileSectionRect.width}px`;
        currentPhoto.style.height = `${profileSectionRect.height}px`;
        
        // Ensure the photo is visible in the photos section
        photoContainers[0].scrollIntoView({ behavior: 'smooth' });
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
            transition: 'opacity 0.3s ease'
        });

        // Add to DOM
        document.body.appendChild(message);

        // Show the message with a slight delay
        setTimeout(() => {
            message.style.opacity = '1';

            // Hide and remove after 2 seconds
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 2000);
        }, 100);
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