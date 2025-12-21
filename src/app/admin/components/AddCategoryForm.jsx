"use client";

import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button, Input } from "./ui";
import { uploadToCloudinary } from "@/lib/cloudinary";

function slugify(x) {
  return x
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AddCategoryForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [heroFile, setHeroFile] = useState(null); // ✅ file
  const [heroImage, setHeroImage] = useState(""); // ✅ url fallback (optional)

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function autoIdFromName(v) {
    setId(slugify(v));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(null);

    const finalId = id.trim();
    if (!finalId) return setStatus("Category ID is required.");
    if (!name.trim()) return setStatus("Category name is required.");

    setLoading(true);
    try {
      let finalHeroUrl = heroImage.trim();

      // ✅ Upload if file selected
      if (heroFile) {
        const up = await uploadToCloudinary(heroFile, {
          folder: `categories/${finalId}`,
          publicId: "hero",
          maxMB: 5,
        });
        finalHeroUrl = up.url;
      }

      if (!finalHeroUrl) {
        throw new Error("Hero image is required (upload file or paste URL).");
      }

      await setDoc(doc(db, "categories", finalId), {
        id: finalId,
        category: name.trim(),
        heroImage: finalHeroUrl,
        createdAt: serverTimestamp(),
      });

      setStatus("✅ Category saved.");
      setName("");
      setId("");
      setHeroFile(null);
      setHeroImage("");
    } catch (err) {
      setStatus(`❌ Failed: ${err?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-black">Category name</p>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              autoIdFromName(e.target.value);
            }}
            placeholder="T-Shirts"
          />
        </div>

        <div>
          <p className="mb-2 text-black">Category ID (slug)</p>
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="tshirt" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-black">Hero image upload (JPG/PNG/WEBP)</p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
        />

        <p className="text-black text-sm">OR paste URL</p>
        <Input
          value={heroImage}
          onChange={(e) => setHeroImage(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-3">
        <Button disabled={loading} type="submit">
          {loading ? "Saving..." : "Save Category"}
        </Button>
        {status ? <p className="text-sm text-black">{status}</p> : null}
      </div>
    </form>
  );
}
