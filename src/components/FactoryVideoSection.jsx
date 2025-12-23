// src/components/FactoryVideoSection.jsx
"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Expand } from "lucide-react";

export default function FactoryVideoSection({
  title = "See Real Production in Action",
  highlight = "Future Star",
  badge = "Factory Proof",
  subtitle = "A quick look at cutting, printing, embroidery, stitching, and QC — the stuff that makes teams trust us.",
  videoSrc = "/video.mp4", // ✅ put your file in /public/videos/factory.mp4
  poster = "/why-choose.jpg", // ✅ optional poster image in /public/videos/
}) {
  const videoRef = useRef(null);
const [playing, setPlaying] = useState(true);
const [muted, setMuted] = useState(true);


  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      if (v.paused) {
        await v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
    } catch {
      // autoplay policies etc.
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const openFullscreen = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) await v.requestFullscreen();
  };

  return (
    <section className="relative z-10 py-16 md:py-20">
      {/* thin brand line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#30318B] to-transparent" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* LEFT: Copy */}
        <div className="lg:col-span-5">
           <div className="flex items-center border border-[#FF7A00]/30 bg-[#FF7A00]/5 my-6 w-52 font-bold gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#FF7A00]">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Our Factory Proof
            </div>

          <h2 className="text-3xl font-semibold tracking-tight text-[#30318B] sm:text-4xl">
            {title}{" "}
            <span className="text-[#FF7E23]">
              {highlight}
            </span>
          </h2>

          <p className="mt-4 text-sm text-black sm:text-base">{subtitle}</p>

          <ul className="mt-6 space-y-3 text-sm text-black">
            {[
              "Pro-grade sportswear processes (sublimation, embroidery, heat-press).",
              "Quality checks on sizing, stitching & branding consistency.",
              "Packing & dispatch ready for clubs, academies and brands worldwide.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/90" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,122,0,0.35)] transition hover:bg-orange-400"
            >
              Get a Quote
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-2xl border border-black bg-white/5 px-5 py-3 text-sm font-semibold text-black backdrop-blur transition hover:bg-white/10"
            >
              Browse Products
            </a>
          </div>

          <p className="mt-5 text-xs text-black">
            *This is our real production floor — not stock footage.*
          </p>
        </div>

        {/* RIGHT: Video */}
        <div className="lg:col-span-7">
          <div className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-gradient-to-b from-slate-900/70 via-slate-950/80 to-slate-950/90 p-[1px] shadow-[0_0_40px_rgba(0,0,0,0.55)]">
            <div className="relative overflow-hidden rounded-3xl bg-[rgba(255,255,255,0.03)]">

              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src={videoSrc}
                  autoPlay
                  loop
                  playsInline
                  muted
                  controls={false}
                  preload="auto"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />


                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* Controls */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 sm:p-4">
                  <button
                    onClick={togglePlay}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/55"
                    aria-label={playing ? "Pause video" : "Play video"}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-500/20">
                      {playing ? (
                        <Pause className="h-4 w-4 text-orange-200" />
                      ) : (
                        <Play className="h-4 w-4 text-orange-200" />
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {playing ? "Pause" : "Play"} factory tour
                    </span>
                    <span className="sm:hidden">{playing ? "Pause" : "Play"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/55"
                      aria-label={muted ? "Unmute video" : "Mute video"}
                    >
                      {muted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={openFullscreen}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/55"
                      aria-label="Open fullscreen"
                    >
                      <Expand className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
