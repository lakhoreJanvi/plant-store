import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import PlantCard from "./components/PlantCard";
import AddPlantModal from "./components/AddPlantModal";
import { fetchPlants } from "./lib/api";

export default function App() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const title = useMemo(() => {
    if (q && category) return `Results for "${q}" in ${category}`;
    if (q) return `Results for "${q}"`;
    if (category) return `Category: ${category}`;
    return "All Plants";
  }, [q, category]);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetchPlants({ q, category });
      setData(res);
    } catch (e) {
      setErr("Failed to load plants");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);
  useEffect(() => { load(); }, [q, category]);

  return (
    <div>
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 font-semibold">
          🌿 Mini Plant Store
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex-1">
            <SearchBar onSearch={setQ} defaultValue={q} />
          </div>
          <div className="flex items-center gap-3">
            <CategoryFilter value={category} onChange={setCategory} />
            <AddPlantModal onCreated={load} />
          </div>
        </div>

        <div className="text-sm text-gray-600">{title}</div>

        {loading && (
          <div className="rounded-lg border bg-white p-4">Loading plants…</div>
        )}
        {err && !loading && (
          <div className="rounded-lg border bg-red-50 p-4 text-red-700">{err}</div>
        )}

        {!loading && !err && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.items?.map((p) => (
              <PlantCard key={p._id} plant={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
