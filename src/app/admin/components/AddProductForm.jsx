"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button, Input, Label, Textarea } from "./ui";
import { uploadToCloudinary } from "@/lib/cloudinary";

function slugify(x) {
  return x
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AddProductForm() {
  const [cats, setCats] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [mainImage, setMainImage] = useState(""); // URL fallback
  const [mainFile, setMainFile] = useState(null); // file upload

  const [imageHeight, setImageHeight] = useState("");

  const [thumbsText, setThumbsText] = useState(""); // URL fallback list
  const [thumbFiles, setThumbFiles] = useState([]); // file upload list

  const [highlightsText, setHighlightsText] = useState("");

  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingCats(true);
      const snap = await getDocs(collection(db, "categories"));
      const list = snap.docs.map((d) => d.data());
      setCats(list);
      setCategoryId(list?.[0]?.id || "");
      setLoadingCats(false);
    })();
  }, []);

  const selectedCat = useMemo(
    () => cats.find((c) => c.id === categoryId),
    [cats, categoryId]
  );

  function onTitleChange(v) {
    setTitle(v);
    setSlug(slugify(v));
  }

  function parseThumbs() {
    return thumbsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function parseHighlights() {
    return highlightsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [heading, ...rest] = line.split("|");
        return {
          heading: (heading || "").trim(),
          description: rest.join("|").trim(),
        };
      })
      .filter((h) => h.heading.length > 0);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (!categoryId) return setStatus("Select a category.");
    if (!title.trim()) return setStatus("Title is required.");
    if (!slug.trim()) return setStatus("Slug is required.");

    const finalSlug = slug.trim();

    setSaving(true);
    try {
      // ✅ MAIN IMAGE
      let finalMainUrl = mainImage.trim();
      if (mainFile) {
        const up = await uploadToCloudinary(mainFile, {
          folder: `products/${finalSlug}`,
          publicId: "main",
          maxMB: 5,
        });
        finalMainUrl = up.url;
      }
      if (!finalMainUrl) throw new Error("Main image is required (upload file or paste URL).");

      // ✅ THUMBNAILS
      let thumbnails = parseThumbs();

      if (thumbFiles.length) {
        const uploaded = await Promise.all(
          thumbFiles.map((file, idx) =>
            uploadToCloudinary(file, {
              folder: `products/${finalSlug}/thumbs`,
              publicId: `thumb-${idx + 1}`,
              maxMB: 5,
            })
          )
        );
        thumbnails = uploaded.map((x) => x.url);
      }

      const highlights = parseHighlights();

      await setDoc(doc(db, "products", finalSlug), {
        slug: finalSlug,
        title: title.trim(),
        categoryId,
        categoryName: selectedCat?.category || "",
        image: finalMainUrl,
        imageHeight: imageHeight ? Number(imageHeight) : null,
        thumbnails,
        highlights,
        createdAt: serverTimestamp(),
      });

      setStatus("✅ Product saved.");
      setTitle("");
      setSlug("");
      setMainImage("");
      setMainFile(null);
      setImageHeight("");
      setThumbsText("");
      setThumbFiles([]);
      setHighlightsText("");
    } catch (err) {
      setStatus(`❌ Failed: ${err?.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Category</Label>
        <div className="flex gap-2">
          <select
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={loadingCats}
          >
            {cats.map((c) => (
              <option key={c.id} value={c.id}>
                {c.category} ({c.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="T-Shirt" />
        </div>
        <div>
          <Label>Slug</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="tshirt" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Main image upload (JPG/PNG/WEBP)</Label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setMainFile(e.target.files?.[0] || null)}
          />
          <p className="text-xs text-black">OR paste URL</p>
          <Input
            value={mainImage}
            onChange={(e) => setMainImage(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <Label>Image height (optional)</Label>
          <Input value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} placeholder="580" inputMode="numeric" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Thumbnails upload (multiple)</Label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => setThumbFiles(Array.from(e.target.files || []))}
        />
        <p className="text-xs text-black">OR paste thumbnail URLs (one per line)</p>
        <Textarea
          value={thumbsText}
          onChange={(e) => setThumbsText(e.target.value)}
          placeholder={`https://...\nhttps://...\nhttps://...`}
        />
      </div>

      <div>
        <Label>Highlights (optional) — one per line: Heading | Description</Label>
        <Textarea
          value={highlightsText}
          onChange={(e) => setHighlightsText(e.target.value)}
          className="placeholder:text-black"
          placeholder={`Everyday Athletic Essential | A versatile training t-shirt...\nBreathable & Lightweight Fabric | Constructed using lightweight material...`}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button disabled={saving} type="submit">
          {saving ? "Saving..." : "Save Product"}
        </Button>
        {status ? <p className="text-sm text-black">{status}</p> : null}
      </div>
    </form>
  );
}
