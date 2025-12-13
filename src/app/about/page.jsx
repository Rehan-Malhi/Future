"use client";

import React from "react";

export default function AboutFutureStarPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black py-12 px-4 sm:px-6 lg:px-8 text-slate-50">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Hero */}
        <header className="space-y-4 text-center md:text-left">
          <p className="inline-flex items-center rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#FF7A00]">
            About Future Star
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Built for{" "}
            <span className="bg-[#FF7A00] bg-clip-text text-transparent">
              serious teams
            </span>{" "}
            that want to play.
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300/80">
            Future Star designs and manufactures performance-focused kits,
            tracksuits and teamwear for clubs, academies and brands that demand
            clean design, consistent quality and professional handling from
            sampling to bulk production.
          </p>
        </header>

        {/* 2-column: Story + What we do */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] items-start">
          {/* Story */}
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-[0_0_26px_rgba(0,0,0,0.75)] sm:p-7">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Who we are
            </h2>
            <p className="text-sm leading-relaxed text-slate-300/90">
              Future Star is a sportswear manufacturing studio obsessed with the
              details that athletes actually feel on the pitch — the way a
              neckline sits, how a fabric breathes under floodlights, and how
              your club colors look under the camera.
            </p>
            <p className="text-sm leading-relaxed text-slate-300/90">
              We work closely with clubs, academies, schools and emerging
              sportswear brands to turn their ideas into production-ready
              garments: from first sketch and mockups, to samples, to full bulk
              runs delivered in proper packaging.
            </p>
          </div>

          {/* What we focus on */}
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_0_20px_rgba(0,0,0,0.7)] sm:p-7">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              What we do
            </h2>
            <ul className="space-y-3 text-sm text-slate-300/90">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Custom teamwear:
                  </span>{" "}
                  Football kits, tracksuits, hoodies and travel wear matched to
                  your club identity, colors and sponsor placements.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                <p>
                  <span className="font-semibold text-slate-100">
                    From sampling to bulk:
                  </span>{" "}
                  Clear process for fit samples, size-set approval and then
                  controlled bulk production.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                <p>
                  <span className="font-semibold text-slate-100">
                    Brand-friendly handling:
                  </span>{" "}
                  We can work under your brand name, with your labels, your
                  packaging and your tech packs.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Mission / Vision / Promise */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
              Mission
            </h3>
            <p className="mt-2 text-sm text-slate-300/90">
              To make professional-quality custom sportswear accessible to clubs
              and brands who want factory-level execution without factory-level
              confusion.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
              Vision
            </h3>
            <p className="mt-2 text-sm text-slate-300/90">
              To be the behind-the-scenes production house powering future
              stars, from grassroots academies to rising sportswear labels.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
              Our Promise
            </h3>
            <p className="mt-2 text-sm text-slate-300/90">
              Clear communication, realistic timelines and products that match
              the mockups you approved—down to the article number and size
              breakdown.
            </p>
          </div>
        </div>

        {/* How we work */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-[0_0_26px_rgba(0,0,0,0.8)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              How we work with teams & brands
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#FFAE42]">
              From first idea to ready-to-wear
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              {
                label: "1. Brief & concept",
                text: "You share your idea, colors, logos and references. We align on the look and purpose of the collection.",
              },
              {
                label: "2. Design & mockups",
                text: "We translate the brief into clean mockups with article numbers, panels and print/embroidery positions.",
              },
              {
                label: "3. Sampling & fit",
                text: "We create samples for fit and fabric approval so you can feel and test the product on real players.",
              },
              {
                label: "4. Bulk production",
                text: "After approval, we move to controlled bulk production with proper QC, packing and dispatch.",
              },
            ].map((step) => (
              <div
                key={step.label}
                className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300/90"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFAE42]">
                  {step.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose us */}
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Why teams trust Future Star
            </h2>
            <p className="text-sm text-slate-300/90">
              We design and manufacture with the mindset of both a brand owner
              and a player. That means sharp silhouettes, smart fabric choices,
              and process that respects your time and budget.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFAE42]">
                  Theme-first design
                </p>
                <p className="mt-2 text-[13px] text-slate-300/90">
                  We keep your club story, brand colors and sponsor visibility
                  at the center of every kit we build.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFAE42]">
                  Clear article system
                </p>
                <p className="mt-2 text-[13px] text-slate-300/90">
                  Every style gets a unique article number so re-orders, size
                  top-ups and future tweaks stay simple.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFAE42]">
                  Practical fabrics
                </p>
                <p className="mt-2 text-[13px] text-slate-300/90">
                  We recommend fabrics based on movement, climate and use-case,
                  not just whatever is available on shelf.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFAE42]">
                  Process transparency
                </p>
                <p className="mt-2 text-[13px] text-slate-300/90">
                  You always know which stage your order is in—sampling,
                  cutting, stitching, finishing or dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Small stats / credibility block */}
          <div className="space-y-5 rounded-2xl border border-[#FF7A00]/25 bg-slate-950/85 p-6 shadow-[0_0_26px_rgba(0,0,0,0.85)]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
              Built for modern clubs
            </h3>
            <p className="text-sm text-slate-300/90">
              Whether you are an academy ordering your first custom kit, or a
              brand managing multiple styles and collections, Future Star is set
              up to scale your ideas into consistent, repeatable production.
            </p>
            <div className="flex justify-center gap-8 pt-2 text-center">
              <div>
                <p className="text-2xl font-semibold text-[#FF7A00]">24/7</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Design communication
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#FF7A00]">Step</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Based production flow
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#FF7A00]">Repeat</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Friendly article system
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-slate-800/80 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Ready to build your next kit with Future Star?
              </h2>
              <p className="mt-1 text-sm text-slate-300/90">
                Share your idea, theme or existing kit and we’ll help you turn
                it into a production-ready article with clear sizes and specs.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_top_left,#FF7A00,#FFB444)] px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_26px_rgba(255,122,0,0.8)] transition hover:shadow-[0_0_36px_rgba(255,122,0,1)]">
              Start a project with Future Star
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
