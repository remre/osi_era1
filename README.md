# Era1 Event Planning Application

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Minimum Requirements](#minimum-requirements)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Design Choices and Approach](#design-choices-and-approach)
- [Future Work](#future-work)

## Introduction

Era1 is a comprehensive event planning application that enables users to create, join, and comment on events. The application is designed to provide an efficient and user-friendly experience with features such as event organization, user authentication, and a calendar-integrated interface. The project consists of a React frontend and two Node.js/Express-based backend microservices.

## Technologies Used

### Frontend

- React
- React Router
- Context API
- Axios
- TailwindCSS
- Vite

### Backend (for both services)

- Node.js
- Express
- Axios
- Dotenv

### Development Tools

- ESLint (app-wide)
- Prettier (app-wide)

## Minimum Requirements

- Node.js v14 or higher
- npm v6 or higher

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/remre/osi_era1.git
```

2. Navigate to the appropriate directories and install dependencies:

```bash
# For the frontend
cd frontend
npm install

# For the User and Authentication service
cd userlogin
npm install

# For the Event and Comment service
cd eventmanagement
npm install
```

3. Ensure .env files are properly set up:

- For the userlogin service, create a .envuser file based on the provided .envuser.example.
- For the eventmanagement service, create a .env file based on the provided .env.example.

## Running the Application

### Backend Services

To run the backend services:

```bash
# For the User and Authentication service
cd userlogin
npm start

# For the Event and Comment service
cd eventmanagement
npm start
```

### Frontend

To run the frontend:

```bash
cd frontend
npm run dev
```

## Features

- **User Registration and Login**: Users can securely register and log in using JWT for authentication.
- **Event Management**: Users can create, update, and delete their events. All events are displayed in a user-friendly interface.
- **Joining Events**: Users can join events created by others and view upcoming events in a dedicated section on the homepage.
- **Comments on Events**: Users can comment on events, facilitating discussions and feedback.
- **Calendar Integration**: A calendar interface enhances the user experience, providing an intuitive way to view and manage events.
- **Keyboard Navigation**: The app is fully navigable using the keyboard for accessibility and enhanced usability.

### Security Features

- **Inter-Microservice Communication**: JWT tokens are securely passed between the `userlogin` and `eventmanagement` services using HttpOnly cookies, preventing unauthorized access to event management functionalities.

## Design Choices and Approach

### Fast Development and Productivity

We chose **Vite** for the frontend and **Express** for the backend due to their lightweight and fast development capabilities. These tools significantly improve build times and developer productivity, making them ideal for this project.

### TypeScript Implementation

The project is primarily written in TypeScript to leverage its advantages:

- **Static Typing**: Reduces runtime errors by catching type-related issues during development.
- **Improved Code Quality**: Ensures better code maintainability and readability.
- **Enhanced Tooling**: Provides better integration with modern IDEs, offering intelligent code suggestions and refactoring support.

### State Management

The **Context API** was chosen for state management on the frontend, providing a straightforward solution for managing global application state without the need for an additional library like Redux.

### Code Splitting

Code splitting was implemented in the frontend to optimize performance by loading only the necessary code for each route or feature, reducing initial load times and enhancing user experience.

### Task-Based Microservices

We opted for a microservice architecture to separate the **User and Authentication Service** from the **Event and Comment Service**, ensuring better scalability and easier management of individual functionalities.

### Security

Authentication and user session management are implemented using **JWT** passed securely through HttpOnly cookies. This prevents unauthorized access and mitigates risks associated with token storage on the client-side.

### Notifications and Accessibility

- **Push Notifications**: Every push to the repository sends an automatic email notification to project observers.

## Future Work

- **Visual Enhancements for Events**: Add functionality for users to upload and associate images with events.
- **Dockerization**: Containerize the entire project for easier deployment and scalability in production environments.
