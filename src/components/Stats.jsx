"use client";

import React from "react";
import { cn } from "@/lib/utils";

const STATS = [
  {
    label: "Trusted Clubs & Academies",
    value: "120+",
    subLabel: "Working with teams across 6+ countries",
  },
  {
    label: "Match-Ready Kits Produced",
    value: "45K+",
    subLabel: "From grassroots to semi-pro level",
  },
  {
    label: "On-Time Delivery Rate",
    value: "98.7%",
    subLabel: "Locked-in timelines for every season",
  },
  {
    label: "Average Reorder Rate",
    value: "73%",
    subLabel: "Teams who come back for the next season",
  },
];

const CHART_DATA = [
  { label: "Jan", value: 35 },
  { label: "Feb", value: 42 },
  { label: "Mar", value: 50 },
  { label: "Apr", value: 58 },
  { label: "May", value: 63 },
  { label: "Jun", value: 72 },
];

export default function FutureStarStatsSection() {
  const maxValue = Math.max(...CHART_DATA.map((item) => item.value));

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-transparent",
        "py-16 sm:py-20"
      )}
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
        {/* Left: Heading + stats cards */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="inline-flex items-center rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#FF7A00]">
              Future Star in Numbers
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Performance that{" "}
              <span className="bg-[#FF7A00] bg-clip-text text-transparent">
                teams can trust
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-300/90">
              Every jersey, every sock, every kit is tracked from sampling to
              match day. These numbers are not just stats—they’re proof that we
              deliver season after season.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 sm:p-5 shadow-lg shadow-black/40 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:border-[#FF7A00]/70"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/15 via-[#0056D2]/10 to-transparent" />
                </div>
                <p className="text-2xl sm:text-3xl font-semibold text-[#FF7A00]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-50">
                  {stat.label}
                </p>
                <p className="mt-2 text-xs text-slate-400">{stat.subLabel}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Simple bar chart + highlight card */}
        <div className="flex flex-col justify-between gap-6 lg:pl-6">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-5 sm:p-6 shadow-xl shadow-black/50 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Monthly Kits Dispatched
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Last 6 production months
                </p>
              </div>
              <div className="rounded-xl border border-[#FF7A00]/50 bg-[#FF7A00]/10 px-3 py-1 text-right">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#FFAE42]">
                  Trend
                </p>
                <p className="flex items-center gap-1 text-xs font-semibold text-[#FF7A00]">
                  ▲ 31%{" "}
                  <span className="text-[11px] font-normal text-[#FFAE42]/90">
                    vs previous period
                  </span>
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-6">
              <div className="relative h-40 sm:h-48">
                {/* Axis line */}
                <div className="absolute bottom-5 left-0 right-0 h-px bg-gradient-to-r from-slate-700/60 via-slate-500/40 to-slate-700/60" />
                {/* Bars */}
                <div className="flex h-full items-end justify-between gap-2">
                  {CHART_DATA.map((item) => {
                    const heightPercent = (item.value / maxValue) * 100;

                    return (
                      <div
                        key={item.label}
                        className="flex flex-1 flex-col items-center justify-end gap-2"
                      >
                        <div className="relative flex h-full w-full items-end justify-center">
                          <div className="relative flex h-full w-7 sm:w-9 items-end justify-center">
                            {/* Track */}
                            <div className="absolute bottom-5 h-[75%] w-px rounded-full bg-slate-700/70" />
                            {/* Bar */}
                            <div
                              className="relative z-10 w-full rounded-full bg-gradient-to-t from-[#0056D2] via-[#2F6BFF] to-[#FF7A00] shadow-[0_0_24px_rgba(0,86,210,0.55)] transition-all duration-300 hover:-translate-y-1.5"
                              style={{
                                height: `max(${heightPercent}%, 20%)`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-center text-[11px] sm:text-xs">
                          <span className="font-medium text-slate-200">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {item.value} kits
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom highlight */}
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-700/70 bg-slate-950/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Production Snapshot
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Peak month:{" "}
                  <span className="font-semibold text-[#FFAE42]">June</span>{" "}
                  with{" "}
                  <span className="font-semibold text-[#FF7A00]">
                    {maxValue} kits
                  </span>{" "}
                  dispatched.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-slate-400">Current capacity</p>
                <p className="text-sm font-semibold text-[#FFAE42]">
                  3–4 teams / week
                </p>
              </div>
            </div>
          </div>

          {/* Optional small note for social proof / reassurance */}
          <p className="text-xs text-slate-400/90">
            These stats update as new orders and seasons roll in — giving Future
            Star clubs a clear picture of our reliability before they commit
            their kits to us.
          </p>
        </div>
      </div>
    </section>
  );
}
