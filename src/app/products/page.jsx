"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PRODUCT_GROUPS = [
  {
    id: "football-kits",
    label: "Football Kits",
    products: [
      {
        id: "FB-101",
        name: "Elite Match Kit",
        article: "FS-FB-101",
        description:
          "Pro-grade football kit with breathable mesh, sublimated graphics and customized name/number prints.",
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
        image: "/products/fake.jpg",
      },
      {
        id: "FB-102",
        name: "Training Kit",
        article: "FS-FB-102",
        description:
          "Lightweight training set ideal for academies and clubs, available in full custom colorways.",
        sizes: ["S", "M", "L", "XL"],
        image: "/products/football-kit-2.jpg",
      },
    ],
  },
  {
    id: "hoodies",
    label: "Hoodies",
    products: [
      {
        id: "HD-201",
        name: "Heavyweight Fleece Hoodie",
        article: "FS-HD-201",
        description:
          "Oversized fleece hoodie with ribbed cuffs, kangaroo pocket and options for embroidery or puff print.",
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        image: "/products/hoodie-1.jpg",
      },
      {
        id: "HD-202",
        name: "Team Travel Hoodie",
        article: "FS-HD-202",
        description:
          "Clean travel hoodie built for teams on the move, matching perfectly with joggers and tracksuits.",
        sizes: ["S", "M", "L", "XL", "2XL"],
        image: "/products/hoodie-2.jpg",
      },
    ],
  },
  {
    id: "tracksuits",
    label: "Tracksuits",
    products: [
      {
        id: "TS-301",
        name: "Tapered Tracksuit",
        article: "FS-TS-301",
        description:
          "Sharp, tapered tracksuit with contrast side panels and zipped pockets, ideal for pre-match and travel.",
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
        image: "/products/tracksuit-1.jpg",
      },
    ],
  },
];

export default function ProductsPage() {
  const [selectedGroupId, setSelectedGroupId] = useState(
    PRODUCT_GROUPS[0]?.id
  );

  const currentGroup = useMemo(
    () =>
      PRODUCT_GROUPS.find((g) => g.id === selectedGroupId) ?? PRODUCT_GROUPS[0],
    [selectedGroupId]
  );

  // null = All Articles
  const [selectedProductId, setSelectedProductId] = useState(null);

  const currentProduct = useMemo(() => {
    if (!currentGroup || !selectedProductId) return undefined;
    return (
      currentGroup.products.find((p) => p.id === selectedProductId) ||
      currentGroup.products[0]
    );
  }, [currentGroup, selectedProductId]);

  const detailRef = useRef(null);

  // 🔍 zoom state
  const imageWrapperRef = useRef(null);
  const [zoom, setZoom] = useState({
    active: false,
    x: 50,
    y: 50,
  });

  const handleImageMouseEnter = () => {
    setZoom((z) => ({ ...z, active: true }));
  };

  const handleImageMouseLeave = () => {
    setZoom((z) => ({ ...z, active: false }));
  };

  const handleImageMouseMove = (e) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoom((z) => ({
      ...z,
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    }));
  };

  const handleGroupChange = (e) => {
    const newGroupId = e.target.value;
    setSelectedGroupId(newGroupId);
    setSelectedProductId(null); // back to All Articles for new group
  };

  const scrollToDetail = () => {
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectProductFromList = (productId) => {
    setSelectedProductId(productId);
    scrollToDetail();
  };

  const handleCardClick = (productId) => {
    setSelectedProductId(productId);
    scrollToDetail();
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black py-10 px-4 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00]">
              Product Catalogue
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Explore{" "}
              <span className="bg-[#FF7A00] bg-clip-text text-transparent">
                Future Star
              </span>{" "}
              Products
            </h1>
            <p className="mt-2 text-sm text-slate-300/80">
              Select a product type from the sidebar to view all available
              articles. Click any product card to see full specs and sizes,
              ready for your next kit drop.
            </p>
          </div>
        </header>

        {/* Layout: Sidebar + Main */}
        <div className="grid gap-6 lg:grid-cols-[280px,minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_0_26px_rgba(0,0,0,0.75)]">
            {/* Brand dropdown */}
            <div className="mb-6">
              <label
                htmlFor="product-group-select"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#FFAE42]"
              >
                Choose Category
              </label>

              <div className="relative group">
                <select
                  id="product-group-select"
                  value={selectedGroupId}
                  onChange={handleGroupChange}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 outline-none transition-all focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/50 hover:border-[#FF7A00]/60"
                >
                  {PRODUCT_GROUPS.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.label}
                    </option>
                  ))}
                </select>

                {/* Chevron */}
                <span className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-[#FFAE42] transition-all group-hover:border-[#FF7A00]" />
              </div>
            </div>

            {/* Product list */}
            <div className="mt-4">
              {/* Label */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.20em] text-[#FFAE42]">
                Available Articles
              </p>

              <div className="relative">
                <select
                  value={selectedProductId ?? ""}
                  onChange={(e) =>
                    e.target.value === ""
                      ? setSelectedProductId(null)
                      : setSelectedProductId(e.target.value)
                  }
                  className="
        w-full appearance-none rounded-xl 
        border border-slate-700 
        bg-slate-950/80 
        px-4 py-3 
        text-sm text-slate-200 
        shadow-[0_0_18px_rgba(0,0,0,0.55)] 
        outline-none transition 
        focus:border-[#FF7A00] 
        focus:ring-1 focus:ring-[#FF7A00]
      "
                >
                  {/* ALL ARTICLES OPTION */}
                  <option value="">
                    🔥 All Articles ({currentGroup?.products.length})
                  </option>

                  {/* Individual article options */}
                  {currentGroup?.products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.article} — {product.name}
                    </option>
                  ))}
                </select>

                {/* Custom dropdown icon */}
                <span
                  className="
        pointer-events-none absolute right-4 top-1/2 
        -translate-y-1/2 
        h-2.5 w-2.5 rotate-45 
        border-b-2 border-r-2 
        border-[#FFAE42]
      "
                />
              </div>

              {/* Info text */}
              <p className="mt-2 text-[11px] text-slate-400 tracking-wide">
                Choose an article to view full details.
              </p>
            </div>

          </aside>

          {/* Main content */}
          <main className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-[0_0_26px_rgba(0,0,0,0.8)] sm:p-6 lg:p-7">
            {/* Product detail (when one is selected) */}
            <div
              ref={detailRef}
              className="mb-12 sm:mb-16 lg:mb-20" // extra vertical space
            >
              {currentProduct ? (
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                  {/* Product image */}
                  <div className="flex-shrink-0">
                    <div
                      ref={imageWrapperRef}
                      onMouseEnter={handleImageMouseEnter}
                      onMouseLeave={handleImageMouseLeave}
                      onMouseMove={handleImageMouseMove}
                      className="relative flex aspect-[4/5] w-[230px] cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl bg-slate-900/70 shadow-[0_0_30px_rgba(255,122,0,0.35)] lg:w-[300px]"
                    >
                      {/* Base image */}
                      <Image
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        fill
                        className="object-cover"
                      />

                      {/* Zoom overlay on top of image */}
                      {zoom.active && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="h-[100%] w-[100%] overflow-hidden rounded-2xl border border-[#FFAE42]/70 bg-slate-900/80 shadow-[0_0_26px_rgba(255,122,0,0.9)]">
                            <div
                              className="h-full w-full"
                              style={{
                                backgroundImage: `url(${currentProduct.image})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "220%", // zoom strength
                                backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Bottom info strip (same as before) */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFAE42]">
                          Feature Article
                        </p>
                        <p className="text-sm text-slate-50">{currentProduct.name}</p>
                      </div>
                    </div>
                  </div>


                  {/* Product details */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFAE42]">
                        {currentGroup?.label}
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold text-white">
                        {currentProduct.name}
                      </h2>
                      <p className="mt-1 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                        Article No: {currentProduct.article}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-100">
                        Product Description
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300/90">
                        {currentProduct.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-100">
                        Available Sizes
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {currentProduct.sizes.map((size) => (
                          <span
                            key={size}
                            className="inline-flex items-center justify-center rounded-full border border-[#FF7A00]/70 bg-[#FF7A00]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#FFB444]"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link href="/contact" className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[radial-gradient(circle_at_top_left,#FF7A00,#FFB444)] px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_26px_rgba(255,122,0,0.8)] transition hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,122,0,1)]">
                        Request Quote for this Article
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mb-8 text-sm text-slate-300/80">
                  Browse the grid below and click any article to view full
                  details and size breakdown.
                </p>
              )}
            </div>

            {/* Grid of all products in current group */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  All {currentGroup?.label}
                </h3>
                <p className="text-xs text-slate-400">
                  Taller cards show more visuals and key info at a glance.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {currentGroup?.products.map((product) => {
                  const isActive = currentProduct?.id === product.id;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleCardClick(product.id)}
                      className={
                        "group flex min-h-[260px] flex-col overflow-hidden rounded-2xl border bg-slate-950/80 text-left shadow-[0_0_22px_rgba(0,0,0,0.7)] transition " +
                        (isActive
                          ? "border-[#FF7A00]/80 shadow-[0_0_30px_rgba(255,122,0,0.65)]"
                          : "border-slate-800 hover:border-[#FF7A00]/70 hover:shadow-[0_0_26px_rgba(255,122,0,0.55)]")
                      }
                    >
                      <div className="relative h-52 w-full overflow-hidden sm:h-56">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 pb-3 pt-8">
                          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#FFAE42]">
                            {product.article}
                          </p>
                          <p className="text-sm font-semibold text-slate-50">
                            {product.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-2 px-3 py-3">
                        <p className="line-clamp-3 text-xs text-slate-300/90">
                          {product.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.slice(0, 4).map((size) => (
                              <span
                                key={size}
                                className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-300"
                              >
                                {size}
                              </span>
                            ))}
                            {product.sizes.length > 4 && (
                              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-400">
                                +{product.sizes.length - 4} more
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFAE42]">
                            View
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {!currentGroup?.products.length && (
                  <p className="text-sm text-slate-400">
                    No products added in this category yet.
                  </p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
