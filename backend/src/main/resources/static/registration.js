import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [emailStatus, setEmailStatus] = useState({
        message: '',
        color: '#666'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const checkEmailAvailability = async (email) => {
        if (!email) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return;

        setIsLoading(true);
        setEmailStatus({
            message: 'Checking email...',
            color: '#666'
        });

        try {
            const response = await fetch('http://localhost:8080/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
            const data = await response.json();

            if (data.exists) {
                setEmailStatus({
                    message: 'This email is already registered.',
                    color: '#d9534f'
                });
            } else {
                setEmailStatus({
                    message: 'Email is available.',
                    color: '#5cb85c'
                });
            }
        } catch (error) {
            console.error('Error checking email:', error);
            setEmailStatus({
                message: 'Could not verify email availability.',
                color: '#f0ad4e'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.email || !formData.password) {
            alert('Please fill out all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                }),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Email already in use');
                }
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Store user data in local storage
            const userDataForStorage = {
                username: formData.username,
                email: formData.email,
                id: data.userId || data.id || Date.now(),
                isLoggedIn: true,
                registeredAt: new Date().toISOString(),
            };

            localStorage.setItem('userData', JSON.stringify(userDataForStorage));
            alert('Registration successful!');
            window.location.href = 'index-logedin.html';
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.message === 'Email already in use') {
                alert('This email is already registered. Please use a different email address.');
            } else {
                alert('Registration failed. Please try again later.');
            }
        }
    };

    return (
        <form id="registrationForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => checkEmailAvailability(formData.email)}
                    required
                />
                {emailStatus.message && (
                    <div className="status-message" style={{ color: emailStatus.color }}>
                        {emailStatus.message}
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default RegistrationForm;