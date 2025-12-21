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
  { name: "img-2", src: "/hero-slides/img-1.png" },
  { name: "imgg-3", src: "/hero-slides/imgg-3.png" },
  { name: "img-4", src: "/hero-slides/img-4.png" },
  { name: "img-5", src: "/hero-slides/img-5.png" },
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
      <section className="min-h-[70vh] flex items-center justify-center md:px-8 text-black">
        <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-stretch justify-between lg:gap-10">
          {/* LEFT SIDE */}
          <div className="flex-1 max-w-xl flex flex-col justify-center">
            <div className="flex font-bold items-center border border-[#FF7A00]/30 bg-[#FF7A00]/5 my-6 w-96 gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#FF7A00]">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Future-Built Sportswear Manufacturing
            </div>
            <h1 className="text-[30px] sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#30318B] leading-[1.05]">
              Custom Sportswear,{" "}
              <span className="text-[#FF7A00]">Made for Teams</span>
            </h1>

            <p className="mt-4 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
              Football kits, jackets & training wear—export-quality OEM/ODM production at scale.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-[#FF7A00] hover:bg-[#e56e00] transition active:scale-[0.98]"
              >
                Get a Custom Quote →
              </Link>

              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold border border-slate-500/70 text-black bg-transparent hover:bg-slate-900/60 hover:text-white hover:border-cyan-400 transition"
              >
                Explore Products
              </Link>
            </div>

            <p className="mt-4 text-xs text-black">
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
                        className="object-contain rounded-2xl p-8 sm:p-10 md:p-12"

                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
              {/* DOTS */}
              {HERO_SLIDES.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
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
      <div className="lg:pt-2 flex ml-6 lg:ml-0 flex-col mb-8 mt-10 lg:mt-0 lg:mb-8 lg:flex-row items-start justify-start lg:justify-center lg:items-center w-full gap-4 lg:gap-24">
        <h1 className="text-xl lg:text-2xl mb-4 text-black">⭐ Trusted By 100+ Brands</h1>
        <h1 className="text-xl lg:text-2xl mb-4 text-black">⭐ Fast Sampling: 5–7 Days</h1>
        <h1 className="text-xl lg:text-2xl mb-4 text-black">⭐ Over 1,500+ Products Delivered</h1>
      </div>
    </>
  );
}
