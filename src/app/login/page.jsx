"use client";

import React, { useState } from "react";
import { db } from "@/lib/Firebase";
import { ref, get } from "firebase/database";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckEmail = async () => {
    setMessage(null);

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const cleanEmail = trimmed.replace(/\./g, ",");
      const snap = await get(ref(db, "orders/" + cleanEmail));

      if (!snap.exists()) {
        setMessage(
          "No order found for this email. Please check spelling or contact TPH."
        );
        return;
      }

      // ✅ Save the *original* email (nice for showing back to user)
      if (typeof window !== "undefined") {
        window.localStorage.setItem("tphTrackingEmail", trimmed);
      }

      // ✅ Go to track-order page
      window.location.href = "/track-order";
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCheckEmail();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Track your TPH Order
        </h1>

        <p className="text-xs text-gray-400 text-center">
          Enter the email you used when talking with TPH.  
          If we have an order under that email, we’ll show its status.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@brand.com"
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-400 font-medium"
          >
            {loading ? "Checking…" : "View Order Status"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-300 mt-2">{message}</p>
        )}
      </div>
    </main>
  );
}
