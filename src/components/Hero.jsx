"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

/** ✅ Put these in /public/hero/
 * Example:
 * /public/hero/jersey.png
 * /public/hero/football.png
 */
const HERO_SLIDES = [
  { name: "img-1", src: "/logo.jpg" },
  { name: "img-6", src: "/hero-slides/img-6.png" },
  { name: "img-4", src: "/hero-slides/img-4.png" },
  { name: "img-7", src: "/hero-slides/imgg7.png" },
  { name: "img-8", src: "/hero-slides/img-8.png" },
  { name: "img-9", src: "/hero-slides/img-9.png" },
  { name: "img-10", src: "/hero-slides/img-10.png" },
  { name: "img-10", src: "/hero-slides/11.png" },
  { name: "img-10", src: "/hero-slides/12.png" },
  { name: "img-10", src: "/hero-slides/13.png" },
  { name: "img-10", src: "/hero-slides/14.png" },
  // { name: "Football", src: "/hero/football.png" },
  // { name: "T-Shirt", src: "/hero/tshirt.png" },
  // { name: "Jacket", src: "/hero/jacket.png" },
  // { name: "Shorts", src: "/hero/shorts.png" },
];

export default function HeroFutureStar() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const active = HERO_SLIDES[index];

  return (
    <>
      <section className="min-h-[70vh] flex items-start lg:items-center justify-center px-4 md:px-8 text-black">

        <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-stretch justify-between lg:gap-10">
          {/* LEFT SIDE */}
          <div className="flex-1 max-w-xl flex flex-col justify-center items-center text-center lg:items-start lg:text-left">

            {/* Heading */}
            <h1 className="text-[32px] sm:text-[26px] md:text-5xl font-semibold tracking-tight text-[#30318B] leading-tight">
              Custom Sportswear,{" "} <br/>
              <span className="text-[#FF7A00]">Made for Teams</span>
            </h1>

            {/* Description */}
            <p className="mt-3 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black max-w-xs">
              Football kits, jackets & training wear—export-quality OEM/ODM production at scale.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center lg:items-start">

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-[#FF7A00] hover:bg-[#e56e00] transition active:scale-[0.98]">
                Get a Custom Quote →
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold border border-slate-500/70 text-black bg-transparent hover:bg-slate-900/60 hover:text-white hover:border-cyan-400 transition">
                Explore Products
              </Link>
            </div>

            {/* Footnote */}
            <p className="mt-4 text-[11px] sm:text-xs text-black">
              Low minimums • Fast sampling • Worldwide shipping
            </p>
          </div>


          {/* RIGHT SIDE – FULL WIDTH BLUE IMAGE PREVIEW */}
          <div className="flex-1 flex items-center">
            <div className="relative w-full">
              {/* ✅ Change height here */}
              <div className="relative rounded-xl w-full h-[560px] md:h-[520px] overflow-hidden">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.src}
                    initial={{ x: "20%", opacity: 0 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={{ x: "-20%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <div className="relative rounded-xl w-full h-full">
                      <Image
                        src={active.src}
                        alt={active.name}
                        fill
                        priority
                        className="object-contain rounded-2xl lg:p-8"

                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
              {/* DOTS */}
              {HERO_SLIDES.length > 1 && (
                <div className="lg:mt-3 flex items-center justify-center gap-2">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={[
                        "h-2 w-2 rounded-full transition",
                        i === index ? "bg-[#FF7A00] scale-110" : "bg-slate-500/60 hover:bg-slate-300/80",
                      ].join(" ")}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* TRUST LINE */}
      <div className="lg:pt-2 mx-auto flex flex-col mb-8 mt-10 lg:mt-0 lg:mb-8 lg:flex-row items-start justify-start lg:justify-center lg:items-center w-[100%] mx-auto gap-4 lg:gap-24">
        <h1 className="text-xl lg:text-2xl mb-4 text-black">⭐ Trusted By 100+ Brands</h1>
        <h1 className="text-xl lg:text-2xl mb-4 text-black">⭐ Fast Sampling: 5–7 Days</h1>
        <h1 className="text-xl lg:text-2xl mb-4 text-black">⭐ Over 1,500+ Products Delivered</h1>
      </div>
    </>
  );
}
