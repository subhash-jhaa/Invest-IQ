import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthGuard({ children }) {
  const { isAuthenticated, loading, checkAndRefreshSession } = useAuth();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [sessionValid, setSessionValid] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifySession = async () => {
      if (!loading && isAuthenticated) {
        const result = await checkAndRefreshSession();
        setSessionValid(result.success);
      }
      setSessionChecked(true);
    };

    verifySession();
  }, [loading, isAuthenticated, checkAndRefreshSession]);

  if (loading || !sessionChecked) {
    // Show loading state while checking session
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !sessionValid) {
    // Redirect to login if not authenticated or session is invalid
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated and session is valid
  return children;
}
