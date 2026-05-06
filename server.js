const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure your SMTP credentials here
// IMPORTANT: If you use Gmail, you MUST generate an "App Password" 
// (Google Account -> Security -> 2-Step Verification -> App Passwords)
// Do NOT use your regular Gmail password.
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: 'YOUR_EMAIL@gmail.com', // Replace with your email address
        pass: 'YOUR_APP_PASSWORD'     // Replace with your 16-character App Password
    }
});

app.post('/send-welcome-email', (req, res) => {
    const { userEmail, userName } = req.body;

    const mailOptions = {
        from: 'YOUR_EMAIL@gmail.com', // Should match auth.user
        to: userEmail,
        subject: 'Welcome to The Gym Fitness Center!',
        html: `
            <h2>Welcome Back, ${userName || 'Member'}!</h2>
            <p>We are thrilled to have you log in to The Gym Fitness Center portal.</p>
            <p>Keep up the great work with your fitness journey!</p>
            <br>
            <p>Best regards,<br><b>The Gym Team</b></p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email via Nodemailer:', error);
            return res.status(500).json({ error: error.toString() });
        }
        console.log('Welcome email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`Ready to send Nodemailer emails!`);
});
