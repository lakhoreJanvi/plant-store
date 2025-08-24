import { useState } from "react";
import { createPlant } from "../lib/api";

export default function AddPlantModal({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [inStock, setInStock] = useState(true);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setErr("");
    const p = Number(price);
    if (!name.trim()) return setErr("Name is required");
    if (Number.isNaN(p) || p < 0) return setErr("Price must be >= 0");
    setBusy(true);
    try {
      await createPlant({ name, price: p, categories, inStock });
      setOpen(false);
      setName(""); setPrice(""); setCategories(""); setInStock(true);
      onCreated?.();
    } catch (e) {
      setErr("Failed to create plant");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        className="rounded-lg border bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        + Add Plant
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 p-4"
          onClick={() => !busy && setOpen(false)}
        >
          <div
            className="mx-auto mt-20 max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold">Add Plant</h2>
            <div className="mt-4 grid gap-3">
              <input
                className="rounded-lg border px-3 py-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-2"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-2"
                placeholder="Categories (comma-separated)"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                In Stock
              </label>
              {err && <div className="text-sm text-red-600">{err}</div>}
              <div className="mt-2 flex justify-end gap-2">
                <button
                  disabled={busy}
                  className="rounded-lg border px-3 py-2"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={busy}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                  onClick={submit}
                >
                  {busy ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
