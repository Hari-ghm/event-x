"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";

export default function CreateEventPage() {
  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const [poster, setPoster] = useState<File | null>(null);
  const [posterURL, setPosterURL] = useState<string | null>(null);

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPoster(file);
      setPosterURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16 flex flex-col items-center">
        <Navbar username={username} />
      <h1 className="text-5xl font-bold text-purple-400 mb-12 text-center">
        CREATE EVENT
      </h1>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* LEFT SIDE: Poster Frame */}
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="w-full aspect-[3/4] bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
            {posterURL ? (
              <img
                src={posterURL}
                alt="Event Poster"
                className="object-cover w-full h-full"
              />
            ) : (
              <p className="text-gray-500">No poster selected yet</p>
            )}
          </div>
          <label
            htmlFor="poster"
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-all duration-300"
          >
            {poster ? "Change Poster" : "Choose Poster"}
          </label>
          <input
            id="poster"
            type="file"
            accept="image/*"
            onChange={handlePosterUpload}
            className="hidden"
          />
        </div>

        {/* RIGHT SIDE: Event Details */}
        <div className="md:w-1/2 space-y-6 text-gray-300 text-lg">
          <p>
            🏷️{" "}
            <span className="text-purple-400 font-semibold">Event Name:</span>{" "}
            <input
              type="text"
              placeholder="Enter event name..."
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <p>
            🎯 <span className="text-purple-400 font-semibold">Category:</span>{" "}
            <input
              type="text"
              placeholder="e.g., Hackathon, Workshop..."
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <div>
            🕓{" "}
            <span className="text-purple-400 font-semibold">
              Event Schedule:
            </span>
            <div className="mt-2 flex flex-wrap items-center gap-4 ml-7">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  className="bg-transparent border border-gray-600 rounded-md p-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  className="bg-transparent border border-gray-600 rounded-md p-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  className="bg-transparent border border-gray-600 rounded-md p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <p>
            📍 <span className="text-purple-400 font-semibold">Venue:</span>{" "}
            <input
              type="text"
              placeholder="Where is it happening?"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <p>
            👥{" "}
            <span className="text-purple-400 font-semibold">
              Max Team Size:
            </span>{" "}
            <input
              type="number"
              placeholder="e.g., 4"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-20"
            />
          </p>

          <p>
            🧑‍💼{" "}
            <span className="text-purple-400 font-semibold">Organisers:</span>{" "}
            <input
              type="text"
              placeholder="Enter names..."
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <p>
            🔗{" "}
            <span className="text-purple-400 font-semibold">Website Link:</span>{" "}
            <input
              type="url"
              placeholder="https://example.com"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <div>
            💰 <span className="text-purple-400 font-semibold">Fee:</span>
            <div className="mt-2 flex items-center gap-4 ml-7">
              <input
                type="number"
                placeholder="Enter fee amount"
                className="bg-transparent border border-gray-600 rounded-md p-2 w-28 focus:outline-none"
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="feeType"
                    value="perHead"
                    className="accent-purple-600"
                  />
                  <span className="text-gray-400 text-sm">Per Head</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="feeType"
                    value="perTeam"
                    className="accent-purple-600"
                  />
                  <span className="text-gray-400 text-sm">Per Team</span>
                </label>
              </div>
            </div>
          </div>

          <p>
            🎟️{" "}
            <span className="text-purple-400 font-semibold">Total Seats:</span>{" "}
            <input
              type="number"
              placeholder="Max participants"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-24"
            />
          </p>

          <p>
            📅{" "}
            <span className="text-purple-400 font-semibold">
              Last Date to Apply:
            </span>{" "}
            <input
              type="date"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2"
            />
          </p>

          <p>
            🏆{" "}
            <span className="text-purple-400 font-semibold">Prize Pool:</span>{" "}
            <input
              type="text"
              placeholder="e.g., ₹50,000 worth prizes"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <div>
            📖 <span className="text-purple-400 font-semibold">About:</span>
            <textarea
              placeholder="Tell participants what makes this event exciting!"
              className="block bg-transparent border border-gray-700 rounded-lg mt-2 w-full p-3 h-32 focus:outline-none"
            ></textarea>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300">
            Publish Event
          </button>
        </div>
      </div>
    </div>
  );
}
