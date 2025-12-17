# DayLine - Task Management Application

A modern full-stack task management web application built with **MERN** stack (MongoDB, Express.js, React.js, Node.js). DayLine allows users to create, manage, track, and organize daily tasks with features like priority levels, due dates, completion status, progress tracking, and user authentication.

**Live Demo:** [https://dayline-task.netlify.app](https://dayline-task.netlify.app)

## Project Structure

```
DayLine/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── taskController.js
│   │   ├── userController.js
│   │   └── authMiddlewares.js
│   ├── models/
│   │   ├── taskModel.js
│   │   └── userModel.js
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── node_modules/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Signup.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── App.jsx
│   │   ├── config.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── .env
│   └── node_modules/
├── .gitignore
└── package.json
```

## Features

- **User Authentication**: Secure signup, login, and profile management
- **Task Management**: Create, edit, delete, mark as completed tasks
- **Task Details**: Title, description, priority (High/Medium/Low), due date
- **Dashboard**: Overview with stats (Total/Done/Pending tasks), progress bars, recent activity
- **Search & Filters**: Search tasks, filter by status (All/Pending/Completed)
- **Responsive UI**: Clean and modern design
- **Real-time Updates**: Task progress and statistics

## Technologies Used

- **Frontend**: React.js, Vite, JSX, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Netlify (Frontend), Backend hosted separately (e.g., Render, Vercel, etc.)

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to `backend/` folder
2. Create `.env` file with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to `frontend/` folder
2. Create `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Future Improvements

- Add email notifications
- Task categories and tags
- Calendar integration
- Mobile responsiveness enhancements
  
## Author
Shivam Gangwar  
Email: shivamgangwar2197@gmail.com
