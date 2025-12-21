"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-2 border-t border-[#FF7A00]/25 bg-[#30318B]">
      {/* top brand glow line */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand + tagline */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-extrabold tracking-tight"
            >
              <span className="text-slate-100">Future</span>
              <span className="ml-1 bg-[#FF7A00] bg-clip-text text-transparent">
                Star
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-300/80">
              Future-built sportswear manufacturing for clubs, brands and teams
              worldwide — from first tech pack to final packed carton.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Future Star on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 text-[#FFB444] shadow-[0_0_18px_rgba(255,122,0,0.5)] transition hover:bg-[#FF7A00] hover:text-slate-950 hover:shadow-[0_0_26px_rgba(255,122,0,0.9)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Future Star on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/50 bg-slate-900 text-slate-200 transition hover:border-[#FF7A00] hover:text-[#FFB444] hover:shadow-[0_0_18px_rgba(255,122,0,0.6)]"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Future Star on Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/50 bg-slate-900 text-slate-200 transition hover:border-[#FF7A00] hover:text-[#FFB444] hover:shadow-[0_0_18px_rgba(255,122,0,0.6)]"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@futurestarfactory.com"
                aria-label="Email Future Star"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/50 bg-slate-900 text-slate-200 transition hover:border-[#FF7A00] hover:text-[#FFB444] hover:shadow-[0_0_18px_rgba(255,122,0,0.6)]"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/000000000000"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Future Star"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/50 bg-slate-900 text-slate-200 transition hover:border-[#FF7A00] hover:text-[#FFB444] hover:shadow-[0_0_22px_rgba(255,122,0,0.75)]"
              >
                <PhoneCall className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid flex-1 grid-cols-1 gap-8 text-sm text-slate-300/80 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Navigation
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="transition hover:text-[#FF7A00]"
                  >
                    About Future Star
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="transition hover:text-[#FF7A00]"
                  >
                    Product Range
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#factory-moments"
                    className="transition hover:text-[#FF7A00]"
                  >
                    Factory Moments
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Manufacturing
              </h4>
              <ul className="mt-3 space-y-2">
                <li>Custom Football Kits</li>
                <li>Tracksuits &amp; Hoodies</li>
                <li>MOQ &amp; Bulk Production</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Contact
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <span className="text-slate-400">Email: </span>
                  <a
                    href="mailto:hello@futurestarfactory.com"
                    className="transition hover:text-[#FF7A00]"
                  >
                    hello@futurestarfactory.com
                  </a>
                </li>
                <li>
                  <span className="text-slate-400">WhatsApp: </span>
                  <a
                    href="https://wa.me/000000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-[#FF7A00]"
                  >
                    +00 000 0000000
                  </a>
                </li>
                <li className="text-slate-400">
                  Mon–Sat · 10:00–19:00 (PKT)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-800/80 pt-4 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Future Star Manufacturing. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="transition hover:text-[#FF7A00]"
            >
              Privacy Policy
            </Link>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:inline-block" />
            <Link
              href="/terms"
              className="hidden text-slate-400 transition hover:text-[#FF7A00] sm:inline-block"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
