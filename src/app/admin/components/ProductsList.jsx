"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Search } from "lucide-react";

export default function ProductsList() {
  const [items, setItems] = useState([]);
  const [qText, setQText] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    // If you don't have createdAt on older docs, orderBy may fail.
    // If that happens, change query to just collection(db,"products")
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setItems(rows);
      },
      (err) => {
        console.error(err);
        // fallback without orderBy
        const unsub2 = onSnapshot(collection(db, "products"), (snap2) => {
          const rows2 = snap2.docs.map((d) => ({ id: d.id, ...d.data() }));
          setItems(rows2);
        });
        return () => unsub2();
      }
    );

    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const t = qText.trim().toLowerCase();
    if (!t) return items;
    return items.filter((p) => {
      const hay = [
        p.id,
        p.slug,
        p.title,
        p.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(t);
    });
  }, [items, qText]);

  async function removeProduct(p) {
    const id = p?.id || p?.slug;
    if (!id) return;

    const ok = confirm(`Delete "${p.title || p.slug || id}"? This cannot be undone.`);
    if (!ok) return;

    try {
      setDeletingId(id);
      await deleteDoc(doc(db, "products", id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete.");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Products</h1>

        <div className="relative w-full sm:w-[360px]">
          <Search className="absolute left-3 top-2.5 text-[#adadad]" size={18} />
          <input
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="Search by slug, title, category..."
            className="w-full rounded-lg bg-transparent border border-[#30318B] pl-10 pr-3 py-2 text-white placeholder-[#adadad] outline-none"
          />
        </div>
      </div>

      <div className="rounded-xl border border-[#30318B] overflow-hidden">
        <div className="grid grid-cols-12 bg-[#14164a] px-4 py-3 text-sm text-[#adadad]">
          <div className="col-span-5">Product</div>
          <div className="col-span-4 hidden sm:block">Category</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-[#adadad] bg-[#0f102e]">
            No products found in Firestore.
          </div>
        ) : (
          <div className="divide-y divide-[#30318B]/40 bg-[#0f102e]">
            {filtered.map((p) => (
              <div key={p.id} className="grid grid-cols-12 items-center px-4 py-3">
                <div className="col-span-9 sm:col-span-5 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg border border-[#30318B] overflow-hidden bg-[#14164a] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {p.image ? (
                      <img src={p.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[#adadad] text-xs">No img</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-white font-semibold truncate">
                      {p.title || "Untitled"}
                    </div>
                    <div className="text-[#adadad] text-sm truncate">
                      slug: {p.slug || p.id}
                    </div>
                  </div>
                </div>

                <div className="col-span-4 hidden sm:block text-[#adadad] truncate">
                  {p.category || "-"}
                </div>

                <div className="col-span-3 text-right">
                  <button
                    onClick={() => removeProduct(p)}
                    disabled={deletingId === p.id}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#FF7E23] px-3 py-2 text-[#FF7E23] hover:bg-[#FF7E23] hover:text-black disabled:opacity-60"
                  >
                    <Trash2 size={16} />
                    {deletingId === p.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
