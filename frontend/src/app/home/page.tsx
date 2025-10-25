"use client";
import { useSearchParams } from "next/navigation";
import Navbar from "../navbar/navbar";
import AnimatedBackground from "@/components/AnimatedBackground"; // adjust path

export default function HomePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div className="relative min-h-screen">
      {/* Background animation */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-24">
        <Navbar username={username} />

        <h1 className="text-white text-7xl font-bold tracking-widest mb-6 pt-20">
          EVENT X
        </h1>

        {username && (
          <p className="text-white mt-2 text-xl">Welcome, {username} !!</p>
        )}

        {/* Call to action */}
        <div className="mt-12">
          <a
            href={username ? `/events/${username}` : "/events"}
            className="text-white text-2xl font-semibold transition"
          >
            View the Events
          </a>
        </div>
      </div>
    </div>
  );
}
