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

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center h-[10vh] fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="font-bold ">
        <Link href={username ? `/home?username=${username}` : "/home"}>
          <Image
            src="/navbar-logo.png"
            alt="Brand Logo"
            className="h-16 md:h-20 w-auto cursor-pointer translate-y-4"
            width={40} // Add appropriate width
            height={40}
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 lg:gap-12 text-lg lg:text-xl justify-between items-center">
        <li>
          <a
            href={username ? `/home?username=${username}` : "/home"}
            className="hover:text-blue-400 transition"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href={username ? `/events/${username}` : "/events"}
            className="hover:text-blue-400 transition"
          >
            Events
          </a>
        </li>
        <li>
          <a
            href={username ? `/about/${username}` : "/about"}
            className="hover:text-blue-400 transition"
          >
            About
          </a>
        </li>
        <li>
          <a
            href={username ? `/contact/${username}` : "/contact"}
            className="hover:text-blue-400 transition"
          >
            Contact
          </a>
        </li>
        <li>
          <a
            href={username ? `/favourite/${username}` : "/favourite"}
            className="hover:text-blue-400 transition"
          >
            Favourites
          </a>
        </li>
        <li>
          <a
            href={username ? `/profile/${username}` : "/profile"}
            className="flex items-center space-x-1 hover:text-blue-400 transition md:size-10"
          >
            <FaUserCircle size={28} className="lg:size-32 " />
          </a>
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-2xl z-60"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <a
              href={username ? `/home?username=${username}` : "/home"}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href={username ? `/events/${username}` : "/events"}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </a>
            <a
              href={username ? `/about/${username}` : "/about"}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href={username ? `/contact/${username}` : "/contact"}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href={username ? `/favourite/${username}` : "/favourite"}
              className="hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Favourites
            </a>
            <a
              href={username ? `/profile/${username}` : "/profile"}
              className="flex items-center space-x-3 hover:text-blue-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserCircle size={36} />
              <span>Profile</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
