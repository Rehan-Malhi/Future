"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

const fallbackStates = [
  "Fabric Cutting",
  "Printing",
  "Stitching",
  "Washing",
  "Quality Check",
  "Packed",
  "Shipped",
];

export default function TrackOrderPage() {
  const [steps, setSteps] = useState(null);
  const [status, setStatus] = useState(null);
  const [noOrder, setNoOrder] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (typeof window === "undefined") return;

      const storedEmail = window.localStorage.getItem("tphTrackingEmail");

      if (!storedEmail) {
        // No email = send back to login
        window.location.href = "/login";
        return;
      }

      setEmail(storedEmail);

      const cleanEmail = storedEmail.trim().toLowerCase().replace(/\./g, ",");

      const snap = await get(ref(db, "orders/" + cleanEmail));

      if (!snap.exists()) {
        setNoOrder(true);
        setSteps(null);
        setStatus(null);
        return;
      }

const raw = snap.val();

const data = {
  status: raw?.status ?? 0,
  states: raw?.states ?? [],
  totalStates: raw?.totalStates ?? 0,
};




      const dbSteps =
        Array.isArray(data.states) && data.states.length > 0
          ? data.states
          : fallbackStates;

      let dbStatus =
        typeof data.status === "number" ? data.status : 0;

      if (dbStatus >= dbSteps.length) dbStatus = dbSteps.length - 1;
      if (dbStatus < 0) dbStatus = 0;

      setSteps(dbSteps);
      setStatus(dbStatus);
      setNoOrder(false);
    };

    loadOrder();
  }, []);

  if (status === null || steps === null) {
    if (noOrder) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
          <div className="text-center space-y-3">
            <h1 className="text-xl font-semibold text-white">
              No order found
            </h1>
            <p className="text-gray-400 text-sm">
              We couldn’t find an order for this email.  
              Please double-check the email with TPH or try again.
            </p>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.removeItem("tphTrackingEmail");
                  window.location.href = "/login";
                }
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm"
            >
              Try another email
            </button>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-300">Loading your order…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-semibold text-white mb-4 text-center">
        Order Tracking
      </h1>

      {email && (
        <p className="text-xs text-gray-400 mb-6 text-center">
          Showing status for: <span className="text-gray-200">{email}</span>
        </p>
      )}

      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => {
            const isDone = index <= status;
            const isCurrent = status === index;

            return (
              <div
                key={index}
                className="flex md:flex-col items-center md:items-center gap-3 flex-1"
              >
                {/* Connector line (desktop) */}
                {index > 0 && (
                  <div className="hidden md:block flex-1 h-1 bg-gray-800">
                    <div
                      className={`h-1 ${
                        index - 1 <= status ? "bg-green-500" : "bg-gray-800"
                      }`}
                    />
                  </div>
                )}

                {/* Step circle */}
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full border-2 text-xs font-bold
                  ${
                    isDone
                      ? "bg-green-500 border-green-400 text-white"
                      : "border-gray-700 text-gray-500 bg-gray-900"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Label */}
                <p
                  className={`text-xs md:text-sm text-center ${
                    isCurrent ? "text-green-400 font-semibold" : "text-gray-300"
                  }`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Current status:{" "}
          <span className="text-green-400 font-medium">
            {steps[status]}
          </span>
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.removeItem("tphTrackingEmail");
                window.location.href = "/login";
              }
            }}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 text-xs hover:bg-gray-700"
          >
            Check another email
          </button>
        </div>
      </div>
    </main>
  );
}
