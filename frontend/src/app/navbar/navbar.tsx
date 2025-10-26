"use client";
import Link from "next/link";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

interface NavbarProps {
  username?: string | null;
}

export default function Navbar({ username }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to generate URLs with username
  const getUrl = (path: string) => {
    return username ? `${path}?username=${username}` : path;
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center h-[10vh] fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="font-bold">
        <Link href={getUrl("/home")}>
          <Image
            src="/navbar-logo.png"
            alt="Brand Logo"
            className="h-16 md:h-20 w-auto cursor-pointer translate-y-4"
            width={160} // Increased for better quality
            height={80}
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 lg:gap-12 text-lg lg:text-xl justify-between items-center">
        <li>
          <Link
            href={getUrl("/home")}
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={getUrl("/events")}
            className="hover:text-blue-400 transition"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            href={getUrl("/about")}
            className="hover:text-blue-400 transition"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href={getUrl("/contact")}
            className="hover:text-blue-400 transition"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href={getUrl("/favourite")}
            className="hover:text-blue-400 transition"
          >
            Favourites
          </Link>
        </li>
        <li>
          <Link
            href={getUrl("/profile")}
            className="flex items-center space-x-1 hover:text-blue-400 transition"
          >
            <FaUserCircle size={28} className="lg:size-8" />
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-2xl z-60"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Mobile Navigation Menu */}
          <div
            className="flex flex-col items-center justify-center h-full space-y-8 text-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={getUrl("/home")}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={getUrl("/events")}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href={getUrl("/about")}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={getUrl("/contact")}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href={getUrl("/favourite")}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Favourites
            </Link>
            <Link
              href={getUrl("/profile")}
              className="flex items-center space-x-3 hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserCircle size={36} />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
