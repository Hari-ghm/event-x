"use client";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";

export default function About() {

  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      <Navbar username={username} />
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
          About Event Hub
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed">
          <strong>Event Hub</strong> is a full-stack Event Management System
          designed to make organizing, discovering, and joining events
          effortless. It provides a centralized platform for users to browse
          upcoming events, register for them, and stay updated—all in real-time.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          Built with a <span className="text-purple-400">Go (Gin)</span> backend
          and <span className="text-purple-400">MongoDB</span> for efficient
          data handling, the system supports full CRUD operations for events,
          RSVP management, and user authentication. Admins can create and manage
          events, while users can explore and register for their favorites.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          Whether you're a student club planning your next hackathon, or an
          organization hosting a workshop, Event Hub helps you handle everything
          from registrations to participant tracking—all with a modern and
          responsive interface powered by{" "}
          <span className="text-purple-400">Next.js</span>.
        </p>

        <div className="pt-4">
          <a
            href="/events/${username}"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Explore Events
          </a>
        </div>
      </div>
    </div>
  );
}
