// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
            // User is not logged in, log them in
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    alert(`Welcome to the Club, ${user.displayName}!`);
                }).catch((error) => {
                    console.error("Login Error:", error);
                    alert("Login failed: " + error.message);
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
