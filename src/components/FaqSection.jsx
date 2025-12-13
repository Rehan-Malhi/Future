"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What products does Future Star manufacture?",
    a: "We manufacture full sportswear ranges including football kits, hoodies, jerseys, tracksuits, compression wear, shorts and custom team apparel for global brands.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "For most products the MOQ is 30–50 pieces per design. For special materials or custom accessories, MOQs may vary depending on fabric and trims.",
  },
  {
    q: "How long does production take?",
    a: "Sampling takes 5–7 days and bulk production takes 12–20 days depending on complexity and quantity. Rush orders may be accepted during low-load weeks.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We deliver worldwide using DHL, FedEx, Skynet, and sea cargo for large shipments. Tracking is provided for every order.",
  },
  {
    q: "Do you offer custom branding?",
    a: "Yes. We support embroidery, screen printing, sublimation, puff print, silicone heat transfer, woven labels, custom neck tags and packaging.",
  },
  {
    q: "How do I place an order?",
    a: "Simply share your design or references on WhatsApp/email. We prepare your tech pack, 3D mockup, and start the sampling process after confirmation.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="relative z-10 bg-transparent py-20">
      {/* Brand Top Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent" />

      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="inline-flex items-center rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Frequently Asked{" "}
            <span className="bg-[#FF7A00] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-3 text-slate-300/85 text-sm sm:text-base">
            Everything you need to know before placing your next custom apparel order.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.55)] transition hover:border-[#FF7A00]/60"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-100 font-semibold hover:text-[#FF7A00] transition"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#FFAE42] transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-4 pt-1 text-slate-300/85 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
