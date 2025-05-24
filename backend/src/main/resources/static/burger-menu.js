document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.querySelector('.side-nav');
    const sideNavToggle = document.querySelector('.side-nav-toggle');

    if (sideNavToggle) {
        sideNavToggle.addEventListener('click', function() {
            sideNav.classList.toggle('expanded');
        });
    }
}); 