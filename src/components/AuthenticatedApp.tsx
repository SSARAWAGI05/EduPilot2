import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { LiveClassesPage } from './pages/LiveClassesPage';
import { AIHubPage } from './pages/AIHubPage';
import { ContactPage } from './pages/ContactPage';
import { AboutUsPage } from './pages/AboutUsPage';

interface AuthenticatedAppProps {
  onLogout: () => void;
}

export const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'courses':
        return <CoursesPage />;
      case 'live-classes':
        return <LiveClassesPage />;
      case 'ai-hub':
        return <AIHubPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutUsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onLogout={onLogout}
      />
      {renderPage()}
    </div>
  );
};