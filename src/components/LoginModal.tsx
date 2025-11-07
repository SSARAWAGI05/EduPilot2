import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useTheme } from "../contexts/ThemeContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { isDark } = useTheme();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        onLoginSuccess();
        onClose();
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        onLoginSuccess();
        onClose();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [onLoginSuccess, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/70 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative border-2 border-white dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        {!session ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
              Login to DE-ECO
            </h2>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: isDark ? '#71717a' : '#1e1e1e',
                      brandAccent: isDark ? '#52525b' : '#495057',
                      brandButtonText: 'white',
                      defaultButtonBackground: isDark ? '#27272a' : '#f8f9fa',
                      defaultButtonBackgroundHover: isDark ? '#3f3f46' : '#e9ecef',
                      defaultButtonBorder: isDark ? '#52525b' : '#e9ecef',
                      defaultButtonText: isDark ? '#f8fafc' : '#1e1e1e',
                      dividerBackground: isDark ? '#52525b' : '#e9ecef',
                      inputBackground: isDark ? '#27272a' : 'white',
                      inputBorder: isDark ? '#52525b' : '#e9ecef',
                      inputBorderHover: isDark ? '#71717a' : '#495057',
                      inputBorderFocus: isDark ? '#a1a1aa' : '#1e1e1e',
                      inputText: isDark ? '#f8fafc' : '#1e1e1e',
                      inputLabelText: isDark ? '#d1d5db' : '#495057',
                      inputPlaceholder: isDark ? '#71717a' : '#6c757d',
                      messageText: isDark ? '#f8fafc' : '#1e1e1e',
                      messageTextDanger: isDark ? '#fca5a5' : '#dc2626',
                      anchorTextColor: isDark ? '#a1a1aa' : '#495057',
                      anchorTextHoverColor: isDark ? '#d1d5db' : '#1e1e1e',
                    },
                  },
                },
                className: {
                  container: isDark ? 'dark-mode-auth' : '',
                  button: 'transition-all duration-200',
                  input: 'transition-all duration-200',
                },
              }}
              providers={["google"]}
              theme={isDark ? "dark" : "default"}
            />
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            You are already logged in ✅
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;