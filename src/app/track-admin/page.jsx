"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/Firebase";
import { ref, get, set } from "firebase/database";

// 🔐 SUPER SIMPLE CLIENT-SIDE PASSWORD
// 👉 Change this to whatever you want.
// For real security, do this on the server / with proper auth.
const ADMIN_PASSWORD = "Future Star-admin-2024";

const defaultStates = [
  "Pattern Cutting",
  "Fabric Sourcing",
  "Fabric Cutting",
  "Trims/labels",
  "Printing/Embroidery/rhinestones",
  "Stitching",
  "QC/Packing",
  "Shipping",
];

export default function AdminPage() {
  // ── Admin gate ─────────────────────────────────────
  const [adminPassInput, setAdminPassInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("Future StarAdminAuthed");
    if (stored === "true") setIsAuthed(true);
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassInput === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setAuthError(null);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("Future StarAdminAuthed", "true");
      }
    } else {
      setAuthError("Incorrect admin password.");
    }
  };

  // ── Order editing state ─────────────────────────────
  const [email, setEmail] = useState("");
  const [states, setStates] = useState(defaultStates);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const cleanEmail = email.trim().toLowerCase().replace(/\./g, ",");

  const loadOrder = async () => {
    if (!cleanEmail) {
      setMessage("Enter a customer email first.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const snap = await get(ref(db, "orders/" + cleanEmail));

      if (snap.exists()) {
  const raw = snap.val();

  const data = {
    status: raw?.status,
    states: raw?.states,
    updatedAt: raw?.updatedAt,
  };
  
        const dbStates =
          Array.isArray(data.states) && data.states.length > 0
            ? data.states
            : defaultStates;

        setStates(dbStates);

        const dbStatus =
          typeof data.status === "number" && data.status < dbStates.length
            ? data.status
            : 0;

        setStatus(dbStatus);
        setLastUpdated(data.updatedAt ?? null);
        setMessage("Loaded existing order for this email.");
      } else {
        setStates(defaultStates);
        setStatus(0);
        setLastUpdated(null);
        setMessage("No order yet. You’re creating a new one with default states.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error loading order.");
    } finally {
      setLoading(false);
    }
  };

  const saveOrder = async () => {
    if (!cleanEmail) {
      setMessage("Enter a customer email.");
      return;
    }

    const cleanedStates = states.map((s) => s.trim()).filter(Boolean);
    if (cleanedStates.length === 0) {
      setMessage("You must have at least one state.");
      return;
    }

    const clampedStatus =
      status < cleanedStates.length ? status : cleanedStates.length - 1;

    setSaving(true);
    setMessage(null);

    try {
      const now = Date.now();

      await set(ref(db, "orders/" + cleanEmail), {
        status: clampedStatus,
        updatedAt: now,
        states: cleanedStates,
        totalStates: cleanedStates.length,
      });

      setStatus(clampedStatus);
      setStates(cleanedStates);
      setLastUpdated(now);
      setMessage("Order & states saved successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Error saving order.");
    } finally {
      setSaving(false);
    }
  };

  const changeStateName = (index, value) => {
    setStates((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const removeState = (index) => {
    setStates((prev) => {
      const copy = prev.filter((_, i) => i !== index);
      return copy.length > 0 ? copy : [""];
    });

    setStatus((prev) => {
      if (prev > index) return prev - 1;
      if (prev === index) return Math.max(prev - 1, 0);
      return prev;
    });
  };

  const addState = () => {
    setStates((prev) => [...prev, ""]);
  };

  const formatDate = (ms) => {
    if (!ms) return "—";
    try {
      return new Date(ms).toLocaleString();
    } catch {
      return "—";
    }
  };

  // ── Render: Admin Login Gate ────────────────────────
  if (!isAuthed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl max-w-sm w-full p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-white text-center">
            Future Star Admin Access
          </h1>
          <p className="text-xs text-gray-400 text-center">
            This area is only for internal Future Star use.  
            Enter the admin password to manage order states.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="password"
              value={adminPassInput}
              onChange={(e) =>
                setAdminPassInput(e.target.value)
              }
              placeholder="Admin password"
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium"
            >
              Enter Admin Panel
            </button>
          </form>

          {authError && (
            <p className="text-center text-sm text-red-400 mt-2">{authError}</p>
          )}

          <p className="text-[11px] text-gray-500 text-center mt-4">
            Tip: In production, protect this route with real auth,  
            not just a client-side password.
          </p>
        </div>
      </main>
    );
  }

  // ── Render: Main Admin UI ───────────────────────────
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Future Star Order Admin
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Search by customer email, adjust their current state, and customize
              their production steps.
            </p>
          </div>
          <button
            onClick={() => {
              setIsAuthed(false);
              if (typeof window !== "undefined") {
                window.localStorage.removeItem("Future StarAdminAuthed");
              }
            }}
            className="self-start md:self-auto text-xs px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
          >
            Lock Admin Panel
          </button>
        </header>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1.2fr] gap-6">
          {/* Left card: Email + status */}
          <section className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-sm font-semibold text-gray-100 flex items-center justify-between">
              Order Selector
              {lastUpdated && (
                <span className="text-[11px] text-gray-500 font-normal">
                  Last updated: {formatDate(lastUpdated)}
                </span>
              )}
            </h2>

            {/* Email row */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Customer email</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="customer@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={loadOrder}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium text-gray-100 whitespace-nowrap"
                >
                  {loading ? "Loading…" : "Load / Create"}
                </button>
              </div>
              <p className="text-[11px] text-gray-500">
                If no order exists, a new one will be created when you save.
              </p>
            </div>

            {/* Status select */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Current status</label>
              <select
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
              >
                {states.map((state, index) => (
                  <option key={index} value={index}>
                    {index} – {state || "(empty)"}
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-gray-500">
                <p>
                  Step {status + 1} of {states.length}
                </p>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${states.length > 1
                        ? (status / (states.length - 1)) * 100
                        : 0
                        }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={saveOrder}
              className="w-full py-2.5 mt-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition disabled:opacity-50"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Order & States"}
            </button>

            {message && (
              <p className="text-xs text-gray-300 mt-2 border-t border-gray-800 pt-3">
                {message}
              </p>
            )}
          </section>

          {/* Right card: States list */}
          <section className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-100">
                Production States for this Order
              </h2>
              <button
                type="button"
                onClick={addState}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-100"
              >
                + Add State
              </button>
            </div>

            <p className="text-[11px] text-gray-500">
              These are the steps the client sees on their tracking page, in this
              exact order.
            </p>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
              {states.map((state, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-900/70 rounded-xl px-3 py-2"
                >
                  <span className="text-[11px] text-gray-500 w-6 text-right">
                    {index}
                  </span>
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={state}
                    placeholder={`State ${index + 1}`}
                    onChange={(e) => changeStateName(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeState(index)}
                    className="text-[11px] px-2 py-1 rounded-lg bg-red-600/80 hover:bg-red-500 text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
