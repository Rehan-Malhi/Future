"use client";

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 text-slate-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">
        
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-orange-400">
            Why choose us?
          </h2>

          <p className="text-slate-300 leading-relaxed mb-8 max-w-md">
            Built for apparel brands that demand quality, efficiency, and 
            reliability. We streamline your production from sampling 
            to shipping — while maintaining export-grade standards.
          </p>

          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden shadow-xl border border-white/10">
            <img
              src="/why.PNG" // replace with real image
              alt="Future Star Team"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE — 4 CARDS */}
        <div className="grid grid-cols-1 gap-5 max-w-lg">
          
          {/* Card 1 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span className="text-cyan-400 text-xl">⚙️</span>
              Precision Manufacturing
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Export-grade sportswear stitched with micron-level accuracy using 
              advanced machinery and automated workflows.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span className="text-cyan-400 text-xl">⚡</span>
              Fast Prototyping
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              3D mockups & rapid sampling (3–5 days) so your brand moves 
              faster than competitors.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span className="text-cyan-400 text-xl">🔒</span>
              Quality-Controlled Production
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every item undergoes multi-stage QC checks to ensure durability, 
              color accuracy, and perfect finishing.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span className="text-cyan-400 text-xl">🌍</span>
              Global Fulfillment Support
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transparent tracking, worldwide shipping, and end-to-end 
              communication throughout production.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
