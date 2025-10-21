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

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [organisor, setOrganisor] = useState("");
  const [fee, setFee] = useState<number | "">("");
  const [feeType, setFeeType] = useState("perHead");
  const [maxTeamSize, setMaxTeamSize] = useState<number | "">("");
  const [website, setWebsite] = useState("");
  const [totalSeats, setTotalSeats] = useState<number | "">("");
  const [lastDate, setLastDate] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [about, setAbout] = useState("");

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPoster(file);
      setPosterURL(URL.createObjectURL(file)); // Just preview locally, don't upload yet
    }
  };

  const handleSubmit = async () => {
    try {
      let uploadedImageUrl = "";

      // Step 1: Upload poster if selected
      if (poster) {
        const formData = new FormData();
        formData.append("poster", poster);

        const uploadRes = await fetch("http://localhost:5000/uploadPoster", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.imageUrl) uploadedImageUrl = uploadData.imageUrl;
      }

      // Step 2: Send event details with uploaded image URL
      const eventData = {
        name,
        category,
        venue,
        startDate,
        startTime,
        endDate,
        endTime,
        organisor,
        fee,
        feeType,
        maxTeamSize,
        website,
        totalSeats,
        lastDate,
        prizePool,
        about,
        poster: uploadedImageUrl || null,
        username,
      };
      console.log(username)

      const res = await fetch("http://localhost:5000/api/events/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        alert("✅ Event created successfully!");
        // optional: clear inputs
      } else {
        alert("❌ Failed to create event");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Something went wrong");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter event name..."
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <p>
            🎯 <span className="text-purple-400 font-semibold">Category:</span>{" "}
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Hackathon, Workshop..."
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <div>
            🕓{" "}
            <span className="text-purple-400 font-semibold">
              Event Schedule:
            </span>
            {/* Start Date & Time */}
            <div className="mt-3 ml-7">
              <label className="block text-gray-400 text-sm mb-2">
                Start Date & Time
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent border border-gray-600 rounded-md p-2 focus:outline-none"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-transparent border border-gray-600 rounded-md p-2 focus:outline-none"
                />
              </div>
            </div>
            {/* End Date & Time */}
            <div className="mt-4 ml-7">
              <label className="block text-gray-400 text-sm mb-2">
                End Date & Time
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent border border-gray-600 rounded-md p-2 focus:outline-none"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-transparent border border-gray-600 rounded-md p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <p>
            📍 <span className="text-purple-400 font-semibold">Venue:</span>{" "}
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
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
              value={maxTeamSize}
              onChange={(e) =>
                setMaxTeamSize(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="e.g., 4"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-20"
            />
          </p>

          <p>
            🧑‍💼{" "}
            <span className="text-purple-400 font-semibold">Organisers:</span>{" "}
            <input
              type="text"
              value={organisor}
              onChange={(e) => setOrganisor(e.target.value)}
              placeholder="Enter names..."
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <p>
            🔗{" "}
            <span className="text-purple-400 font-semibold">Website Link:</span>{" "}
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <div>
            💰 <span className="text-purple-400 font-semibold">Fee:</span>
            <div className="mt-2 flex items-center gap-4 ml-7">
              <input
                type="number"
                value={fee}
                onChange={(e) =>
                  setFee(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Enter fee amount"
                className="bg-transparent border border-gray-600 rounded-md p-2 w-28 focus:outline-none"
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="feeType"
                    value="perHead"
                    checked={feeType === "perHead"}
                    onChange={() => setFeeType("perHead")}
                    className="accent-purple-600"
                  />
                  <span className="text-gray-400 text-sm">Per Head</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="feeType"
                    value="perTeam"
                    checked={feeType === "perTeam"}
                    onChange={() => setFeeType("perTeam")}
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
              value={totalSeats}
              onChange={(e) =>
                setTotalSeats(e.target.value ? Number(e.target.value) : "")
              }
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
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2"
            />
          </p>

          <p>
            🏆{" "}
            <span className="text-purple-400 font-semibold">Prize Pool:</span>{" "}
            <input
              type="text"
              value={prizePool}
              onChange={(e) => setPrizePool(e.target.value)}
              placeholder="e.g., ₹50,000 worth prizes"
              className="bg-transparent border-b border-gray-600 focus:outline-none ml-2 w-2/3"
            />
          </p>

          <div>
            📖 <span className="text-purple-400 font-semibold">About:</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell participants what makes this event exciting!"
              className="block bg-transparent border border-gray-700 rounded-lg mt-2 w-full p-3 h-32 focus:outline-none"
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Publish Event
          </button>
        </div>
      </div>
    </div>
  );
}
