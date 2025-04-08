const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001; // Changed from 3000 to 3001

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// ✅ Cleaned-up MongoDB connection
mongoose.connect('mongodb://localhost:27017/marriageRegistration')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Mongoose schema
const registrationSchema = new mongoose.Schema({
    registrationId: String,
    groomName: String,
    brideName: String,
    groomAadhaar: String,
    brideAadhaar: String,
    groomAge: Number,
    brideAge: Number,
    marriageDate: String,
    packageSelect: String,
    phoneNumber: String,
    religion: String,
    numberOfGuests: Number,
    predictedCost: Number
});
const Registration = mongoose.model('Registration', registrationSchema);

// Prediction function
const predictCost = async (religion, packageSelect, numberOfGuests) => {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                religion,
                package: packageSelect,
                guest_count: numberOfGuests
            })
        });

        if (!response.ok) {
            throw new Error('Prediction failed');
        }

        const result = await response.json();
        return result.predicted_cost;
    } catch (error) {
        console.error('Error getting prediction:', error);
        throw error;
    }
};

// Form submission route
app.post('/submit-form', async (req, res) => {
    try {
        const {
            groomName, brideName, groomAadhaar, brideAadhaar,
            groomAge, brideAge, marriageDate, packageSelect,
            phoneNumber, religion, numberOfGuests
        } = req.body;

        if (!groomName || !brideName || !groomAadhaar || !brideAadhaar || !groomAge || !brideAge || !marriageDate || !packageSelect || !phoneNumber || !religion || !numberOfGuests) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (groomAge < 21 || brideAge < 18) {
            return res.status(400).json({ message: "Invalid age for marriage" });
        }
        if (numberOfGuests < 1) {
            return res.status(400).json({ message: "Number of guests must be at least 1" });
        }

        const registrationId = uuidv4();
        const predictedCost = await predictCost(religion, packageSelect, numberOfGuests);

        const newRegistration = new Registration({
            registrationId,
            groomName,
            brideName,
            groomAadhaar,
            brideAadhaar,
            groomAge,
            brideAge,
            marriageDate,
            packageSelect,
            phoneNumber,
            religion,
            numberOfGuests,
            predictedCost
        });
        await newRegistration.save();

        res.json({
            registrationId: registrationId,
            predictedCost: predictedCost,
            redirectUrl: `/result?registrationId=${registrationId}&cost=${predictedCost}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Routes
app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/result.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/registrationform.html');
});

// Server start
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
