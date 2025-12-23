"use client";
import Image from "next/image";
export default function WhyChooseUs() {
  return (
    <section className="w-full lg:py-16 text-slate-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-[#30318B]">
            Why choose us?
          </h2>

          <p className="text-black leading-relaxed mb-8 max-w-md">
            We specialize in manufacturing high-performance sportswear and equipment for clubs, academies, and private labels. Our process is designed to handle custom designs, bulk orders, and strict quality standards—so your products perform on and off the field.
          </p>

          {/* IMAGE */}
          <div className="rounded-xl h-[250px] lg:h-[525px] shadow-xl border border-white/10">
            <Image
              src="/why-choose.png" // replace with real image
              width={390}
              height={300}
              alt="Future Star Team"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT SIDE — 4 CARDS */}
        <div className="grid grid-cols-1 gap-5 max-w-lg">

          {/* Card 1 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-xl text-[#FF7E23] mb-2 flex items-center gap-2">
              Precision Sportswear Manufacturing
            </h3>
            <p className="text-black text-sm leading-relaxed">
              Export-grade jerseys, kits, and training apparel produced with advanced stitching, durable fabrics, and exact color matching for long-lasting performance.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-xl text-[#FF7E23] mb-2 flex items-center gap-2">
              Fast Sampling & Prototyping
            </h3>
            <p className="text-black text-sm leading-relaxed">
              3D mockups and physical samples delivered in 5–7 days, helping teams and brands approve designs quickly and launch faster.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-xl text-[#FF7E23] mb-2 flex items-center gap-2">
              Strict Quality Control
            </h3>
            <p className="text-black text-sm leading-relaxed">
              Multi-stage QC on stitching, sizing, printing, and durability—ensuring every jersey, ball, or garment meets professional standards.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-xl text-[#FF7E23] mb-2 flex items-center gap-2">
              Global Production & Fulfillment
            </h3>
            <p className="text-black text-sm leading-relaxed">
              Worldwide shipping, scalable production capacity, and transparent communication from order confirmation to final delivery.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
