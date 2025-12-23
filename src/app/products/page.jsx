"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PRODUCT_CATEGORIES } from "@/data/product-categories";

export default function ProductsPage() {
  const [firestoreProducts, setFirestoreProducts] = useState([]);

  /* ===============================
     🔥 FETCH FIRESTORE PRODUCTS
     =============================== */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const rows = snap.docs.map((d) => ({
        id: d.data().slug || d.id,
        category: d.data().category,
        heroImage: d.data().image,
        imgFit: "cover",
        imgPos: "center",
      }));
      setFirestoreProducts(rows);
    });

    return () => unsub();
  }, []);

  /* ===============================
     🧠 MERGE LOCAL + FIRESTORE
     =============================== */
  const ALL_PRODUCTS = useMemo(() => {
    return [...PRODUCT_CATEGORIES, ...firestoreProducts];
  }, [firestoreProducts]);

  /* ===============================
     🧠 CATEGORY LIST
     =============================== */
  const categories = useMemo(() => {
    const unique = Array.from(new Set(ALL_PRODUCTS.map((x) => x.category)));
    return ["All", ...unique];
  }, [ALL_PRODUCTS]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCards = useMemo(() => {
    if (activeCategory === "All") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((x) => x.category === activeCategory);
  }, [activeCategory, ALL_PRODUCTS]);

  /* ===============================
     🧩 UI (UNCHANGED)
     =============================== */
  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex w-fit items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF7A00]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
            Product Catalogue
          </div>

          <h1 className="mt-3 text-3xl font-semibold text-[#30318B] sm:text-4xl">
            Explore{" "}
            <span className="bg-[#FF7A00] bg-clip-text text-transparent">
              Future Star
            </span>{" "}
            Products
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-black">
            Manufacturer catalogue. Click any variant to open the product detail
            page.
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-6 flex items-center gap-3">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#30318B]">
            Category
          </label>
          <div className="relative">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-[220px] appearance-none rounded-xl border border-[#30318B]/25 bg-white px-4 py-2.5 text-sm text-[#30318B] outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/25"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-[#FF7A00]" />
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {filteredCards.map((card) => (
            <div key={card.id} className="flex flex-col gap-3">
              <article className="group relative overflow-hidden rounded-3xl border border-orange-500/15 bg-[#30318B] px-[5px] pt-[5px] transition-transform duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                <div className="relative flex h-full flex-col rounded-3xl bg-[rgba(255,255,255,0.03)] overflow-hidden">
                  <Link
                    href={`/products/${card.id}`}
                    className={[
                      "relative block w-full overflow-hidden rounded-t-3xl",
                      card.imgHeightClass ??
                        "h-[200px] sm:h-[420px] lg:h-[520px]",
                    ].join(" ")}
                  >
                    <Image
                      src={card.heroImage}
                      alt={card.category}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="transition-transform duration-500 group-hover:scale-110"
                      style={{
                        objectFit: card.imgFit ?? "cover",
                        objectPosition: card.imgPos ?? "center",
                      }}
                    />
                  </Link>

                  <div className="flex justify-between px-5 py-5 sm:px-6">
                    <p className="text-[9px] lg:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
                      {card.category}
                    </p>
                    <Link
                      href={`/products/${card.id}`}
                      className="text-[9px] underline lg:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFAE42]"
                    >
                      view all
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}

          {!filteredCards.length && (
            <div className="col-span-full rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-slate-200">
              No products found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
