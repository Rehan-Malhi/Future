"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { RxCross2 } from "react-icons/rx";
import { notFound, useParams } from "next/navigation";
import { Plus } from "lucide-react";

import { PRODUCTS } from "@/data/products"; // ✅ local first
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductSlugPage() {
  const params = useParams();
  const slug = String(params?.slug || "");

  const localProduct = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);

  const [product, setProduct] = useState(localProduct || null);
  const [loading, setLoading] = useState(!localProduct); // if local found, no loading
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(localProduct?.image || "");

  useEffect(() => {
    // ✅ If local product exists, do nothing
    if (localProduct) return;

    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const snap = await getDoc(doc(db, "products", slug));
        if (!snap.exists()) {
          if (alive) setProduct(null);
          return;
        }
        const p = snap.data();
        if (!alive) return;
        setProduct(p);
        setSelectedImage(p?.image || "");
      } catch (e) {
        console.error(e);
        if (alive) setProduct(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug, localProduct]);

  if (!loading && !product) return notFound();

  const thumbs =
    product?.thumbnails?.length ? product.thumbnails : product?.image ? [product.image] : [];

  const safeSelected = selectedImage || product?.image || "/placeholder.png";

  // ✅ BELOW THIS: keep your UI EXACTLY same (I’m not changing it)
  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-sm">
          <Link href="/products" className="text-black hover:underline">
            Products
          </Link>
          <span className="mx-2 text-black/50">/</span>
          <span className="font-semibold text-[#30318B]">{product?.title}</span>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-full lg:w-[480px] lg:flex-shrink-0">
            <div className="group relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={safeSelected}
                  alt={product?.title || "Product"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100"
                aria-label="Zoom image"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-sm">
                  <Plus className="h-6 w-6 text-[#30318B]" />
                </span>
              </button>
            </div>
          </div>

          <aside className="w-full space-y-6">
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70">
                {product?.categoryName || product?.category || ""}
              </p>

              <h1 className="mt-2 text-2xl font-semibold text-[#30318B] sm:text-3xl">
                {product?.title}
              </h1>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black">
                Variants
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {thumbs.map((src) => {
                  const isActive = src === safeSelected;
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setSelectedImage(src)}
                      className={[
                        "relative h-18 w-18 overflow-hidden rounded-xl border bg-white transition",
                        isActive
                          ? "border-[#FF7E23] ring-2 ring-[#FF7E23]/20"
                          : "border-black/10 hover:border-[#FF7E23]/60",
                      ].join(" ")}
                      aria-label="Select variant image"
                    >
                      <Image src={src} alt="Variant thumbnail" fill className="object-contain" sizes="104px" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <h2 className="text-4xl font-semibold text-[#FF7E23]">
                Technical Specifications
              </h2>

              <div className="mt-4 space-y-4">
                {(product?.highlights || []).map((item, i) => (
                  <div
                    key={`${item.heading}-${i}`}
                    className="border-b text-3xl border-black/10 pb-4 text-2xl last:border-b-0 last:pb-0"
                  >
                    <h3 className="text-3xl font-semibold text-[#30318B]">{item.heading}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-black">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA unchanged */}
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black">
                Ready to manufacture?
              </p>

              <Link
                href="/contact"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#FF7E23] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
              >
                Get Quote
              </Link>

              <p className="mt-3 text-xs text-black/70">
                Share your quantity, sizes, logos and colorway. We’ll reply with timeline and pricing.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* LIGHTBOX unchanged */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="flex h-full items-center justify-center px-4 py-10">
              <motion.div
                className="relative w-full max-w-4xl"
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close image"
                  className="
                    absolute top-4 right-4 z-10
                    flex h-12 w-12 items-center justify-center
                    rounded-full bg-white shadow-xl
                    transition hover:scale-110 hover:bg-[#FF7E23] group
                  "
                >
                  <RxCross2 className="h-7 w-7 text-black group-hover:text-white" />
                </button>

                <motion.div
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 140 || info.velocity.y > 900) setLightboxOpen(false);
                  }}
                  className="relative overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10"
                >
                  <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={4}
                    centerOnInit
                    doubleClick={{ disabled: true }}
                    wheel={{ step: 0.12 }}
                    pinch={{ step: 5 }}
                    panning={{ velocityDisabled: true }}
                  >
                    <TransformComponent wrapperClass="!w-full" contentClass="!w-full">
                      <div className="relative mx-auto w-full max-w-4xl">
                        <div className="relative aspect-[4/5] w-full">
                          <Image
                            src={safeSelected}
                            alt={product?.title || "Product"}
                            fill
                            className="object-contain select-none"
                            sizes="100vw"
                            priority
                            draggable={false}
                          />
                        </div>
                      </div>
                    </TransformComponent>
                  </TransformWrapper>

                  <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white/90">
                    Pinch to zoom • Drag down to close
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
