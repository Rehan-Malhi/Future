"use client";

export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-xl text-sm ${
            value === t.id
              ? "bg-[#FF7A00] text-white"
              : "border border-[#FF7A00]/30 text-black"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
