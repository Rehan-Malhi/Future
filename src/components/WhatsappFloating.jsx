"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';

const CTAs = [
  "Need help? Chat with us!",
  "Get pricing for your product.",
  "Want a sample? Message us!",
  "Custom football kits available!",
  "Bulk orders? Let's talk!",
];

export default function WhatsappFloating() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimeout;
    let hideTimeout;

    const cycle = () => {
      // Show CTA
      setVisible(true);

      // Hide after 5s
      hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 5000);

      // Move to next CTA after 5s + 3s = 8s
      showTimeout = setTimeout(() => {
        setIndex((i) => (i + 1) % CTAs.length);
        cycle();
      }, 8000);
    };

    cycle();

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[9999] flex flex-col items-start gap-2">

      {/* CTA Bubble */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 10, y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="self-end mb-1 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.4)] text-black text-sm font-medium max-w-[220px]">
            {CTAs[index]}
          </motion.div>

        )}
      </AnimatePresence>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/+923361809809"
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(52,211,153,0.8)] hover:shadow-[0_0_30px_rgba(52,211,153,1)] transition cursor-pointer">
        <FaWhatsapp className="w-12 h-12 lg:h-24 lg:w-24 text-white" />
      </a>
    </div>
  );
}
