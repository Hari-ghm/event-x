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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 mt-4">
      <Navbar username={username} />
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
          About Event-X
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed">
          <strong>Event-X</strong> is an innovative event management platform
          designed specifically for students. It allows users to create, manage,
          and display events in a centralized online space.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          Students can easily discover events, participate in discussions, and
          connect with peers who share similar interests. Interested students
          can search for team members, form groups, and collaborate on projects
          or competitions.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          The platform addresses the common inconvenience faced by students due
          to the absence of a proper, organized website for event information
          and networking. With <strong>Event-X</strong>, students can stay
          updated on upcoming events, manage RSVPs, share resources, and enhance
          their overall academic and extracurricular experience in a seamless,
          user-friendly environment.
        </p>

        <div className="pt-4">
          <a
            href={`/events/${username}`}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Explore Events
          </a>
        </div>
      </div>
    </div>
  );
}
