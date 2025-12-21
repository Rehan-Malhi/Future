// lib/adminAuth.ts
export function isAdminAuthed() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("fs_admin_authed") === "1";
}

export function setAdminAuthed(v) {
  if (typeof window === "undefined") return;
  localStorage.setItem("fs_admin_authed", v ? "1" : "0");
}
