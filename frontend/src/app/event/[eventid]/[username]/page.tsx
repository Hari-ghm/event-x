"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/navbar";
import Image from "next/image";

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
  discussions: Discussion[];
}

interface Discussion {
  _id: string;
  username: string;
  message: string;
  date: string;
  about?: string;
  isTeamSearch: boolean;
}

interface UserData {
  username: string;
  phone: string;
  email: string;
  about: string;
  sharePhone: boolean;
  shareEmail: boolean;
}

export default function EventPage() {
  const params = useParams();
  const eventId = params.eventid as string;
  const username = params.username as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [isTeamSearch, setIsTeamSearch] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching user info:", err));
  }, [username]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/getEvent/${eventId}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEventDetails();
  }, [eventId]);

  const handlePostDiscussion = async () => {
    if (!newDiscussion.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/addDiscussion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            username,
            message: newDiscussion,
            isTeamSearch,
            about: isTeamSearch ? userData?.about : "",
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to post discussion");

      const updatedEvent = await res.json();
      setEvent(updatedEvent);
      setNewDiscussion("");
      setIsTeamSearch(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDiscussion = async (discussionId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/deleteDiscussion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, discussionId, username }),
        }
      );

      if (!res.ok) throw new Error("Failed to delete discussion");

      const updatedEvent = await res.json();
      setEvent(updatedEvent);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to get user contact info for display
  const getUserContactInfo = (
    discussionUsername: string,
    discussionAbout?: string
  ) => {
    // For now, we only show contact info for the current user in their own team search posts
    // You might want to fetch other users' data if needed
    if (discussionUsername === username && userData) {
      return {
        about: discussionAbout || userData.about,
        email: userData.shareEmail ? userData.email : null,
        phone: userData.sharePhone ? userData.phone : null,
      };
    }
    return {
      about: discussionAbout,
      email: null,
      phone: null,
    };
  };

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

      <h1 className=" text-3xl md:text-5xl font-bold text-purple-400 mb-12 text-center py-6">
        EVENT DETAILS
      </h1>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* LEFT SIDE: Poster */}
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-900 rounded-2xl p-6 border border-gray-800 relative -mt-8">
          <div className="w-full aspect-[3/4] bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
            {event.poster ? (
              <Image
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
            <div className="mt-3 ml-7">
              <label className="block text-gray-400 text-sm mb-2">
                Start Date & Time
              </label>
              <span className="text-white">
                {new Date(event.startDate).toLocaleDateString()} at{" "}
                {event.startTime}
              </span>
            </div>
            <div className="mt-4 ml-7">
              <label className="block text-gray-400 text-sm mb-2">
                End Date & Time
              </label>
              <span className="text-white">
                {new Date(event.endDate).toLocaleDateString()} at{" "}
                {event.endTime}
              </span>
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
        </div>
      </div>

      {/* ✅ DISCUSSION SECTION STARTS HERE */}
      <div className="w-full max-w-4xl mt-16 mb-10">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">
          Start a Discussion
        </h2>

        <textarea
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
          placeholder="Ask something about the event or find teammates..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500"
          rows={3}
        />

        <div className="flex items-center gap-3 mt-3">
          <label className="text-gray-300 text-sm">
            Looking for teammates?
          </label>
          <button
            onClick={() => setIsTeamSearch((prev) => !prev)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              isTeamSearch
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {isTeamSearch ? "Yes" : "No"}
          </button>
        </div>

        {isTeamSearch && (
          <div className="mt-3 bg-gray-800 p-3 rounded-lg text-gray-300 text-sm border border-gray-700">
            <span className="text-purple-400 font-semibold">Your About:</span>{" "}
            {userData?.about || "No about info provided."}
          </div>
        )}

        <button
          onClick={handlePostDiscussion}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
        >
          Post Discussion
        </button>

        {/* 💬 Display Discussions */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">
            Discussions
          </h2>

          {event.discussions && event.discussions.length > 0 ? (
            event.discussions
              .slice()
              .reverse()
              .map((d) => {
                const contactInfo = getUserContactInfo(d.username, d.about);
                return (
                  <div
                    key={d._id}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-purple-300">
                        {d.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(d.date).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-gray-300">{d.message}</p>

                    {d.isTeamSearch && (
                      <div className="mt-3 space-y-2">
                        {contactInfo.about && (
                          <p className="text-sm text-gray-400">
                            <span className="text-purple-400 font-semibold">
                              About:
                            </span>{" "}
                            {contactInfo.about}
                          </p>
                        )}
                        {contactInfo.email && (
                          <p className="text-sm text-gray-400">
                            <span className="text-purple-400 font-semibold">
                              Email:
                            </span>{" "}
                            {contactInfo.email}
                          </p>
                        )}
                        {contactInfo.phone && (
                          <p className="text-sm text-gray-400">
                            <span className="text-purple-400 font-semibold">
                              Phone:
                            </span>{" "}
                            {contactInfo.phone}
                          </p>
                        )}
                      </div>
                    )}

                    {d.username === username && (
                      <button
                        onClick={() => handleDeleteDiscussion(d._id)}
                        className="mt-2 text-red-500 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                );
              })
          ) : (
            <p className="text-gray-500">No discussions yet.</p>
          )}
        </div>
      </div>
      {/* ✅ DISCUSSION SECTION ENDS */}
    </div>
  );
}
