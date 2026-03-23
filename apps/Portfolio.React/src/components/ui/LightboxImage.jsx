import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function LightboxImage({ src, alt }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <img
        src={src}
        alt={alt || ""}
        onClick={() => setOpen(true)}
        style={{
          maxWidth: "100%", cursor: "zoom-in", borderRadius: "8px",
          border: "1px solid rgba(0,229,255,0.15)", margin: "16px 0", display: "block",
        }}
      />
      {open && createPortal(
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.88)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <img
            src={src}
            alt={alt || ""}
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: "8px" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}
