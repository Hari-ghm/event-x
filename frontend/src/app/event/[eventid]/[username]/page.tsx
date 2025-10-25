"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";

interface Event {
  _id: string;
  name: string;
  category: string;
  venue: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  organiser: string;
  fee: string;
  feeType: string;
  maxTeamSize: string;
  website: string;
  totalSeats: string;
  lastDateToApply: string;
  prizePool: string;
  about: string;
  poster: string;
  createdBy: string;
}

export default function EventPage() {
  const params = useParams();
  const eventId = params.eventid as string;
  const username = params.username as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/events/getEvent/${eventId}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400 text-xl">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16 flex flex-col items-center">
      <Navbar username={username} />
      <h1 className="text-5xl font-bold text-purple-400 mb-12 text-center">
        EVENT DETAILS
      </h1>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* LEFT SIDE: Poster */}
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="w-full aspect-[3/4] bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
            {event.poster ? (
              <img
                src={event.poster}
                alt="Event Poster"
                className="object-cover w-full h-full"
              />
            ) : (
              <p className="text-gray-500">No poster available</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Event Details */}
        <div className="md:w-1/2 space-y-6 text-gray-300 text-lg">
          <p>
            🏷️{" "}
            <span className="text-purple-400 font-semibold">Event Name:</span>{" "}
            <span className="ml-2 text-white">{event.name}</span>
          </p>

          <p>
            🎯 <span className="text-purple-400 font-semibold">Category:</span>{" "}
            <span className="ml-2 text-white">{event.category}</span>
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
                <span className="text-white">
                  {new Date(event.startDate).toLocaleDateString()} at{" "}
                  {event.startTime}
                </span>
              </div>
            </div>
            {/* End Date & Time */}
            <div className="mt-4 ml-7">
              <label className="block text-gray-400 text-sm mb-2">
                End Date & Time
              </label>
              <div className="flex items-center gap-4">
                <span className="text-white">
                  {new Date(event.endDate).toLocaleDateString()} at{" "}
                  {event.endTime}
                </span>
              </div>
            </div>
          </div>

          <p>
            📍 <span className="text-purple-400 font-semibold">Venue:</span>{" "}
            <span className="ml-2 text-white">{event.venue}</span>
          </p>

          <p>
            👥{" "}
            <span className="text-purple-400 font-semibold">
              Max Team Size:
            </span>{" "}
            <span className="ml-2 text-white">{event.maxTeamSize}</span>
          </p>

          <p>
            🧑‍💼{" "}
            <span className="text-purple-400 font-semibold">Organisers:</span>{" "}
            <span className="ml-2 text-white">{event.organiser}</span>
          </p>

          <p>
            🔗{" "}
            <span className="text-purple-400 font-semibold">Website Link:</span>{" "}
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-400 hover:underline"
            >
              {event.website}
            </a>
          </p>

          <div>
            💰 <span className="text-purple-400 font-semibold">Fee:</span>
            <div className="mt-2 flex items-center gap-4 ml-7">
              <span className="text-white">₹{event.fee}</span>
              <span className="text-gray-400 text-sm capitalize">
                ({event.feeType})
              </span>
            </div>
          </div>

          <p>
            🎟️{" "}
            <span className="text-purple-400 font-semibold">Total Seats:</span>{" "}
            <span className="ml-2 text-white">{event.totalSeats}</span>
          </p>

          <p>
            📅{" "}
            <span className="text-purple-400 font-semibold">
              Last Date to Apply:
            </span>{" "}
            <span className="ml-2 text-white">
              {new Date(event.lastDateToApply).toLocaleDateString()}
            </span>
          </p>

          <p>
            🏆{" "}
            <span className="text-purple-400 font-semibold">Prize Pool:</span>{" "}
            <span className="ml-2 text-white">{event.prizePool}</span>
          </p>

          <div>
            📖 <span className="text-purple-400 font-semibold">About:</span>
            <div className="block bg-gray-900 border border-gray-700 rounded-lg mt-2 w-full p-3">
              <p className="text-white">{event.about}</p>
            </div>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
