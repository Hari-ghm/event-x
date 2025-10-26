"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";
import EventCard from "@/components/EventCard";

interface Event {
  _id: string;
  name: string;
  venue: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  fee: string;
  poster: string;
  createdBy: string;
  organiser: string
}

export default function Favorites() {
  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const [events, setEvents] = useState<Event[]>([]);
  const [interestedEvents, setInterestedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, interestedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/getEvents`),
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getInterested/${username}`
          ),
        ]);

        const eventsData = await eventsRes.json();
        const interestedData = await interestedRes.json();

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

  // Check if event is over
  const isEventOver = (event: Event) => {
    const now = new Date();
    const endDateTime = new Date(`${event.endDate}T${event.endTime}`);
    return now > endDateTime;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading favorites...
      </div>
    );
  }

  // Filter only liked events
  const favoriteEvents = events.filter((event) =>
    interestedEvents.includes(event._id)
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 sm:px-6 py-16">
      <Navbar username={username} />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 mb-6 sm:mb-8 pt-8 sm:pt-10">
        MY FAVORITES
      </h1>

      {/* Favorites Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mb-8 sm:mb-10 px-2 sm:px-0">
        {favoriteEvents.length > 0 ? (
          favoriteEvents.map((event) => (
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
              liked={true} // always liked
              isOver={isEventOver(event)} 
              organisor={event.organiser}// pass boolean value
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full text-sm sm:text-base">
            You have no favorite events yet.
          </p>
        )}
      </div>
    </div>
  );
}
