"use client";

export default function Navbar() {
  return (
    <nav className="w-full text-2xl bg-black text-white p-4 flex h-[10vh]">
      <div className="font-bold w-3/5 ">
        <img src="/navbar-logo.png" alt="Brand Logo" className="h-10 w-auto" />
      </div>
      <ul className="flex gap-24 text-2xl justify-between pl-24 pt-4">
        <li>
          <a href="/">Events</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/events">My Profile</a>
        </li>
      </ul>
    </nav>
  );
}
