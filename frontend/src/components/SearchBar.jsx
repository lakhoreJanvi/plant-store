import { useState } from "react";

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [q, setQ] = useState(defaultValue);
  return (
    <div className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by plant name or keyword..."
        className="flex-1 rounded-lg border px-3 py-2"
      />
      <button
        onClick={() => onSearch(q)}
        className="rounded-lg border bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}
