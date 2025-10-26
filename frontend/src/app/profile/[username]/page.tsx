"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../navbar/navbar";
import EventCard from "@/components/EventCard";

interface UserData {
  username: string;
  phone: string;
  email: string;
  about: string;
  password: string;
  sharePhone: boolean;
  shareEmail: boolean;
}

interface Event {
  _id: string;
  name: string;
  venue: string;
  fee: string;
  startDate: string;
  poster: string;
  createdBy: string;
  endDate: string;
  endTime: string;
  organiser: string;
}

export default function ProfilePage() {
  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`
        );
        if (!userRes.ok)
          throw new Error(`Failed to fetch user data: ${userRes.status}`);

        const userData = await userRes.json();
        setUserData(userData);

        const eventsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/getEventsByUser/${username}`
        );
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setUserEvents(eventsData);
        } else {
          const allEventsRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/getEvents`
          );
          if (allEventsRes.ok) {
            const allEvents = await allEventsRes.json();
            const userEvents = allEvents.filter(
              (event: Event) => event.createdBy === username
            );
            setUserEvents(userEvents);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleSaveChanges = async () => {
    if (!userData || !username) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!res.ok) throw new Error("Failed to update user");
      const updated = await res.json();
      setUserData(updated);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update profile. Try again!");
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/deleteEvent/${eventId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete event");

      setUserEvents((prev) => prev.filter((event) => event._id !== eventId));
      alert("Event deleted successfully!");
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event. Try again!");
    }
  };

  const setField = <K extends keyof UserData>(field: K, value: UserData[K]) => {
    if (!userData) return;
    setUserData({ ...userData, [field]: value });
  };

  const isEventOver = (event: Event) => {
    const now = new Date();
    const endDateTime = new Date(`${event.endDate}T${event.endTime}`);
    return now > endDateTime;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          Error loading profile: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-4 sm:px-6 md:px-8">
      <Navbar username={username} />

      <h1 className="text-4xl md:text-5xl font-bold mb-10 pt-6 text-center">
        MY PROFILE
      </h1>

      <div className="w-full max-w-4xl">
        {/* Profile Details */}
        <div className="p-6 sm:p-8 rounded-xl shadow-lg flex flex-col gap-6 mb-12">
          {/* Username */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="text-purple-300 font-semibold">Username</span>
            <span className="px-4 py-2 rounded text-purple-400 bg-gray-900 text-center sm:text-right">
              {username}
            </span>
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-purple-300 font-semibold">Phone</span>
              <input
                type="text"
                value={userData?.phone || ""}
                onChange={(e) => setField("phone", e.target.value)}
                className="bg-gray-800 px-4 py-2 rounded text-purple-400 border border-purple-600 sm:w-1/2 text-center sm:text-right"
              />
            </div>
            <div className="flex items-start sm:items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={userData?.sharePhone || false}
                onChange={(e) => setField("sharePhone", e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-800 border-purple-600 rounded focus:ring-purple-500 focus:ring-2 mt-1 sm:mt-0"
              />
              <label className="leading-snug">
                I consent to share my phone number in public discussion forums
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-purple-300 font-semibold">Email</span>
              <input
                type="email"
                value={userData?.email || ""}
                onChange={(e) => setField("email", e.target.value)}
                className="bg-gray-800 px-4 py-2 rounded text-purple-400 border border-purple-600 sm:w-1/2 text-center sm:text-right"
              />
            </div>
            <div className="flex items-start sm:items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={userData?.shareEmail || false}
                onChange={(e) => setField("shareEmail", e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-800 border-purple-600 rounded focus:ring-purple-500 focus:ring-2 mt-1 sm:mt-0"
              />
              <label className="leading-snug">
                I consent to share my email in public discussion forums
              </label>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="text-purple-300 font-semibold">Password</span>
            <input
              type="text"
              value={userData?.password || ""}
              onChange={(e) => setField("password", e.target.value)}
              className="bg-gray-800 px-4 py-2 rounded text-purple-400 border border-purple-600 sm:w-1/2 text-center sm:text-right"
            />
          </div>

          {/* About */}
          <div className="flex flex-col mt-4">
            <span className="text-purple-300 font-semibold mb-2">About</span>
            <textarea
              value={userData?.about || ""}
              onChange={(e) => setField("about", e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded bg-gray-800 text-purple-400 border border-purple-600"
            />
          </div>

          <button
            onClick={handleSaveChanges}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded mt-4 self-center sm:self-end"
          >
            Save Changes
          </button>
        </div>

        {/* My Events Section */}
        <div className="p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-400 mb-8 text-center">
            MY EVENTS
          </h2>

          {userEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {userEvents.map((event) => (
                <div key={event._id} className="relative">
                  <EventCard
                    id={event._id}
                    name={event.name}
                    venue={event.venue}
                    fee={event.fee}
                    startDate={event.startDate}
                    poster={event.poster}
                    createdBy={event.createdBy}
                    username={username || ""}
                    liked={false}
                    isOver={isEventOver(event)}
                    organisor={event.organiser}
                  />
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="absolute bottom-3 md:transte-x-0 md:bottom-3 md:right-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg shadow-md transition-all duration-300 z-20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center text-lg">
              You haven't created any events yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
