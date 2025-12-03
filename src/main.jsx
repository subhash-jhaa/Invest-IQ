import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProfileForm from "./pages/ProfileForm";
import FundSuggestions from "./pages/FundSuggestions";
import Settings from "./pages/Settings";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Calculator } from "./pages/Calculator";
import { SipCalculator } from "./components/SipCalculator";
import { FDCalculator } from "./components/FDCalculator";
import EMICalculator from "./components/EMICalculator";
import SWPCalculator from "./components/SWPCalculator";
import MFCalculator from "./components/MFCalculator";
import { Outlet } from "react-router-dom";
import BlogsSection from "./components/BlogSection";
import { ChatbotProvider } from "./context/ChatBotContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile-form",
        element: (
          <ProtectedRoute>
            <ProfileForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fund-suggestions",
        element: (
          <ProtectedRoute>
            <FundSuggestions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calculator",
        element: (
          <ProtectedRoute>
            <Calculator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calculator/sip",
        element: (
          <ProtectedRoute>
            <SipCalculator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calculator/fd",
        element: (
          <ProtectedRoute>
            <FDCalculator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calculator/emi",
        element: (
          <ProtectedRoute>
            <EMICalculator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calculator/swp",
        element: (
          <ProtectedRoute>
            <SWPCalculator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calculator/mf",
        element: (
          <ProtectedRoute>
            <MFCalculator />
          </ProtectedRoute>
        ),
      },

      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/blog",
        element: (
          <ProtectedRoute>
            <BlogsSection />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <ChatbotProvider>
          <RouterProvider router={router} />
        </ChatbotProvider>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
);
