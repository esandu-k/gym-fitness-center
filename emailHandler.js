// emailHandler.js

/**
 * INSTRUCTIONS:
 * 1. You no longer need EmailJS! I have configured a local Node.js server using Nodemailer.
 * 2. You MUST run `node server.js` in a separate terminal to start the email server.
 * 3. Make sure to update server.js with your Gmail credentials (App Password).
 */

export function initializeEmailJS() {
    // Left empty so it doesn't break firebase.js which calls this function
    console.log("Using Nodemailer Backend instead of EmailJS.");
}

export function sendWelcomeEmail(userEmail, userName) {
    console.log(`Sending Nodemailer welcome email to ${userEmail}...`);

    return fetch('http://localhost:3000/send-welcome-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userEmail: userEmail,
            userName: userName || "Member"
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Welcome email sent successfully via Nodemailer!");
        return true;
    })
    .catch((error) => {
        console.error("Failed to send welcome email via backend server:", error);
        return false;
    });
}

