"use client";

import Navbar from "@/app/navbar/navbar";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      alert("Username not found!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback/userfeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            message,
          }),
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
        setMessage("");
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-10 mt-12">
      <Navbar username={username} />
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-bold mb-2 text-purple-400">
            Contact Me
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Hi! I’m HariMadhav G, a second-year engineering student from Chennai
            with a strong passion for building creative and efficient digital
            solutions. I’m a Full Stack Developer who enjoys working on both
            frontend and backend technologies, turning ideas into functional and
            user-friendly products. Alongside web development, I’m deeply
            interested in Artificial Intelligence and Machine Learning, and I
            love exploring how AI can be integrated into real-world applications
            to make technology smarter and more impactful.
          </p>

          {/* Social Links */}
          <div className="flex gap-6 mt-4 text-2xl">
            <a
              href="https://instagram.com/hxri_ghm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Hari-ghm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/hari-ghm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://hari-ghm.github.io/my-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaGlobe />
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Send me a message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white resize-none h-40 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
