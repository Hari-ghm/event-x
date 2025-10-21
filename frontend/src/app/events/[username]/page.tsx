"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";
import EventCard from "@/components/EventCard"; // make sure the path is correct

interface Event {
  _id: string;
  name: string;
  venue: string;
  startDate: string;
  fee: string;
  poster: string;
  createdBy: string; // add this if your backend sends it
}

export default function Events() {
  const router = useRouter();
  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events/getEvents");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    router.push(`/create-event/${username}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">
      <Navbar username={username} />
      <h1 className="text-4xl font-bold text-purple-400 mb-8">
        Upcoming Events
      </h1>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mb-10">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              name={event.name}
              venue={event.venue}
              fee={event.fee}
              startDate={event.startDate}
              poster={event.poster}
              createdBy={event.createdBy} // ensure your backend provides this
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No events found.
          </p>
        )}
      </div>

      {/* Create Event Button */}
      <button
        onClick={handleCreateEvent}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
      >
        + Create Event
      </button>
    </div>
  );
}
