/**
 * The Gym Fitness Center - Main Script
 * Handles navigation and loading screen logic
 */

// Toggle Mobile Menu
function toggleMenu() {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when a link is tapped
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Loading Screen Logic
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
                document.body.style.overflow = 'auto'; // Re-enable scrolling

                // Remove loader from DOM after animation
                setTimeout(() => {
                    loader.remove();
                }, 800);
            }, 2500); // Minimum 2.5s visibility for the premium feel
        });
    }
});

// Scroll Reveal Effect (Optional but adds to premium feel)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
