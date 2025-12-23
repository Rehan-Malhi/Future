"use client";

import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/Firebase";
import { ImagePlus, Images, PlusCircle } from "lucide-react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    slug: "",
    category: "",
    title: "",
    highlights: [{ heading: "", description: "" }],
  });

  async function uploadToCloudinary(file) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();
    return data.secure_url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const mainImageFile = e.target.mainImage.files[0];
      const mainImageUrl = await uploadToCloudinary(mainImageFile);

      const thumbFiles = Array.from(e.target.thumbnails.files);
      const thumbUrls = await Promise.all(thumbFiles.map(uploadToCloudinary));

      await setDoc(doc(db, "products", form.slug), {
        slug: form.slug,
        category: form.category,
        title: form.title,
        image: mainImageUrl,
        thumbnails: thumbUrls,
        highlights: form.highlights,
        createdAt: serverTimestamp(),
      });

      alert("Product added successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#0f102e] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* BASIC INFO */}
          <Block title="Basic Information">
            <Input label="Slug" placeholder="tshirt-black" onChange={(v) => setForm({ ...form, slug: v })} />
            <Input label="Title" placeholder="Training T-Shirt" onChange={(v) => setForm({ ...form, title: v })} />
            <Input label="Category" placeholder="T-Shirt" onChange={(v) => setForm({ ...form, category: v })} />
          </Block>

          {/* IMAGES */}
          <Block title="Images">
            <Upload label="Main Product Image" icon={ImagePlus}>
              <input type="file" name="mainImage" required />
            </Upload>

            <Upload label="Variant Images" icon={Images}>
              <input type="file" name="thumbnails" multiple />
            </Upload>
          </Block>

          {/* HIGHLIGHTS */}
          <Block title="Product Highlights">
            <div className="space-y-6">
              {form.highlights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#30318B] bg-[#14164a] p-5 space-y-3"
                >
                  <input
                    placeholder="Highlight heading"
                    className="w-full rounded-lg border border-[#30318B] bg-transparent px-4 py-3 text-white outline-none"
                    onChange={(e) => {
                      const x = [...form.highlights];
                      x[i].heading = e.target.value;
                      setForm({ ...form, highlights: x });
                    }}
                  />

                  <textarea
                    placeholder="Highlight description"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-[#30318B] bg-transparent px-4 py-3 text-white outline-none"
                    onChange={(e) => {
                      const x = [...form.highlights];
                      x[i].description = e.target.value;
                      setForm({ ...form, highlights: x });
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  highlights: [...form.highlights, { heading: "", description: "" }],
                })
              }
              className="mt-4 inline-flex items-center gap-2 text-[#FF7E23] font-semibold"
            >
              <PlusCircle size={18} />
              Add another highlight
            </button>
          </Block>

          {/* SUBMIT */}
          <div className="pt-6">
            <button
              disabled={loading}
              className="w-full rounded-xl bg-[#FF7E23] py-4 text-lg font-bold text-black hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Saving Product..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* =========================
   REUSABLE UI COMPONENTS
   ========================= */

function Block({ title, children }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Input({ label, placeholder, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#adadad]">
        {label}
      </label>
      <input
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#30318B] bg-transparent px-4 py-3 text-white outline-none focus:border-[#FF7E23]"
      />
    </div>
  );
}

function Upload({ label, icon: Icon, children }) {
  return (
    <label className="block cursor-pointer rounded-xl border-2 border-dashed border-[#30318B] bg-[#14164a] p-6 hover:border-[#FF7E23] transition">
      <div className="flex items-center gap-4">
        <Icon size={32} className="text-[#FF7E23]" />
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-sm text-[#adadad]">
            Click to upload
          </div>
        </div>
      </div>
      <div className="hidden">{children}</div>
    </label>
  );
}
