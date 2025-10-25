"use client";
import { useSearchParams } from "next/navigation";
import Navbar from "../navbar/navbar";
import AnimatedBackground from "@/components/AnimatedBackground"; // adjust path

export default function HomePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div className="relative min-h-screen pt-20 md:pt-0">
      {/* Background animation */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-16 md:pt-20 lg:pt-24 px-4">
        <Navbar username={username} />

        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-bold tracking-widest mb-4 md:mb-6 pt-12 md:pt-16 lg:pt-20 text-center">
          EVENT-X
        </h1>

        {username && (
          <p className="text-white mt-2 text-lg md:text-xl text-center">
            Welcome, {username} !!
          </p>
        )}

        {/* Call to action */}
        <div className="mt-8 md:mt-10 lg:mt-12">
          <a
            href={username ? `/events/${username}` : "/events"}
            className="text-white text-xl md:text-2xl font-semibold transition hover:text-gray-200"
          >
            View the Events
          </a>
        </div>
      </div>
    </div>
  );
}
