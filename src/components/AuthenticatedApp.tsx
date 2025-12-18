import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Navigation } from "./Navigation";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { LiveClassesPage } from "./pages/LiveClassesPage";
import { AIHubPage } from "./pages/AIHubPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import ProfileCompletionModal from "./ProfileCompletionModal";

interface AuthenticatedAppProps {
  onLogout: () => void;
}

export const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      if (!data?.first_name || !data?.last_name || !data?.phone) {
        setProfileIncomplete(true);
      }
    };

    checkProfile();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "courses": 
        return <CoursesPage />;
      case "live-classes":
        return <LiveClassesPage />;
      case "ai-hub":
        return <AIHubPage />;
      case "contact":
        return <ContactPage />;
      case "about":
        return <AboutUsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {profileIncomplete && userId ? (
        <ProfileCompletionModal
          userId={userId}
          onComplete={() => setProfileIncomplete(false)}
        />
      ) : (
        <>
          <Navigation
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onLogout={onLogout}
          />
          {renderPage()}
        </>
      )}
    </div>
  );
};