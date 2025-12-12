"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import Image from "next/image";
import { OrbitControls, useGLTF } from "@react-three/drei";
// import BrandsMarquee from "./Brands";
// import { brandLogos } from "@/data/brands";

function FootballModel(props) {
  // football.glb should be in /public
  const { scene } = useGLTF("/football.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/football.glb");

function FootballCanvas() {
  return (
    <Canvas
      className="w-full h-full rounded-full"
      camera={{ position: [1, 1, 2.6], fov: 35, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lights */}
      <ambientLight intensity={1.2} />
      <directionalLight intensity={1} position={[5, 10, 5]} />
      <directionalLight intensity={0.8} color="#22d3ee" position={[-3, -5, -4]} />

      <Suspense fallback={null}>
        <FootballModel scale={[1, 1, 1]} />
      </Suspense>

      {/* Controls – rotate only */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}

export default function HeroFutureStar() {
  return (
    <>
      {/* background: radial-gradient(circle at top, #04293a 0%, #020617 45%, #000 100%); */}
      <section className="h-[70vh] flex items-center justify-center px-5 md:px-8 text-slate-50">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* LEFT SIDE */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/40 bg-gradient-to-r from-slate-900/80 to-sky-900/70 text-[11px] tracking-[0.18em] uppercase text-sky-100 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              Future-Built Garment Manufacturing
            </div>
            <Image
              src="/logo1.png"
              alt="Future Star Logo"
              width={300}
              height={300}
              className="bg-transparent m-6"
            />


            <p className="text-[15px] md:text-[16px] leading-relaxed text-slate-200/90 mb-5">
              Crafting tomorrow’s sportswear today. From pro-grade football kits to
              performance jerseys, we fuse precision stitching with next-gen
              production and quality control.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-100 mb-6">
              <li>
                <span className="text-sky-400 mr-1.5">⚙️</span>
                AI-assisted production workflow
              </li>
              <li>
                <span className="text-sky-400 mr-1.5">🧵</span>
                Export-quality materials &amp; stitching
              </li>
              <li>
                <span className="text-sky-400 mr-1.5">🚀</span>
                3D mockups for every order
              </li>
              <li>
                <span className="text-sky-400 mr-1.5">🌍</span>
                Global shipping &amp; scalable capacity
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="px-6 py-2.5 rounded-full text-md font-semibold bg-[#FF7A00] text-{#FFFFFF} hover:bg-[#e56e00] hover:shadow-[0_0_18px_rgba(255,122,0,0.45)] cursor-pointer hover:scale-[1.02]">
                Get a Quote →
              </Link>
              <Link href="/products" className="px-6 py-2.5 rounded-full text-sm font-semibold border border-slate-500/70 text-slate-100 bg-transparent hover:bg-slate-900/70 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.6)] transition">
                View Products
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE – 3D BALL */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 0%, transparent 70%)",
                maskImage:
                  "radial-gradient(circle at center, black 0%, transparent 70%)",
              }}
            />

            {/* Orbital ring */}
            <div className="pointer-events-none absolute w-2 h-2 rounded-full border border-dashed border-slate-400/50 -rotate-[18deg] opacity-60" />

            {/* Ball wrapper */}
            {/* Responsive Ball Wrapper */}
            <div
              className="relative aspect-square flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,#020617,#020617_40%,#000_100%)] shadow-[0_0_40px_rgba(34,211,238,0.4),0_0_160px_rgba(59,130,246,0.25)] overflow-hidden w-[40vw] sm:w-[50vw] md:w-[70%] lg:w-[360px] xl:w-[380px]">
              {/* Glow */}
              <div className="pointer-events-none absolute w-56 h-56 rounded-full bg-[radial-gradient(circle_at_center,#0ea5e9,transparent_60%)] opacity-40 blur-md animate-[glow_4s_ease-in-out_infinite]" />

              {/* 3D Canvas */}
              <div className="w-full h-full rounded-full overflow-hidden">
                <FootballCanvas />
              </div>

              {/* Shadow */}
              <div className="pointer-events-none absolute bottom-[-22px] w-40 h-6 rounded-full bg-[radial-gradient(circle_at_center,#22d3ee55,transparent_70%)] blur-md opacity-80" />

              {/* Tag */}
              <div className="pointer-events-none absolute -bottom-14 right-0 px-3 py-1.5 rounded-full border border-slate-200/40 bg-gradient-to-br from-slate-900/90 to-slate-900/70 text-[10px] tracking-[0.18em] uppercase text-slate-100 flex items-center gap-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />
                3D Interactive Model
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="pt-2 flex flex-col mb-8 mt-32 lg:mt-0 lg:mb-8 lg:flex-row items-center justify-center w-full gap-24">
        <h1 className="text-xl lg:text-2xl mb-4 text-white">✨ Trusted By 100+ Brands</h1>
        <h1 className="text-xl lg:text-2xl mb-4 text-white">⭐ Fast Sampling: 5–7 Days</h1>
        <h1 className="text-xl lg:text-2xl mb-4 text-white">⭐ Over 1,500+ Products Delivered</h1>
      </div>
    </>
  );
}
