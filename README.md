# Wedding Registration Form Backend

## Instructions to Run the Server

1. **Install MongoDB:**
   - If you haven't already, download and install MongoDB from the [official website](https://www.mongodb.com/try/download/community).
   - Follow the installation instructions for your operating system.

2. **Start MongoDB:**
   - Open a terminal and run the following command to start the MongoDB server:
     ```
     mongod
     ```
   - Ensure that the MongoDB server is running before proceeding to the next step.

3. **Set Up the Project:**
   - Navigate to the project directory in your terminal.
   - Install the required dependencies by running:
     ```
     npm install express mongoose body-parser dotenv
     ```

4. **Configure Environment Variables:**
   - Open the `.env` file and replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

5. **Start the Server:**
   - Run the following command to start the server:
     ```
     node server.js
     ```
   - The server should now be running on `http://localhost:3000`.

6. **Test the Form Submission:**
   - Open the `lakhs.html` file in your browser and fill out the registration form.
   - Upon submission, the form data should be sent to the MongoDB database.

## Note:
Make sure to handle any errors that may arise during the process and check the console for any logs or messages.
#   E v e n t M a n a g e m e n t  
 