"use client";
import { useState, useEffect } from "react"; // <-- useEffect imported from React
import { useParams } from "next/navigation";
import Navbar from "../../navbar/navbar";

interface UserData {
  username: string;
  phone: string;
  email: string;
  about: string;
  password: string;
}

export default function ProfilePage() {
  const params = useParams();
  const rawUsername = params.username;
  const username: string | null = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername ?? null;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!username) return;
    // Fetch user data from backend
    console.log("username:", username);
    fetch(`http://localhost:5000/api/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data: UserData) => {
        setUserData(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [username]);

  const handleChangePassword = () => {
    const newPass = prompt("Enter new password:");
    if (newPass && userData) {
      setUserData({ ...userData, password: newPass });
      // Send update to backend
      fetch(`http://localhost:5000/api/users/${username}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPass }),
      }).catch((err) => console.error(err));
    }
  };

  const handleSaveChanges = async () => {
    if (!userData || !username) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Failed to update user");
      const updated = await res.json();
      setUserData(updated);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update profile. Try again!");
    }
  };

  const setEmail = (value: string) => {
    if (!userData) return;
    setUserData({ ...userData, email: value });
  };

  const setAbout = (value: string) => {
    if (!userData) return;
    setUserData({ ...userData, about: value });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-4">
      <Navbar username={username} />

      <h1 className="text-5xl font-bold mb-10">MY PROFILE </h1>

      <div className="w-full max-w-2xl p-8 rounded-xl shadow-lg flex flex-col gap-6">
        {/* Username */}
        <div className="flex justify-between items-center">
          <span className="text-purple-300 font-semibold">Username</span>
          <span className=" px-4 py-2 rounded text-purple-400 cursor-not-allowed">
            {username}
          </span>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center">
          <span className="text-purple-300 font-semibold">Phone</span>
          <input
            type="text"
            value={userData?.phone || ""}
            onChange={(e) =>
              setUserData({ ...userData!, phone: e.target.value })
            }
            className="bg-gray-800 px-4 py-2 rounded text-purple-400 border border-purple-600 w-1/2 text-right"
          />
        </div>

        {/* Email */}
        <div className="flex justify-between items-center">
          <span className="text-purple-300 font-semibold">Email</span>
          <input
            type="email"
            value={userData?.email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded text-purple-400 border border-purple-600 w-1/2 text-right"
          />
        </div>

        {/* Password */}
        <div className="flex justify-between items-center">
          <span className="text-purple-300 font-semibold">Password</span>
          <div className="relative w-1/2 text-right">
            <input
              type={showPassword ? "text" : "password"}
              value={userData?.password || ""}
              readOnly
              className="w-full bg-gray-800 px-4 py-2 rounded text-purple-400 border border-purple-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-100"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          className="self-start bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-2"
        >
          Change Password
        </button>

        {/* About */}
        <div className="flex flex-col mt-4">
          <span className="text-purple-300 font-semibold mb-2">About</span>
          <textarea
            value={userData?.about}
            onChange={(e) => setAbout(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded bg-gray-800 text-purple-400 border border-purple-600"
          />
        </div>

        <button
          onClick={handleSaveChanges}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded mt-4 self-end"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
