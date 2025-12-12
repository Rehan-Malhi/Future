// src/components/FeaturedProducts.tsx
import { FC } from "react";
import Image from "next/image";
import { Shirt } from "lucide-react";

const categories = [
  {
    name: "Football Kits",
    tag: "Match & Training",
    img: "/products/fake.jpg",
    description:
      "Full kits with custom colors, numbers and sponsor logos for clubs and academies.",
    details: ["Dri-fit fabrics", "Sublimation & screen print", "Adult & youth sizing"],
  },
  {
    name: "Hoodies",
    tag: "Street & Teamwear",
    img: "/products/fake.jpg",
    description:
      "Heavyweight fleece hoodies with embroidery, chenille patches and puff prints.",
    details: ["320–380 GSM fleece", "Oversized & regular fits", "Zippers & pullovers"],
  },
  {
    name: "Tracksuits",
    tag: "Warmups & Travel",
    img: "/products/fake.jpg",
    description:
      "Sharp, tapered tracksuits for travel, pre-match and lifestyle collections.",
    details: ["Poly / spandex blends", "Zipped pockets", "Contrast panels & piping"],
  },
  {
    name: "Trousers",
    tag: "Joggers & Bottoms",
    img: "/products/fake.jpg",
    description:
      "Performance joggers and woven pants ready for gyms, teams and streetwear drops.",
    details: ["Rib cuffs or open hem", "Elastic waistband", "Custom labels & trims"],
  },
  {
    name: "T-Shirts",
    tag: "Essentials & Merch",
    img: "/products/fake.jpg",
    description:
      "Premium tees for merchandise, fanwear and daily basics in multiple fits.",
    details: ["180–240 GSM cotton", "Screen & DTG print", "Oversized & boxy fits"],
  },
  {
    name: "Shorts",
    tag: "Game & Training",
    img: "/products/fake.jpg",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
];

const FeaturedProducts = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
            Product Categories
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Elite Products for{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
              Future-Teams
            </span>
          </h2>
          <p className="mt-4 text-sm text-slate-300/80 sm:text-base">
            From grassroots clubs to professional brands, we manufacture full
            collections that stay consistent across seasons.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950/95 p-[1px] transition-transform duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]"
            >
              <div className="relative flex h-full flex-col rounded-3xl bg-[rgba(255,255,255,0.03)]">

                {/* 🔥 IMAGE TOP (with hover zoom) */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  {/* glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/10 blur-2xl group-hover:bg-orange-400/20" />

                  {/* Icon + Title */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10">
                      <Shirt className="h-5 w-5 text-orange-300" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-orange-300/80">
                        {item.tag}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-50">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-slate-300/80">
                    {item.description}
                  </p>

                  {/* Details */}
                  <ul className="mb-5 space-y-1.5 text-xs text-slate-300/80">
                    {item.details.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-orange-400/80" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto flex items-center justify-between pt-1">
                    <button className="text-xs font-semibold text-orange-300 transition-colors duration-200 group-hover:text-orange-200">
                      View product details →
                    </button>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-200/90">
                      Customizable
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
