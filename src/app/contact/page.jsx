"use client";

import React from "react";
import { useState } from "react";

export default function ContactFutureStarPage() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black py-12 px-4 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Heading */}
        <header className="space-y-4 text-center md:text-left">
          <p className="inline-flex items-center rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFAE42]">
            Contact Future Star
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Tell us{" "}
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FFB444] to-[#0056D2] bg-clip-text text-transparent">
              what you want to build
            </span>
            .
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300/80 sm:text-base">
            Share your product idea, quantity and artwork. We’ll come back with
            a clear, article-based quote and next steps from sampling to bulk.
          </p>
        </header>

        {/* Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
          {/* Left: Form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-[0_0_26px_rgba(0,0,0,0.85)] sm:p-7">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                // hook up to API / form action later
              }}
            >
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@clubname.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label
                    htmlFor="product"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                  >
                    Product they want
                  </label>
                  <input
                    id="product"
                    name="product"
                    type="text"
                    placeholder="e.g. Football kit, Hoodie, Tracksuit"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="quantity"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    placeholder="e.g. 30 sets, 100 pcs"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="artwork"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                >
                  Artwork or special instructions
                </label>
                <textarea
                  id="artwork"
                  name="artwork"
                  rows={4}
                  placeholder="Tell us about colors, logos, positions, player names/numbers, fabrics or any special requirements."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>

              {/* Upload */}
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                  htmlFor="file"
                >
                  Upload file (logo, tech pack, reference)
                </label>

                {/* Upload Box */}
                <label
                  htmlFor="file"
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-3 text-xs text-slate-300 transition hover:border-[#FF7A00]/70 hover:bg-slate-900/80 sm:text-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-100">
                      Click to upload or drag &amp; drop
                    </span>
                    <span className="mt-0.5 text-[11px] text-slate-400">
                      PNG, JPG, PDF, AI, PSD — up to 20MB
                    </span>
                  </div>

                  <span className="rounded-full border border-[#FF7A00]/50 bg-[#FF7A00]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFAE42]">
                    Attach
                  </span>
                </label>

                <input
                  id="file"
                  name="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                {/* Success Message */}
                {uploadedFile && (
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-4 py-2">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-300" />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-[#FFAE42]">
                        Uploaded successfully
                      </p>
                      <p className="text-xs text-slate-200">
                        {uploadedFile.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_top_left,#FF7A00,#FFB444)] px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_26px_rgba(255,122,0,0.8)] transition hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,122,0,1)]"
                >
                  Submit request
                </button>
              </div>
            </form>
          </div>

          {/* Right: Info / theme block */}
          <aside className="space-y-5">
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
                How we handle your request
              </h2>
              <p className="text-sm text-slate-300/90">
                Once you share your product, quantity and artwork, we map it to
                a clear article number and come back with options for fabrics,
                printing/embroidery and lead time.
              </p>
              <ul className="mt-2 space-y-2 text-xs text-slate-300/90">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                  <p>
                    <span className="font-semibold text-slate-100">
                      Step-based flow:
                    </span>{" "}
                    From sampling to bulk, we keep you updated on every stage.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                  <p>
                    <span className="font-semibold text-slate-100">
                      Brand-respectful:
                    </span>{" "}
                    Your logos, colors and identity are handled like our own.
                  </p>
                </li>
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-[#FF7A00]/25 bg-gradient-to-br from-slate-950 via-slate-950 to-[#0b1635] p-6 shadow-[0_0_26px_rgba(0,0,0,0.9)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
                Ideal for
              </h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• Clubs & academies upgrading to custom kits</li>
                <li>• Sportswear brands looking for a production partner</li>
                <li>• Schools, colleges & corporate teams</li>
              </ul>

              <div className="grid grid-cols-3 gap-3 pt-3 text-center text-[11px] text-slate-300">
                <div className="rounded-xl border border-slate-800/70 bg-slate-950/80 p-3">
                  <p className="text-base font-semibold text-[#FFAE42]">
                    1–3
                  </p>
                  <p className="mt-1 uppercase tracking-[0.16em]">
                    Days for initial reply
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/70 bg-slate-950/80 p-3">
                  <p className="text-base font-semibold text-[#FFAE42]">
                    Article
                  </p>
                  <p className="mt-1 uppercase tracking-[0.16em]">
                    Based quotations
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/70 bg-slate-950/80 p-3">
                  <p className="text-base font-semibold text-[#FFAE42]">
                    Guided
                  </p>
                  <p className="mt-1 uppercase tracking-[0.16em]">
                    Fabric &amp; print help
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
