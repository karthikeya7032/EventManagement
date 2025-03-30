
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/marriageRegistration', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Schema & Model
// const registrationSchema = new mongoose.Schema({
//     registrationId: String,
//     groomName: String,
//     brideName: String,
//     groomAadhaar: String,
//     brideAadhaar: String,
//     groomAge: Number,
//     brideAge: Number,
//     marriageDate: String,
//     packageSelect: String,
//     phoneNumber: String,
//     religion: String
// });
// const Registration = mongoose.model('Registration', registrationSchema);

// // Route to handle form submission
// app.post('/submit-form', async (req, res) => {
//     try {
//         const { groomName, brideName, groomAadhaar, brideAadhaar, groomAge, brideAge, marriageDate, packageSelect, phoneNumber, religion } = req.body;
        
//         // Basic validation
//         if (!groomName || !brideName || !groomAadhaar || !brideAadhaar || !groomAge || !brideAge || !marriageDate || !packageSelect || !phoneNumber || !religion) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         if (groomAge < 21 || brideAge < 18) {
//             return res.status(400).json({ message: "Invalid age for marriage" });
//         }
        
//         const registrationId = uuidv4();
//         const newRegistration = new Registration({
//             registrationId,
//             groomName,
//             brideName,
//             groomAadhaar,
//             brideAadhaar,
//             groomAge,
//             brideAge,
//             marriageDate,
//             packageSelect,
//             phoneNumber,
//             religion
//         });
//         await newRegistration.save();

//         res.status(201).json({ message: "Registration successful", data: { registrationId } });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/marriageRegistration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema & Model
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
    numberOfGuests: Number // New field
});
const Registration = mongoose.model('Registration', registrationSchema);

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const { groomName, brideName, groomAadhaar, brideAadhaar, groomAge, brideAge, marriageDate, packageSelect, phoneNumber, religion, numberOfGuests } = req.body;
        
        // Basic validation
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
            numberOfGuests
        });
        await newRegistration.save();

        res.status(201).json({ 
            message: "Registration successful", 
            data: { registrationId }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Route to fetch registration details
app.get('/get-registration', async (req, res) => {
    try {
        const { registrationId } = req.query;
        if (!registrationId) {
            return res.status(400).json({ message: "Registration ID is required" });
        }
        
        const registration = await Registration.findOne({ registrationId });
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }
        
        res.status(200).json({ data: registration });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
