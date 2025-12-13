// script.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggles the 'active' class to show/hide the menu
            navLinks.classList.toggle('active');
        });
    }
});