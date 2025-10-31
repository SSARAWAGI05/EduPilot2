import React, { useState, useEffect } from "react";
import { AboutSlides } from "./components/AboutSlides";
import { AuthenticatedApp } from "./components/AuthenticatedApp";
import LoginModal from "./components/LoginModal";
import { supabase } from "./supabaseClient";

function App() {
  const [session, setSession] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);

  // Load session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (session) {
    return <AuthenticatedApp onLogout={handleLogout} />;
  }

  return (
    <>
      <AboutSlides onLogin={() => setShowLogin(true)} />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => setSession(true)}
      />
    </>
  );
}

export default App;
