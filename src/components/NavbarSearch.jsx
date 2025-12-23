"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { PRODUCT_CATEGORIES } from "@/data/product-categories";

export default function NavbarSearch() {
    const router = useRouter();
    const ref = useRef(null);
    const inputRef = useRef(null);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // ✅ NEW: mobile inline open/close
    const [mobileExpanded, setMobileExpanded] = useState(false);

    const results =
        query.length > 0
            ? PRODUCT_CATEGORIES.filter((item) =>
                item.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 7)
            : [];

    // Highlight matched letters
    function highlight(text, q) {
        if (!q) return text;
        const regex = new RegExp(`(${q})`, "ig");
        return text.split(regex).map((part, i) =>
            part.toLowerCase() === q.toLowerCase() ? (
                <span key={i} className="text-orange-400">
                    {part}
                </span>
            ) : (
                part
            )
        );
    }

    function go(item) {
        setQuery("");
        setOpen(false);
        setActiveIndex(0);
        setMobileExpanded(false);
        router.push(`/products/${item.id}`);
    }

    // Keyboard navigation
    function handleKey(e) {
        if (!open || results.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % results.length);
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + results.length) % results.length);
        }
        if (e.key === "Enter" && results[activeIndex]) {
            e.preventDefault();
            go(results[activeIndex]);
        }

        if (e.key === "Escape") {
            setOpen(false);
            setMobileExpanded(false);
        }
    }

    // Close on outside click
    useEffect(() => {
        function close(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setMobileExpanded(false);
            }
        }
        document.addEventListener("mousedown", close);
        document.addEventListener("touchstart", close);
        return () => {
            document.removeEventListener("mousedown", close);
            document.removeEventListener("touchstart", close);
        };
    }, []);

    // Auto focus when mobile opens
    useEffect(() => {
        if (mobileExpanded) {
            setTimeout(() => inputRef.current?.focus(), 120);
        }
    }, [mobileExpanded]);

    return (
        <div
            ref={ref}
            className="relative flex items-center"
            onKeyDown={handleKey}
        >
            {/* ================= DESKTOP (same as before) ================= */}
            <div className="hidden md:block w-[280px]">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 backdrop-blur-md">
                    <FiSearch className="text-slate-400" />
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                            setActiveIndex(0);
                        }}
                        placeholder="Search products…"
                        className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
                    />
                </div>

                {open && results.length > 0 && (
                    <div className="absolute top-full mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#30318B] shadow-[0_0_25px_rgba(34,211,238,0.25)]">
                        {results.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => go(item)}
                                className={`group flex w-full items-center gap-3 px-3 py-2 text-left transition-all duration-200 ${i === activeIndex
                                        ? "bg-white/15"
                                        : "hover:bg-white/10 hover:pl-4"
                                    }`}
                            >
                                <Image
                                    src={item.heroImage}
                                    alt={item.category}
                                    width={42}
                                    height={42}
                                    className="rounded-lg object-cover transition group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(255,122,0,0.5)]"
                                />
                                <span className="text-sm font-medium text-slate-100">
                                    {highlight(item.category, query)}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= MOBILE INLINE EXPAND ================= */}
            <div className="md:hidden flex items-center">
                {/* Search icon (when closed) */}
                {!mobileExpanded && (
                    <button
                        onClick={() => {
                            setMobileExpanded(true);
                            setOpen(query.length > 0);
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-slate-100 transition hover:bg-white/10"
                        aria-label="Open search"
                    >
                        <FiSearch size={18} />
                    </button>
                )}

                {/* Animated expanding input (same width as desktop) */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${mobileExpanded ? "w-[280px] ml-2 opacity-100" : "w-0 opacity-0"
                        }`}
                >
                    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 backdrop-blur-md">
                        <FiSearch className="text-slate-400" />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setOpen(true);
                                setActiveIndex(0);
                            }}
                            placeholder="Search products…"
                            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
                        />

                        {/* Cute close icon */}
                        <button
                            onClick={() => {
                                setMobileExpanded(false);
                                setOpen(false);
                                setQuery("");
                                setActiveIndex(0);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-200 transition hover:bg-white/10"
                            aria-label="Close search"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown suggestions (only when expanded) */}
                {mobileExpanded && open && results.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#30318B] shadow-[0_0_25px_rgba(34,211,238,0.25)]">
                        {results.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => go(item)}
                                className={`group flex w-full items-center gap-3 px-3 py-2 text-left transition-all duration-200 ${i === activeIndex ? "bg-white/15" : "hover:bg-white/10"
                                    }`}
                            >
                                <Image
                                    src={item.heroImage}
                                    alt={item.category}
                                    width={42}
                                    height={42}
                                    className="rounded-lg object-cover transition group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(255,122,0,0.5)]"
                                />
                                <span className="text-sm font-medium text-slate-100">
                                    {highlight(item.category, query)}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
