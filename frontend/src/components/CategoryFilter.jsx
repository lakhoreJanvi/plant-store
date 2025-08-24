const PRESET = ["", "indoor", "outdoor", "succulent", "air purifying", "home decor", "low light", "easy care"];

export default function CategoryFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border px-3 py-2"
    >
      {PRESET.map((opt) => (
        <option key={opt || "all"} value={opt}>
          {opt ? opt[0].toUpperCase() + opt.slice(1) : "All categories"}
        </option>
      ))}
    </select>
  );
}
