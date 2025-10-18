"use client";

import Link from "next/link";
import Navbar from "./navbar/navbar"; 
import AuthPage from "./signin_page/signin_page";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-black min-h-screen">
      <AuthPage />
    </div>
  );
}
