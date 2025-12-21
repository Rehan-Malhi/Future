"use client";

import { useMemo, useState } from "react";
import PasswordGate from "./PasswordGate";
import Tabs from "./Tabs";
import AddCategoryForm from "./AddCategoryForm";
import AddProductForm from "./AddProductForm";
import { Card } from "./ui";

export default function AdminShell() {
  const [tab, setTab] = useState("category");

  const tabs = [
    { id: "category", label: "Add Category" },
    { id: "product", label: "Add Product" },
  ];

  return (
    <PasswordGate>
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-4xl my-16 px-4 py-8">
          <h1 className="text-2xl font-semibold text-[#FF7A00]">Future Star Admin</h1>

          <Card className="mt-6">
            <Tabs tabs={tabs} value={tab} onChange={setTab} />

            <div className="mt-6">
              {tab === "category" && <AddCategoryForm />}
              {tab === "product" && <AddProductForm />}
            </div>
          </Card>
        </div>
      </main>
    </PasswordGate>
  );
}
