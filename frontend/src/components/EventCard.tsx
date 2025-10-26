"use client";
import React, { JSX, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface EventCardProps {
  name: string;
  venue: string;
  fee: string;
  startDate: string;
  poster: string;
  id: string;
  createdBy: string;
  username: string;
  liked: boolean;
  isOver: boolean;
  organisor: string
}

export default function EventCard({
  name,
  venue,
  fee,
  startDate,
  poster,
  id,
  createdBy,
  username,
  liked,
  isOver,
  organisor
}: EventCardProps): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLiked, setIsLiked] = useState(liked); // initialize from prop

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  async function handleLikeClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const endpoint = isLiked
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/removeInterested`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/addInterested`;

    // Optimistically update UI first
    setIsLiked((prev) => !prev);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          eventId: id,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update interested list");
      }

      console.log(
        isLiked
          ? "Event removed from interested list"
          : "Event added to interested list"
      );
    } catch (err) {
      console.error("Error updating interested event:", err);
      // revert if failed
      setIsLiked((prev) => !prev);
    }
  }

  function viewEventDetails(event: React.MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();
    event.preventDefault();
    const url = `/event/${id}/${createdBy}`;
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex bg-gray-900 p-3 rounded-2xl border border-gray-800 cursor-pointer w-full max-w-md mx-auto"
      style={{ perspective: 1000 }}
      animate={{
        rotateY: hovered ? (mousePos.x - 150) / 15 : 0,
        rotateX: hovered ? -(mousePos.y - 75) / 15 : 0,
        scale: hovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {hovered && (
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(128,90,230,0.6)] pointer-events-none"></div>
      )}

      {/* Event Expired Badge */}
      {isOver && (
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded z-10">
          Event Expired
        </div>
      )}

      {/* Like button (top right) */}
      <button
        onClick={handleLikeClick}
        className="absolute top-2 right-2 text-2xl z-10"
      >
        <motion.span
          animate={{ scale: isLiked ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          style={{
            color: isLiked ? "red" : "white",
            transition: "color 0.3s",
          }}
        >
          ♥
        </motion.span>
      </button>

      {/* Poster */}
      <Image
        src={poster}
        alt={name}
        className="w-28 h-40 object-cover rounded-lg flex-shrink-0"
      />

      {/* Event details */}
      <div className="ml-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">{name}</h2>
          <p className="text-gray-400 text-sm mb-1">{organisor}</p>
          <p className="text-gray-400 text-sm mb-1">{venue}</p>
          <p className="text-gray-400 text-sm mb-1">Fee: ₹{fee}</p>
          <p className="text-gray-400 text-sm">
            {new Date(startDate).toDateString()}
          </p>
        </div>
        <button
          onClick={viewEventDetails}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 px-3 rounded-lg mt-2 self-start"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}
