import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {!session ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Login to DE-ECO</h2>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
            />
          </>
        ) : (
          <p className="text-center text-gray-600">You are already logged in ✅</p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
