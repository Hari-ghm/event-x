"use client";
import { useSearchParams } from "next/navigation";
import Navbar from "../navbar/navbar";

export default function HomePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  
  return (
    <div>
      <Navbar username={username} />

      <div className="min-h-screen bg-black flex flex-col items-center justify-start pt-24">
        <h1 className="text-white text-6xl font-bold tracking-widest">
          EVENT X
        </h1>

        {username && (
          <p className="text-white mt-6 text-xl">Welcome, {username} 👋</p>
        )}
      </div>
    </div>
  );
}
