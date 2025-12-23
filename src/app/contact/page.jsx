"use client";

import React, { useState } from "react";

export default function ContactFutureStarPage() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  // ✅ Put your exact location here (Google Maps link)
  const MAP_EMBED_URL =
    "https://www.google.com/maps?q=Sialkot%2C%20Pakistan&output=embed";

  return (
    <section className="min-h-screen bg-transparent py-12 px-4 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Heading */}
        <header className="space-y-4 text-center md:text-left">
          <div className="flex font-bold items-center border border-[#FF7A00]/30 bg-[#FF7A00]/5 my-6 w-56 gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#FF7A00]">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Contact Future Star
          </div>

          <h1 className="text-3xl text-[#30318B] font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Tell us{" "}
            <span className="bg-[#FF7A00] bg-clip-text text-transparent">
              what you want to build
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm text-black sm:text-base">
            Share your product idea, quantity and artwork. We’ll come back with
            a clear, article-based quote and next steps from sampling to bulk.
          </p>
        </header>

        {/* Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
          {/* Left: Map + Form (50/50 on PC) */}
          <div className="rounded-2xl border border-slate-800 bg-[#30318B] p-4 shadow-[0_0_26px_rgba(0,0,0,0.85)] sm:p-6">
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
              {/* Map */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-visible">
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                    Our Location
                  </p>

                  <a
                    href="https://www.google.com/maps?q=Sialkot%2C%20Pakistan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFAE42] hover:text-[#FFB444]"
                  >
                    Open in Maps
                  </a>
                </div>

                <div className="relative h-[320px] sm:h-[360px] lg:h-full pb-6 overflow-visible">
                  <iframe
                    title="Future Star Map"
                    src={MAP_EMBED_URL}
                    className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-xl"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Form */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 sm:p-6">
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
                      className="inline-flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_top_left,#FF7A00,#FFB444)] cursor-pointer px-6 py-2.5 text-md font-semibold text-slate-950 transition hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,122,0,1)]"
                    >
                      Submit request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Info / theme block */}
          <aside className="space-y-5">
            {/* ... keep your existing aside exactly same ... */}
          </aside>
        </div>
      </div>
    </section>
  );
}
