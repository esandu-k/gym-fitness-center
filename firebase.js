// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { initializeEmailJS, sendWelcomeEmail } from './emailHandler.js';

const firebaseConfig = {
    apiKey: "AIzaSyBr2CBdJpYgkmjmqMHaWrgXKyDEPEpL6Qg",
    authDomain: "loging-to-the-club.firebaseapp.com",
    projectId: "loging-to-the-club",
    storageBucket: "loging-to-the-club.firebasestorage.app",
    messagingSenderId: "518673339481",
    appId: "1:518673339481:web:493e03d18d26a547148d48",
    measurementId: "G-4XP7YRHTXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Initialize EmailJS using the dedicated handler file
initializeEmailJS();

// Check for login result if the user was redirected (fallback for mobile)
getRedirectResult(auth).then((result) => {
    if (result) {
        alert(`Welcome to the Club, ${result.user.displayName}!`);
        sendWelcomeEmail(result.user.email, result.user.displayName);
    }
}).catch((error) => {
    console.error("Redirect Login Error:", error);
    // Ignore unauthorized domain so it doesn't spam local testing
    if (error.code !== 'auth/unauthorized-domain') {
        alert("Login failed after redirect: " + error.message + " (Code: " + error.code + ")");
    }
});

// Apply working functionality to the Google login
const loginBtn = document.getElementById('firebase-google-login');
const logoutBtn = document.getElementById('logout-btn');
const submitBtn = document.getElementById('submit-btn');
const emailInput = document.getElementById('email-input');
const loginPage = document.getElementById('login-page');
const mainApp = document.getElementById('main-app');

// Manual Form Login Logic
if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent page reload
        const email = emailInput ? emailInput.value : null;
        if (email && email.includes('@')) {
            alert("Attempting to log in and send email via backend...");
            // Send email using Nodemailer
            sendWelcomeEmail(email, "Member").then((success) => {
                if (success) {
                    // Mock login success UI change
                    if (loginPage) loginPage.classList.add('hidden');
                    if (mainApp) {
                        mainApp.style.display = 'block';
                        mainApp.style.animation = 'loginFadeUp 0.6s ease forwards';
                    }
                } else {
                    alert("Failed to send email. Is your backend server running with valid credentials?");
                }
            });
        } else {
            alert("Please enter a valid email address!");
        }
    });
}

// Google Login Logic
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // BEST PRACTICE: Try Popup first. If mobile blocks it, fallback to Redirect.
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                sendWelcomeEmail(user.email, user.displayName);
            }).catch((error) => {
                // If the browser blocks the popup (very common on mobile), use redirect
                if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                    signInWithRedirect(auth, provider);
                } else {
                    console.error("Login Error:", error);
                    alert("Login failed: " + error.message + " (Code: " + error.code + ")");
                }
            });
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).catch((error) => console.error("Logout Error:", error));
    });
}

// Listen for authentication state changes to update the UI
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in: Hide login page, show main app
        if (loginPage) loginPage.classList.add('hidden');
        if (mainApp) {
            mainApp.style.display = 'block';
            mainApp.style.animation = 'loginFadeUp 0.6s ease forwards';
        }
    } else {
        // User is logged out: Show login page, hide main app
        if (loginPage) loginPage.classList.remove('hidden');
        if (mainApp) mainApp.style.display = 'none';
    }
});
