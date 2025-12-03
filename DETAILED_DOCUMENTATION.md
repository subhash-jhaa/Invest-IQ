# InvestIQ – Comprehensive Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Setup](#project-setup)
5. [Environment Variables](#environment-variables)
6. [Application Architecture](#application-architecture)
7. [Frontend Components](#frontend-components)
8. [Backend Services](#backend-services)
9. [APIs and Integrations](#apis-and-integrations)
10. [User Guide](#user-guide)
11. [Testing and Debugging](#testing-and-debugging)
12. [Deployment](#deployment)
13. [Future Enhancements](#future-enhancements)
14. [Acknowledgements](#acknowledgements)
15. [Contact](#contact)

---

## 1. Introduction

InvestIQ is an AI-powered investment platform designed to simplify financial planning and investment for users of all experience levels. By leveraging advanced AI models and real-time data, InvestIQ provides personalized insights and tools to help users make informed financial decisions.

---

## 2. Features

### Key Functionalities
- **AI-Powered Fund Suggestions**: Personalized recommendations based on user profiles.
- **Live Gold Prices**: Real-time updates using GoldAPI.
- **Interactive Chatbot**: AI-driven chatbot for financial queries.
- **Investment Calculators**: Tools for SIP, EMI, FD, and SWP calculations.
- **Beginner-Friendly Blogs**: Simplified financial concepts for new investors.

---

## 3. Technology Stack

| Category       | Stack                                       |
|----------------|---------------------------------------------|
| **Frontend**   | React, Tailwind CSS, Framer Motion          |
| **Backend**    | Appwrite (Auth & DB), Node.js (planned)     |
| **AI**         | Gemini API (Google AI)                      |
| **APIs**       | GoldAPI (Gold Prices), Hardcoded MF data    |
| **Dev Tools**  | Vite, React Icons, GitHub Actions (optional)|

---

## 4. Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/subhashjha/InvestIQ.git
   cd InvestIQ
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add environment variables (see [Environment Variables](#environment-variables)).
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`.

---

## 5. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOLD_API_KEY=your_gold_api_key
```

---

## 6. Application Architecture

### Overview
The application follows a modular architecture with a clear separation of concerns:
- **Frontend**: Built with React and styled using Tailwind CSS.
- **Backend**: Appwrite handles authentication and database operations.
- **APIs**: External APIs for AI and gold price data.

### Directory Structure
- **src/components**: Reusable UI components.
- **src/context**: Context API for global state management.
- **src/pages**: Main application pages.
- **src/services**: API service files.
- **src/utils**: Utility functions and custom hooks.

---

## 7. Frontend Components

### Key Components
- **Navbar**: Top navigation bar with links to key sections.
- **Sidebar**: Collapsible menu for quick navigation.
- **Chatbot**: Interactive chatbot for user queries.
- **Calculators**: SIP, EMI, FD, and SWP calculators.
- **Fund Suggestions**: Displays personalized fund recommendations.

---

## 8. Backend Services

### Appwrite
- **Authentication**: User login and signup.
- **Database**: Stores user profiles and investment data.

### Planned Enhancements
- Node.js server for advanced business logic.

---

## 9. APIs and Integrations

### Gemini API
- Provides AI-driven insights and fund suggestions.

### GoldAPI
- Fetches real-time gold prices.

---

## 10. User Guide

### Getting Started
1. Sign up or log in to your account.
2. Complete the profile form to set your financial goals.
3. Explore fund suggestions and use calculators for planning.

### Using the Chatbot
- Ask financial questions to get instant answers.

---

## 11. Testing and Debugging

### Running Tests
- Unit tests: `npm run test`
- End-to-end tests: `npm run e2e`

### Debugging Tips
- Use browser developer tools for frontend issues.
- Check Appwrite logs for backend errors.

---

## 12. Deployment

### Steps
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to Vercel:
   ```bash
   vercel deploy
   ```

---

## 13. Future Enhancements

- Add support for more investment types (e.g., stocks, bonds).
- Implement advanced AI models for better predictions.
- Enhance the chatbot with voice recognition.

---

## 14. Acknowledgements

- [Gemini AI](https://www.gemini.com/) for AI integration.
- [GoldAPI](https://www.goldapi.io/) for real-time gold prices.
- [Appwrite](https://appwrite.io/) for backend services.
- [Vercel](https://vercel.com/) for hosting.

---

## 15. Contact

For questions or feedback, reach out to **Subhash Jha** at subhashkumarjha162@gmail.com.