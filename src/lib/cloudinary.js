// src/lib/cloudinary.js

function sanitizePublicId(x) {
  return String(x || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9/_-]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function validateImageFile(file, maxMB = 5) {
  const okTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!file) throw new Error("No file selected.");
  if (!okTypes.includes(file.type)) throw new Error("Only JPG, PNG, WEBP allowed.");
  if (file.size > maxMB * 1024 * 1024) {
    throw new Error(`Image must be under ${maxMB}MB.`);
  }
}

export async function uploadToCloudinary(file, opts = {}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary env vars");
  }

  validateImageFile(file, opts.maxMB ?? 5);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", uploadPreset);

  if (opts.folder) fd.append("folder", opts.folder);
  if (opts.publicId) fd.append("public_id", sanitizePublicId(opts.publicId));

  const res = await fetch(endpoint, { method: "POST", body: fd });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
  };
}
