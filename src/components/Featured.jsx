// src/components/FeaturedProducts.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shirt } from "lucide-react";

const categories = [
  {
    name: "tshirt",
    tag: "Match & Training",
    img: "/products/tshirt/blue.jpg",
    link:"/tshirt",
    description:
      "Full kits with custom colors, numbers and sponsor logos for clubs and academies.",
    details: ["Dri-fit fabrics", "Sublimation & screen print", "Adult & youth sizing"],
  },
  {
    name: "Polo Shirts",
    tag: "Street & Teamwear",
    img: "/products/polo-shirts/brown.jpg",
    link: "/polo-shirts",
    description:
      "Heavyweight fleece hoodies with embroidery, chenille patches and puff prints.",
    details: ["320–380 GSM fleece", "Oversized & regular fits", "Zippers & pullovers"],
  },
  {
    name: "Raincoat",
    tag: "Warmups & Travel",
    img: "/products/raincoat/awhite1.jpg",
    link: "/raincoat",
    description:
      "Sharp, tapered tracksuits for travel, pre-match and lifestyle collections.",
    details: ["Poly / spandex blends", "Zipped pockets", "Contrast panels & piping"],
  },
  {
    name: "Street Raincoat",
    tag: "Joggers & Bottoms",
    img: "/products/street-raincoat/pink.jpg",
    link:"/street-raincoat",
    description:
      "Performance joggers and woven pants ready for gyms, teams and streetwear drops.",
    details: ["Rib cuffs or open hem", "Elastic waistband", "Custom labels & trims"],
  },
  {
    name: "T-Shirts",
    tag: "Essentials & Merch",
    img: "/products/tracksuit-jacket/green.jpg",
    link:"/tracksuit-jacket",
    description:
      "Premium tees for merchandise, fanwear and daily basics in multiple fits.",
    details: ["180–240 GSM cotton", "Screen & DTG print", "Oversized & boxy fits"],
  },
  {
    name: "Plain Sweatshirts",
    tag: "Game & Training",
    img: "/products/plain-sweatshirts/light-green.jpg",
    link:"/plain-sweatshirts",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "Zipped Hoodies",
    tag: "Game & Training",
    img: "/products/zipped-hoodies/orange.jpg",
    link:"/zipped-hoodies",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "UnZipped-Hoodies",
    tag: "Game & Training",
    img: "/products/unzipped-hoodies/skin.jpg",
    link:"/unzipped-hoodies",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "Lynx Cropped",
    tag: "Game & Training",
    img: "/products/lynx-cropped/black.jpg",
    link:"/lynx-cropped",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "Shorts",
    tag: "Game & Training",
    img: "/products/shorts/yellow.jpg",
    link:"/shorts",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "Road Jackets",
    tag: "Game & Training",
    img: "/products/road-jackets/red.jpg",
    link:"/road-jackets",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "snow-jackets",
    tag: "Game & Training",
    img: "/products/snow-jackets/black.jpg",
    link:"/snow-jackets",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "lynx-tracksuit-jacket",
    tag: "Game & Training",
    img: "/products/lynx-tracksuit-jacket/white.jpg",
    link:"/lynx-tracksuit-jacket",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
  {
    name: "sweatshirts",
    tag: "Game & Training",
    img: "/products/sweatshirts/black.jpg",
    link:"/sweatshirts",
    description:
      "Breathable shorts for football, running and training with full customization.",
    details: ["Mesh or interlock", "Drawcord waist", "Club crests & numbers"],
  },
];

const FeaturedProducts = () => {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const mobileItems = showAllMobile ? categories : categories.slice(0, 3);

  const Card = ( {item} ) => (
    <article
      key={item.name}
      className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-[#30318B] p-[10px] transition-transform duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]"
    >
      <div className="relative flex h-full flex-col rounded-3xl bg-[rgba(255,255,255,0.03)]">
        {/* 🔥 IMAGE TOP (with hover zoom) */}
        <div className="relative h-[470px] w-full overflow-hidden rounded-t-3xl">
          <Image
            src={item.img}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">

          {/* Icon + Title */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10">
              <Shirt className="h-5 w-5 text-orange-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-orange-300/80">
                {item.tag}
              </span>
              <h3 className="text-lg font-semibold text-slate-50">{item.name}</h3>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center justify-between pt-1">
            <Link href={`/products/${item.link}`} className="text-xs underline font-semibold text-orange-300 transition-colors duration-200 group-hover:text-orange-200">
              View product details →
            </Link>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-200/90">
              Customizable
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section className="relative z-10 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
           <div className="flex items-center border border-[#FF7A00]/30 bg-[#FF7A00]/5 my-6 w-52 font-bold gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#FF7A00]">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Product Categories
            </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#30318B] sm:text-4xl lg:text-5xl">
            Elite Products for{" "}
            <span className="text-[#FF7E23]">
              Future-Teams
            </span>
          </h2>
          <p className="mt-4 text-sm text-black sm:text-base">
            From grassroots clubs to professional brands, we manufacture full
            collections that stay consistent across seasons.
          </p>
        </div>

        {/* ✅ MOBILE (3 items + toggle) */}
        <div className="grid gap-6 md:hidden">
          {mobileItems.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </div>

        {/* ✅ DESKTOP (all items always) */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </div>

        {/* Mobile Show More / Less Button */}
        <div className="flex justify-center md:hidden">
          <button
            onClick={() => setShowAllMobile((v) => !v)}
            className="rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-orange-500/20"
          >
            {showAllMobile ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
