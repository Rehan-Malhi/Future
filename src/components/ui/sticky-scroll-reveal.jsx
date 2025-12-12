"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  // Dark futurist background + neon gradients
  const backgroundColors = [
    "#020617", // slate-950
    "#020617",
    "#020617",
    "#020617",
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #22d3ee, #6366f1)", // cyan -> indigo
    "linear-gradient(to bottom right, #ec4899, #a855f7)", // pink -> violet
    "linear-gradient(to bottom right, #38bdf8, #22c55e)", // sky -> emerald
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange -> yellow
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(
      linearGradients[activeCard % linearGradients.length]
    );
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor:
          backgroundColors[activeCard % backgroundColors.length],
      }}
      ref={ref}
      className={cn(
        // outer container
        "relative flex h-[44rem] lg:h-[40rem] items-start justify-center",
        "gap-12 lg:gap-20 overflow-y-auto rounded-3xl",
        "border border-white/5 bg-slate-950/80 p-6 sm:p-8 lg:p-12",
        "shadow-[0_40px_120px_rgba(15,23,42,0.95)] backdrop-blur-2xl"
      )}
    >
      {/* LEFT – text column */}
      <div className="relative flex-1 max-w-2xl">
        <div className="mx-auto max-w-xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-16 lg:my-20">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.25,
                  y: activeCard === index ? 0 : 10,
                }}
                transition={{ duration: 0.35 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: activeCard === index ? 0.9 : 0.3,
                  y: activeCard === index ? 0 : 8,
                }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-32" />
        </div>
      </div>

      {/* RIGHT – glowing sticky card */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-8 hidden h-72 w-[22rem] lg:h-80 lg:w-[26rem] flex-shrink-0 lg:block",
          "overflow-hidden rounded-[2rem] border border-white/10 p-[2px]",
          "shadow-[0_30px_120px_rgba(56,189,248,0.75)]"
        )}
      >
        <div className="h-full w-full rounded-[1.8rem] bg-slate-950/80">
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.div>
  );
};
