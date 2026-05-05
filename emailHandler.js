// emailHandler.js

/**
 * INSTRUCTIONS:
 * 1. Make sure you have included the EmailJS script in your index.html <head>:
 *    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
 * 
 * 2. Import these functions in your firebase.js (or any other module file) like this:
 *    import { initializeEmailJS, sendWelcomeEmail } from './emailHandler.js';
 * 
 * 3. Call initializeEmailJS() once when the page loads.
 * 
 * 4. Call sendWelcomeEmail(user.email, user.displayName) right after a successful login!
 */

export function initializeEmailJS() {
    // Replace with your actual Public Key from the EmailJS Dashboard
    emailjs.init("tHh9U_M4R1v5_7YgJ");
}

export function sendWelcomeEmail(userEmail, userName) {
    // These parameters must exactly match the variables {{to_email}} and {{to_name}} in your EmailJS template
    const templateParams = {
        to_email: userEmail,
        to_name: userName || "Member",
        message: "Welcome to The Gym Fitness Center! We're thrilled to have you log in."
    };

    // Replace with your Service ID and Template ID from EmailJS
    return emailjs.send("service_7izwakp", "template_j3ohuhp", templateParams)
        .then(() => {
            console.log("Welcome email sent successfully to", userEmail);
            return true;
        })
        .catch((error) => {
            console.error("Failed to send welcome email:", error);
            return false;
        });
}
