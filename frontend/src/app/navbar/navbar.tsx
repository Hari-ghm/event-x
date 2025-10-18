"use client";

import { FaUserCircle } from "react-icons/fa";

interface NavbarProps {
  username?: string | null;
}

export default function Navbar({ username }: NavbarProps) {
 
  return (
    <nav className="text-2xl bg-black text-white p-4 flex h-[10vh] fixed top-0 left-0 w-full z-50">
      <div className="font-bold w-3/5 ">
        <img src="/navbar-logo.png" alt="Brand Logo" className="h-20 w-auto" />
      </div>
      <ul className="flex gap-12 text-xl justify-between pl-24 pt-4">
        <li>
          <a href="/">Events</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/favourites">Favourites</a>
        </li>
        <li>
          <a
            href={username ? `/profile/${username}` : "/profile"}
            className="flex items-center space-x-1 hover:text-blue-400"
          >
            <FaUserCircle size={32} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
