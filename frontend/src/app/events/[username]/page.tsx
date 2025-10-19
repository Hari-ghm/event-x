"use client";
import React, { use } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";

export default function Events() {
  const router = useRouter();
  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const handleCreateEvent = () => {
    router.push(`/create-event/${username}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">
      <Navbar username={username} />
      <h1 className="text-4xl font-bold text-purple-400 mb-8">
        Upcoming Events
      </h1>

      {/* Dummy Events Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mb-10">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-2">TechFest Hackathon</h2>
          <p className="text-gray-400 mb-1">Venue: Main Hall</p>
          <p className="text-gray-400 mb-4">Date: Nov 20, 2025</p>
          <button className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded-lg font-medium">
            View Details
          </button>
        </div>
      </div>

      {/* Create Event Button */}
      <button
        onClick={handleCreateEvent}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
      >
        + Create Event
      </button>
    </div>
  );
}
