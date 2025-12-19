import React, { useState } from "react";
import {
  Play,
  TrendingUp,
  Filter,
  Instagram,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../styles/colors";

/* ================= TYPES ================= */

interface Reel {
  id: number;
  title: string;
  topic: string;
  duration: string;
  thumbnail: string;
  reelUrl: string;
}

/* ================= MOCK DATA (Replace with Supabase later) ================= */

const TRENDING_TOPICS = [
  "All",
  "BOJ",
  "FED",
  "Inflation",
  "Crude Oil",
  "USD / INR",
  "Geopolitics",
];

const REELS: Reel[] = [
  {
    id: 1,
    title: "Why BOJ’s Policy Shift Shook Global Markets",
    topic: "BOJ",
    duration: "45s",
    thumbnail:
      "https://images.unsplash.com/photo-1642790804059-bdcfa2a5d0c6?w=600",
    reelUrl: "https://instagram.com/reel/xyz",
  },
  {
    id: 2,
    title: "FED Rate Cuts: What Markets Are Pricing In",
    topic: "FED",
    duration: "30s",
    thumbnail:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600",
    reelUrl: "https://instagram.com/reel/xyz",
  },
  {
    id: 3,
    title: "Crude Oil Rally Explained in 60 Seconds",
    topic: "Crude Oil",
    duration: "60s",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
    reelUrl: "https://instagram.com/reel/xyz",
  },
  {
    id: 4,
    title: "USD/INR Volatility – What’s Driving It?",
    topic: "USD / INR",
    duration: "40s",
    thumbnail:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600",
    reelUrl: "https://instagram.com/reel/xyz",
  },
  {
    id: 5,
    title: "Inflation Cooling? What Data Says",
    topic: "Inflation",
    duration: "35s",
    thumbnail:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600",
    reelUrl: "https://instagram.com/reel/xyz",
  },
];

/* ================= COMPONENT ================= */

export const MarketPulsePage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const [activeTopic, setActiveTopic] = useState("All");

  const filteredReels =
    activeTopic === "All"
      ? REELS
      : REELS.filter((reel) => reel.topic === activeTopic);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: themeColors.primary.lightGray }}
    >
      {/* Spacer for fixed navbar */}
      <div className="h-20 sm:h-24" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* ================= HERO ================= */}
        <div
          className="rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl mb-8"
          style={{ backgroundColor: themeColors.background.white }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3"
                style={{ color: themeColors.text.primary }}
              >
                MarketPulse
              </h1>
              <p
                className="text-base sm:text-lg max-w-2xl"
                style={{ color: themeColors.text.secondary }}
              >
                Daily short-form insights on global markets, macroeconomics,
                central banks, and geopolitics — explained simply.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Instagram
                className="w-6 h-6"
                style={{ color: themeColors.accent.pink }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: themeColors.text.secondary }}
              >
                Powered by Instagram Reels
              </span>
            </div>
          </div>
        </div>

        {/* ================= TRENDING TOPICS ================= */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp
              className="w-5 h-5"
              style={{ color: themeColors.accent.orange }}
            />
            <h2
              className="text-xl sm:text-2xl font-bold"
              style={{ color: themeColors.text.primary }}
            >
              Trending Topics
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTopic === topic
                    ? "shadow-md scale-105"
                    : "opacity-80 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    activeTopic === topic
                      ? themeColors.accent.yellow
                      : themeColors.background.white,
                  color: themeColors.text.primary,
                  border: `2px solid ${themeColors.primary.black}`,
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* ================= REELS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              className="rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: themeColors.background.white }}
              onClick={() => window.open(reel.reelUrl, "_blank")}
            >
              {/* Thumbnail */}
              <div className="relative h-64 sm:h-72">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-black" fill="black" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold bg-black/70 text-white">
                  {reel.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <span
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: themeColors.accent.blue }}
                >
                  {reel.topic}
                </span>

                <h3
                  className="mt-2 font-bold text-base leading-snug line-clamp-2"
                  style={{ color: themeColors.text.primary }}
                >
                  {reel.title}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <span
                    className="text-xs"
                    style={{ color: themeColors.text.secondary }}
                  >
                    Watch on Instagram
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {filteredReels.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-10 h-10 mx-auto mb-4 opacity-40" />
            <p style={{ color: themeColors.text.secondary }}>
              No reels available for this topic yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPulsePage;
