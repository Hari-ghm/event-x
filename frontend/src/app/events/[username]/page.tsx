"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";
import EventCard from "@/components/EventCard";

interface Event {
  _id: string;
  name: string;
  category: string;
  venue: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  fee: string;
  poster: string;
  createdBy: string;
  isover: boolean;
}

export default function Events() {
  const router = useRouter();
  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const [events, setEvents] = useState<Event[]>([]);
  const [interestedEvents, setInterestedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, interestedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/getEvents`),
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getInterested/${username}`
          ),
        ]);

        const eventsData: Event[] = await eventsRes.json();
        const interestedData = await interestedRes.json();

        // Sort events by startDate & startTime
        eventsData.sort((a, b) => {
          const dateA = new Date(`${a.startDate}T${a.startTime}`);
          const dateB = new Date(`${b.startDate}T${b.startTime}`);
          return dateA.getTime() - dateB.getTime();
        });

        setEvents(eventsData);
        setInterestedEvents(interestedData.interested || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchData();
  }, [username]);

  const handleCreateEvent = () => {
    router.push(`/create-event/${username}`);
  };

  // Filter events by search term
  const filteredEvents = events.filter((event) =>
    [event.name, event.venue, event.category].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const isEventOver = (event: Event) => {
    const now = new Date();
    const endDateTime = new Date(`${event.endDate}T${event.endTime}`);
    return now > endDateTime;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 sm:px-6 py-16">
      <Navbar username={username ?? ""} />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 mb-6 sm:mb-8 pt-8 sm:pt-10">
        EVENTS
      </h1>

      {/* Search Input */}
      <div className="mb-6 w-full max-w-6xl px-2 sm:px-0">
        <input
          type="text"
          placeholder="Search events by name, venue or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 sm:py-2 rounded-lg focus:outline-none focus:border-purple-500 text-sm sm:text-base"
        />
      </div>

      {/* Events Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mb-8 sm:mb-10 px-2 sm:px-0">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const liked = interestedEvents.includes(event._id);
            const over = isEventOver(event);
            return (
              <EventCard
                key={event._id}
                id={event._id}
                name={event.name}
                venue={event.venue}
                fee={event.fee}
                startDate={event.startDate}
                poster={event.poster}
                createdBy={event.createdBy}
                username={username || ""}
                liked={liked}
                isOver={over}
              />
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-full text-sm sm:text-base">
            No events found.
          </p>
        )}
      </div>

      {/* Create Event Button */}
      <button
        onClick={handleCreateEvent}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 text-sm sm:text-base"
      >
        + Create Event
      </button>
    </div>
  );
}
