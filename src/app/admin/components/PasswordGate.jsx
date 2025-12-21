"use client";

import { useEffect, useState } from "react";
import { isAdminAuthed } from "@/lib/Adminauth";
import { Button, Card, Input, Label } from "./ui";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordGate({ children }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthed());
    setReady(true);
  }, []);

  function submit() {
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";
    if (!expected) {
      setErr("Missing NEXT_PUBLIC_ADMIN_PASSWORD in .env.local");
      return;
    }

    if (pw === expected) {
      setAuthed(true);
      setErr(null);
      setPw("");
    } else {
      setErr("Wrong password.");
    }
  }

  if (!ready) return null;
  if (authed) return <>{children}</>;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-lg bg-black">
        <h1 className="text-xl font-semibold text-black">Admin Login</h1>
        <p className="mt-1 text-sm text-black">Enter password to continue.</p>

        <div className="mt-5 space-y-2">
          <Label className="text-black">Password</Label>

          <div className="flex gap-4 bg-black">
            <Input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? submit() : null)}
              placeholder="••••••••"
              className="!bg-white !text-black !placeholder:text-black pr-10"
            />

            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-black"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <Eye size={28} /> : <EyeOff size={28} />}
            </button>
          </div>

          {err ? <p className="text-sm text-red-400">{err}</p> : null}
        </div>

        <div className="mt-5 flex gap-2">
          <Button onClick={submit} className="font-semibold">
            Enter
          </Button>
        </div>
      </Card>
    </main>
  );
}
