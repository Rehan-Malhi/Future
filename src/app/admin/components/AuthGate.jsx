"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { Eye, EyeOff, LogOut } from "lucide-react";

export default function AuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  async function login(e) {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pw);
    } catch (e) {
      setErr(e?.message || "Login failed");
    }
  }

  async function logout() {
    await signOut(auth);
  }

  if (checking) return null;

  if (user) {
    return (
      <main className="min-h-screen bg-[#0f102e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-6 flex items-center justify-between rounded-xl border border-[#30318B] bg-[#14164a] p-4">
            <div>
              <div className="text-sm text-[#adadad]">Signed in as</div>
              <div className="font-semibold">{user.email}</div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF7E23] px-4 py-2 font-semibold text-black hover:opacity-90"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {children}
        </div>
      </main>
    );
  }

  // Login UI
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f102e] px-4">
      <div className="w-full max-w-sm rounded-xl bg-[#14164a] p-6 border border-[#30318B]">
        <h1 className="text-xl font-semibold text-white mb-4">Admin Login</h1>

        <form onSubmit={login} className="space-y-3">
          <div>
            <label className="text-[#adadad] text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@futurestar.com"
              className="mt-1 w-full rounded-lg bg-transparent border border-[#30318B] px-4 py-2 text-white placeholder-[#adadad] outline-none"
              required
            />
          </div>

          <div>
            <label className="text-[#adadad] text-sm">Password</label>
            <div className="relative mt-1">
              <input
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg bg-transparent border border-[#30318B] px-4 py-2 pr-10 text-white placeholder-[#adadad] outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2.5 text-[#adadad]"
                aria-label="Toggle password visibility"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {err && <p className="text-red-400 text-sm">{err}</p>}

          <button className="w-full rounded-lg bg-[#FF7E23] py-2 font-semibold text-black hover:opacity-90">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
