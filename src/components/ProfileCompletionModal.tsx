import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

interface ProfileCompletionModalProps {
  userId: string;
  onComplete: () => void;
}

const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({ userId, onComplete }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prefill if data exists
    supabase
      .from("profiles")
      .select("first_name, last_name, phone")
      .eq("id", userId)
      .single()
      .then(({ data }) => {
        if (data) {
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
          setPhone(data.phone || "");
        }
      });
  }, [userId]);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      phone,
      updated_at: new Date().toISOString(),
    });

    setLoading(false);

    if (!error) {
      onComplete();
    } else {
      console.error("Error saving profile:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">
        <h2 className="text-2xl font-bold text-center mb-4">Complete Your Profile</h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded-md p-2 mb-3"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded-md p-2 mb-3"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-md p-2 mb-3"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;