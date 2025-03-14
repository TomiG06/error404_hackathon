// Apply theme before the page renders
(function () {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', '');
    }
})();

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
    } else {
        document.documentElement.setAttribute('data-theme', '');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
    }

    // Toggle theme function
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            // Switch to light mode
            document.documentElement.setAttribute('data-theme', '');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', '');
            console.log('Switched to light mode');
        } else {
            // Switch to dark mode
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
            console.log('Switched to dark mode');
        }
    });

    // Log initial state
    console.log('Theme script loaded. Current theme:', document.documentElement.getAttribute('data-theme') || 'light');
});