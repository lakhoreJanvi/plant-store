const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function fetchPlants({ q = "", category = "" } = {}) {
  const url = new URL(`${BASE}/api/plants`);
  if (q) url.searchParams.set("q", q);
  if (category) url.searchParams.set("category", category);
  console.log("DEBUG: fetching URL", url.toString());

  const res = await fetch(url.toString(), { cache: "no-store" });
  console.log("DEBUG: response status", res.status);
  if (!res.ok) throw new Error(`Failed to fetch plants: ${res.status}`);
  return res.json();
}

export async function createPlant({ name, price, categories, inStock }) {
  const res = await fetch(`${BASE}/api/plants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, categories, inStock }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
