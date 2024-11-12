# Student Management System

A comprehensive Student Management System built with the MERN stack (MongoDB, Express, React, and Node.js). This system enables users to manage student data, offering full CRUD functionality along with Firebase-based authentication, form validation, and a responsive design tailored for desktop, tablet, and smartphone devices.

## Features

### 1. **Authentication**
   - **Firebase**: Firebase is used for user authentication, managing the login and registration process. The system validates login success or failure and displays corresponding messages.
   - **Register and Login**: Users can register with their details and later log in with their credentials to access the system.
   - **Validation**: Checks if login details are correct; if not, displays a "Login Failed" message.

### 2. **CRUD Operations**
   - **Create**: Add new students with required details such as name, register number, phone number, date of birth, etc.
   - **Read**: View a list of all students stored in the database, displayed on the Profile page.
   - **Update**: Edit student details directly from the Profile page, without redirection.
   - **Delete**: Remove student records from the database as required.

### 3. **Form Validation**
   - Validations are enforced on the form inputs, including:
     - **Phone Number**: Ensures a valid 10-digit phone number is entered.
     - **Date of Birth (DOB)**: Validates the structure with separate fields for day, month, and year.
     - **Blood Group and Grade**: Ensures valid blood group options (e.g., A+, B-, etc.) and grades (e.g., from LKG to XII) are selected from predefined options.

### 4. **Responsive UI**
   - The user interface is designed to adapt to various screen sizes, providing an optimal experience on desktop, tablet, and smartphone devices.
   - **Landscape Layout**: Consistent layout across devices, including animations and gradient styles.
   - **Unified Design**: The system uses a common design theme across all components to ensure visual consistency.

### 5. **Profile Page**
   - The Profile page serves as the central hub for managing student information.
   - **Direct Management**: Users can add, view, edit, and delete students without redirection to different pages, offering a seamless user experience.

### 6. **Data Storage**
   - **MongoDB**: The database used for storing student records, connected to the backend using Mongoose.
   - **Environment Variables**: Database URI is stored in an environment variable (MONGO_URI) for security.

### 7. **API Requests**
   - **Axios**: Axios is used for handling API requests between the frontend and backend, simplifying HTTP requests for CRUD operations.



