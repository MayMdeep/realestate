# MERN Stack Real Estate Dashboard - Backend

This is the backend component of the MERN (MongoDB, Express.js, React.js, Node.js) stack real estate dashboard project. It provides the API and server-side logic for managing real estate listings, user authentication, and other features.

---
## Login to Dashboard:
email :admin5@gmail.com
password: 123456789
## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [License](#license)

---

## Features
- **User Authentication**: Register, login, and manage user profiles.
- **Real Estate Listings**: Create, read, update, and delete property listings.
- **Search and Filter**: Search for properties based on location, price, and other criteria.
- **Admin Dashboard**: Manage users, listings, and site settings.

---
## Screenshots

![Application Screenshot](./screenshots/Capture1.png)
![Application Screenshot](./screenshots/Capture2.png)
![Application Screenshot](./screenshots/Capture3.png)

## Technologies Used
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose for schema modeling)
  - JSON Web Tokens (JWT) for authentication
- **Frontend**:
  - React.js
  - Redux (for state management)
  - Axios (for API calls)
- **Other Tools**:
  - Git (for version control)
  - Postman (for API testing)
  - Docker (optional, for containerization)

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based)
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/MayMdeep/realestate.git 
   1. **Navigate to the Backend Directory**:
   ```bash
    cd MERN-STACK-REAL-ESTATE-DASHBOARD/Backend
    cd MERN-STACK-REAL-ESTATE-DASHBOARD/Backend
    npm install
    npm run dev

    cd ../admin-dashboard
    npm install
    npm start

## 🐳 Docker Setup

This project includes Docker support for both the backend and frontend. Follow the steps below to run the application using Docker.

### Prerequisites
- Docker installed on your machine.
- Docker Compose installed.

### Steps to Run the Application
1. Clone the repository:
   ```bash
    git clone https://github.com/MayMdeep/realestate
    cd realestate
