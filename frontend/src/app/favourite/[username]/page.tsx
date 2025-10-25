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
  fee: string;
  poster: string;
  createdBy: string;
}

export default function Favorites() {
  const router = useRouter();
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
          fetch("http://localhost:5000/api/events/getEvents"),
          fetch(`http://localhost:5000/api/users/getInterested/${username}`),
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">
      <Navbar username={username} />
      <h1 className="text-5xl font-bold text-purple-400 mb-8 pt-10">
        MY FAVORITES
      </h1>

      {/* Favorites Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mb-10">
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
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            You have no favorite events yet.
          </p>
        )}
      </div>
    </div>
  );
}
