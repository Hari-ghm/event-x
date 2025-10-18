"use client";
import { useState } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [signinData, setSigninData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sign In Data:", signinData);

    if (!signinData.username || !signinData.password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signinData.username,
          password: signinData.password,
        }),
      });
      
      const data = await response.json();

      if (response.ok) {
        alert(`✅ Signed in successfully as ${signinData.username}`);
        console.log("User:", data);
        // Optionally store token or user info:
        // localStorage.setItem("token", data.token);
      } else {
        alert(`❌ ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  // Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sign Up Data:", signupData);

    if (!signupData.username || !signupData.password || !signupData.confirmPassword) {
      alert("Please enter username, password, confirm password");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert("password and confirmPassword does not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signinData.username,
          password: signinData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Signed in successfully as ${data.username}`);
        console.log("User:", data);
        // Optionally store token or user info:
        // localStorage.setItem("token", data.token);
      } else {
        alert(`❌ ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="text-white text-6xl tracking-widest font-semibold pb-18">
        EVENT X
      </div>

      <div className="w-[380px] bg-zinc-900 rounded-2xl p-8 shadow-xl relative overflow-hidden mb-24">
        {/* Tabs */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsSignup(false)}
            className={`w-1/2 py-2 text-center font-semibold transition-all ${
              !isSignup
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`w-1/2 py-2 text-center font-semibold transition-all ${
              isSignup
                ? "border-b-2 border-green-500 text-green-400"
                : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms Container */}
        <div className="relative w-full h-[220px]">
          {/* Sign In Form */}
          <form
            onSubmit={handleSignIn}
            className={`absolute w-full transition-all duration-500 ${
              isSignup
                ? "translate-x-[-400px] opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <input
              type="text"
              placeholder="Username"
              value={signinData.username}
              onChange={(e) =>
                setSigninData({ ...signinData, username: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signinData.password}
              onChange={(e) =>
                setSigninData({ ...signinData, password: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Form */}
          <form
            onSubmit={handleSignUp}
            className={`absolute w-full transition-all duration-500 ${
              isSignup
                ? "translate-x-0 opacity-100"
                : "translate-x-[400px] opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="Username"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full mb-4 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-500 hover:bg-green-700 rounded-lg font-semibold transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
