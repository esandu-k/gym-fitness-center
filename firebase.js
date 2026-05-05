// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// Check for login result if the user was redirected (fallback for mobile)
getRedirectResult(auth).then((result) => {
    if (result) {
        alert(`Welcome to the Club, ${result.user.displayName}!`);
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

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (auth.currentUser) {
            // User is logged in, log them out
            signOut(auth).then(() => {
                alert("Logged out successfully");
            }).catch((error) => console.error("Logout Error:", error));
        } else {
            // BEST PRACTICE: Try Popup first. If mobile blocks it, fallback to Redirect.
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    alert(`Welcome to the Club, ${user.displayName}!`);
                }).catch((error) => {
                    // If the browser blocks the popup (very common on mobile), use redirect
                    if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                        signInWithRedirect(auth, provider);
                    } else {
                        console.error("Login Error:", error);
                        alert("Login failed: " + error.message + " (Code: " + error.code + ")");
                    }
                });
        }
    });

    // Listen for authentication state changes to update button UI
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginBtn.innerText = "Log Out";
            loginBtn.style.background = "linear-gradient(135deg, #e53e3e, #c53030)";
            loginBtn.style.color = "#fff";
        } else {
            loginBtn.innerText = "Login with Google";
            loginBtn.style.background = "#ffffff";
            loginBtn.style.color = "#000";
        }
    });
}
