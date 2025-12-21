// app/admin/_components/ui.ts
import React from "react";

export function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

export function Card({ className, children }) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function Label({ children }) {
  return <div className="mb-2 text-sm font-medium text-white/80">{children}</div>;
}

export function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl mr-12 border border-black/15 bg-white/5 px-3 py-2 text-sm text-black placeholder:text-white/40 outline-none",
        "focus:border-black/30",
        props.className
      )}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 5}
      className={cn(
        "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-md text-black placeholder:text-black outline-none",
        "focus:border-white/30",
        props.className
      )}
    />
  );
}

export function Button(props) {
  const { className, ...rest } = props;

  return (
    <button
      {...rest}
      className={`rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition disabled:opacity-60 ${
        className || ""
      }`}
    />
  );
}

