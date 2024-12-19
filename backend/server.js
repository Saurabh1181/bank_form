const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB
});

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
    },
});

// Utility function to send email
const sendEmail = async (formData, files) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
        subject: 'New Bank Form Submission',
        text: `Form Data:\n${JSON.stringify(formData, null, 2)}`,
        attachments: [
            ...(files.documentIdProof || []).map(file => ({
                filename: file.originalname,
                path: file.path,
            })),
            ...(files.documentAddressProof || []).map(file => ({
                filename: file.originalname,
                path: file.path,
            })),
        ],
    };

    return transporter.sendMail(mailOptions);
};

// Route to handle form submissions
app.post(
    '/api/submit-form',
    upload.fields([
        { name: 'documentIdProof', maxCount: 1 },
        { name: 'documentAddressProof', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const formData = req.body;
            const files = req.files;

            // Log incoming data for debugging
            console.log('Received form data:', formData);
            console.log('Received files:', files);

            // Validation
            if (!formData.customerName || !formData.mobileNo) {
                return res.status(400).json({ message: 'Missing required fields: customerName or mobileNo' });
            }

            // Ensure files were uploaded
            if (!files || (!files.documentIdProof && !files.documentAddressProof)) {
                return res.status(400).json({ message: 'ID Proof and Address Proof files are required.' });
            }

            // Send email with form data and attachments
            await sendEmail(formData, files);

            console.log('Email sent successfully');
            return res.status(200).json({ message: 'Form submitted and email sent successfully!' });
        } catch (error) {
            console.error('Error handling form submission:', error);
            return res.status(500).json({ message: 'Error processing the request', error: error.message });
        }
    }
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
