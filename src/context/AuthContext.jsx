import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../lib/appwrite";
import { ID } from "appwrite";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for active session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession("current");
        if (session) {
          setIsAuthenticated(true);
          const currentUser = await account.get();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        // Clear state on session error
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      // First check if there's already an active session
      try {
        const session = await account.getSession("current");
        if (session) {
          // User is already logged in
          const currentUser = await account.get();
          setUser(currentUser);
          setIsAuthenticated(true);
          return {
            success: true,
            message: "You are already logged in.",
          };
        }
      } catch (sessionError) {
        // No active session, continue with login
      }

      // Proceed with login
      await account.createEmailPasswordSession(email, password);
      setIsAuthenticated(true);
      const currentUser = await account.get();
      setUser(currentUser);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);

      // Handle specific Appwrite error codes
      if (error.code === 401) {
        return {
          success: false,
          error: "Invalid email or password. Please try again.",
        };
      } else if (error.code === 429) {
        return {
          success: false,
          error: "Too many attempts. Please try again later.",
        };
      }

      return {
        success: false,
        error:
          error.message || "Failed to login. Please check your credentials.",
      };
    }
  };

  const signup = async (email, password, name) => {
    try {
      // Check for existing session first
      try {
        const session = await account.getSession("current");
        if (session) {
          // User is already logged in, log them out first
          await account.deleteSession("current");
        }
      } catch (sessionError) {
        // No active session, proceed with signup
      }

      // Create new account
      await account.create(ID.unique(), email, password, name);

      // Login automatically after signup
      try {
        await account.createEmailPasswordSession(email, password);
        setIsAuthenticated(true);
        const currentUser = await account.get();
        setUser(currentUser);
        return { success: true };
      } catch (loginError) {
        // Account created but couldn't login automatically
        return {
          success: true,
          message: "Account created successfully! Please log in.",
        };
      }
    } catch (error) {
      console.error("Signup failed:", error);

      // Handle specific Appwrite error codes
      if (error.code === 409) {
        return {
          success: false,
          error: "An account with this email already exists.",
        };
      } else if (error.code === 400) {
        return {
          success: false,
          error: "Invalid email or password format.",
        };
      }

      return {
        success: false,
        error: error.message || "Failed to create account. Please try again.",
      };
    }
  };

  const logout = async () => {
    try {
      try {
        const session = await account.getSession("current");
        if (session) {
          await account.deleteSession("current");
        }
      } catch (error) {
        // No session to delete
      }

      // Always clean up local state regardless of session status
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout in the UI even if API call fails
      setIsAuthenticated(false);
      setUser(null);
      return {
        success: false,
        error: error.message || "Logout failed. Please try again.",
      };
    }
  };

  const updateName = async (newName) => {
    try {
      const updatedUser = await account.updateName(newName);
      setUser(updatedUser); // Update the user state in context
      return { success: true };
    } catch (error) {
      console.error("Name update failed:", error);
      return { success: false, error: error.message };
    }
  };

  // Function to check and refresh session
  const checkAndRefreshSession = async () => {
    try {
      if (!isAuthenticated) return { success: false };

      try {
        // Verify current session is valid
        await account.getSession("current");
        return { success: true };
      } catch (error) {
        // Session expired or invalid
        setIsAuthenticated(false);
        setUser(null);
        return {
          success: false,
          error: "Your session has expired. Please log in again.",
        };
      }
    } catch (error) {
      console.error("Session check failed:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        signup,
        logout,
        updateName,
        checkAndRefreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
