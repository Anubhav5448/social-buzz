"use client";

import { useRef, useState } from "react";

type Props = {
  mediaUrl: string | null;
  mediaType: "image" | "video";
  onChange: (mediaUrl: string | null, mediaType: "image" | "video") => void;
};

export default function MediaUploader({ mediaUrl, mediaType, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
        setUploading(false);
        return;
      }
      onChange(data.url, data.media_type);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 block mb-2">
        Thumbnail image or video
      </label>

      {mediaUrl ? (
        <div className="border border-line p-3 flex items-center gap-4">
          <div className="w-24 h-16 bg-paperdim flex items-center justify-center overflow-hidden shrink-0">
            {mediaType === "video" ? (
              <video src={mediaUrl} className="w-full h-full object-cover" muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mediaUrl} alt="" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[11px] text-ink/60 truncate">{mediaUrl}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/40 mt-1">
              {mediaType}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null, "image")}
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50 hover:text-signal shrink-0"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border border-dashed border-line px-4 py-8 text-center font-mono text-[12px] uppercase tracking-[0.08em] text-ink/50 hover:border-signal hover:text-signal transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Click to upload image or video"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="text-signal text-xs font-mono mt-2">{error}</p>}
    </div>
  );
}
