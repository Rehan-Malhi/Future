"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // ✅ Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full">
      {/* Glass navbar */}
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-[#30318B] px-5 py-3 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.25)]">

        {/* Brand */}
        <Link href="/" className="text-xl bg-white p-1 font-extrabold tracking-tight">
          <Image
            src="/logo.png"
            alt="Future Star Logo"
            width={40}
            height={40}
            className="bg-transparent"
          />
        </Link>

        {/* Brand + Flags */}
        <div className="flex items-center gap-4">
          {/* Country Flags */}
          <div className="hidden items-center gap-3 md:flex">
            {[
              { src: "/flags/uk.png", label: "United Kingdom" },
              { src: "/flags/netherlands.png", label: "Netherlands" },
              { src: "/flags/spain.png", label: "Spain" },
              { src: "/flags/us.png", label: "United States" },
            ].map((flag) => (
              <div key={flag.label} className="relative group">
                <Image src={flag.src} alt={flag.label} width={32} height={32} />
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-medium text-slate-100 opacity-0 translate-y-1 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {flag.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 text-sm font-semibold text-slate-200 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative py-1 transition ${
                  isActive(item.href)
                    ? "text-orange-400"
                    : "text-slate-200 hover:text-orange-300"
                }`}
              >
                {item.label}

                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-orange-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-slate-100 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <XMarkIcon className="h-8 w-8 rotate-90 transition-transform duration-200" />
          ) : (
            <Bars3Icon className="h-8 w-8 transition-transform duration-200" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="mx-5 mt-2 rounded-2xl border border-white/10 bg-[#30318B] p-4 text-slate-100 backdrop-blur-xl shadow-[0_0_18px_rgba(34,211,238,0.2)] md:hidden">
          <ul className="flex flex-col gap-3 text-base font-semibold">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-full px-3 py-2 transition ${
                    isActive(item.href)
                      ? "bg-white/10 text-[#FF7E23]"
                      : "hover:bg-white/10 hover:text-cyan-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
