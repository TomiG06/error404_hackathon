// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Get the registration form element
    const registrationForm = document.getElementById('registrationForm');

    // Email input element
    const emailInput = document.getElementById('email');

    // Add blur event listener to check email availability when user leaves the field
    emailInput.addEventListener('blur', function () {
        checkEmailAvailability(emailInput.value.trim());
    });

    // Function to check if email is already in use
    function checkEmailAvailability(email) {
        // Only check if the email field has a value and passes basic validation
        if (!email) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return;

        // Show loading indicator
        const emailField = emailInput.parentElement;
        let statusMessage = emailField.querySelector('.status-message');

        if (!statusMessage) {
            statusMessage = document.createElement('div');
            statusMessage.className = 'status-message';
            emailField.appendChild(statusMessage);
        }

        statusMessage.textContent = 'Checking email...';
        statusMessage.style.color = '#666';

        // Make API call to check email availability
        fetch('http://localhost:8080/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.exists) {
                    // Email already exists
                    statusMessage.textContent = 'This email is already registered.';
                    statusMessage.style.color = '#d9534f'; // Red color for error
                    emailInput.setCustomValidity('This email is already registered.');
                } else {
                    // Email is available
                    statusMessage.textContent = 'Email is available.';
                    statusMessage.style.color = '#5cb85c'; // Green color for success
                    emailInput.setCustomValidity('');
                }
            })
            .catch((error) => {
                console.error('Error checking email:', error);
                statusMessage.textContent = 'Could not verify email availability.';
                statusMessage.style.color = '#f0ad4e'; // Orange color for warning
                emailInput.setCustomValidity('');
            });
    }

    // Add submit event listener to the form
    registrationForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get form values
        const username = document.getElementById('username').value.trim();
        const email = emailInput.value.trim();
        const password = document.getElementById('password').value;

        // Basic validation
        if (!username || !email || !password) {
            alert('Please fill out all fields');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Check if email has any custom validity message (meaning it's already in use)
        if (emailInput.validity.customError) {
            alert(emailInput.validationMessage);
            return;
        }

        // Create the data object to send to backend
        const userData = {
            username: "John",
            email: "test@gmail.com",
        };

        // Send data to backend using fetch API
        fetch('http://localhost:8080/api/users/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    // Check if the error is about duplicate email
                    if (response.status === 409) {
                        throw new Error('Email already in use');
                    }
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle successful registration
                alert('Registration successful!');

                // Store user data in local storage (except password for security)
                const userDataForStorage = {
                    username: username,
                    email: email,
                    id: data.userId || data.id || Date.now(), // Use ID from server response or create timestamp ID
                    isLoggedIn: true,
                    registeredAt: new Date().toISOString(),
                };

                // Save to local storage
                localStorage.setItem('userData', JSON.stringify(userDataForStorage));

                // Remove status message if it exists
                const statusMessage = document.querySelector('.status-message');
                if (statusMessage) {
                    statusMessage.remove();
                }

                // Redirect back to navigation page
                window.location.href = 'index-logedin.html';
            })
            .catch((error) => {
                // Handle errors from the backend
                console.error('Error during registration:', error);

                if (error.message === 'Email already in use') {
                    alert('This email is already registered. Please use a different email address.');
                    emailInput.focus();
                } else {
                    alert('Registration failed. Please try again later.');
                }
            });
    });
});