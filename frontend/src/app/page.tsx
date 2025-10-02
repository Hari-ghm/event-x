"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show splash for 2.5 seconds
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        {/* Splash animation */}
        <h1 className="text-5xl font-extrabold text-red-600 animate-pulse">
          HACKATHON HUB
        </h1>
      </div>
    );
  }

  // Main website
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome 🏠</h1>
      <p className="text-lg">This is your home page content!</p>
    </div>
  );
}
