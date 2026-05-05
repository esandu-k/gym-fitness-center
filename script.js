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
        const hideLoader = () => {
            if (loader.classList.contains('fade-out')) return; // Already hiding

            setTimeout(() => {
                loader.classList.add('fade-out');
                document.body.style.overflow = 'auto'; // Re-enable scrolling

                // Remove loader from DOM after animation
                setTimeout(() => {
                    if (loader.parentNode) loader.remove();
                }, 800);
            }, 2500); // Minimum 2.5s visibility for the premium feel
        };

        // Standard load trigger
        window.addEventListener('load', hideLoader);

        // Safety fallback (ensures loader hides even if a resource fails to load)
        setTimeout(hideLoader, 5000);
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

// Google Login Callback
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // You can decode the JWT to get user info here, or send it to a backend
    alert("Google Login Successful!\n\nNote: For security reasons, the JWT token is logged to the console.");
}
