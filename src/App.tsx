import React, { useState, useEffect } from 'react';
import { AboutSlides } from './components/AboutSlides';
import { AuthenticatedApp } from './components/AuthenticatedApp';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved auth state on load
  useEffect(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    if (savedAuthState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save auth state to localStorage
  const handleAuthChange = (authState: boolean) => {
    setIsAuthenticated(authState);
    localStorage.setItem('isAuthenticated', String(authState));
  };

  if (isAuthenticated) {
    return <AuthenticatedApp onLogout={() => handleAuthChange(false)} />;
  }

  return <AboutSlides onLogin={() => handleAuthChange(true)} />;
}

export default App;