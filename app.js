const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com', // Your Gmail email address
        pass: 'your_password' // Your Gmail password or an app-specific password
    }
});

// Form submission route
app.post('/submitForm', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Email content
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'your_email@gmail.com', // Your email address where you want to receive the form data
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error submitting the form. Please try again later." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
