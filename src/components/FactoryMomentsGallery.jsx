"use client";

import Image from "next/image";

const moments = [
  {
    title: "Pattern Cutting",
    caption: "Laser-cut panels prepared for bulk orders.",
    src: "/factoryw/1.png",
  },
  {
    title: "Fabric Inspection",
    caption: "Every roll checked for shade and defects.",
    src: "/factoryw/2.png",
  },
  {
    title: "Printing Zone",
    caption: "Screen & sublimation prints in full motion.",
    src: "/factoryw/3.png",
  },
  {
    title: "Embroidery Room",
    caption: "Club crests & logos stitched with precision.",
    src: "/factoryw/4.png",
  },
  {
    title: "Stitching Line",
    caption: "Highly trained operators on production lines.",
    src: "/factoryw/5.png",
  },
  {
    title: "Quality Check",
    caption: "Measurement, stitching and branding verified.",
    src: "/factoryw/6.png",
  },
];

export default function FactoryMomentsGallery() {
  return (
    <section className="relative z-10 bg-transparent py-16 md:py-20">
      {/* Thin brand line on top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex items-center rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00]">
            Factory Moments
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[#30318B] sm:text-4xl">
            Inside the{" "}
            <span className="bg-[#FF7A00] bg-clip-text text-transparent">
              Future Star
            </span>{" "}
            Production Floor
          </h2>

          <p className="mt-4 text-sm text-black sm:text-base">
            A glimpse into the everyday rhythm of our factory — from fabric
            checks and printing to final packing and dispatch for global teams.
          </p>
        </div>

        {/* Grid of 9 images */}
       <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {moments.map((m) => (
            <figure
              key={m.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900/40 shadow-[0_0_24px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:border-[#FF7A00]/50"
            >
              {/* Image */}
            <div className="relative h-56 sm:h-76 md:h-84 lg:h-96 w-full overflow-hidden">

                <Image
                  src={m.src}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay text on hover */}
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#FFAE42] sm:text-base">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-200/90 sm:text-[13px]">
                    {m.caption}
                  </p>
                </div>
              </div>

              {/* Future Star Hover Glow */}
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-[#FF7A00]/0 transition duration-300 group-hover:ring-2 group-hover:ring-[#FF7A00]/60" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
