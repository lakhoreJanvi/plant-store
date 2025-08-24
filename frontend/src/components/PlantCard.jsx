export default function PlantCard({ plant }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{plant.name}</h3>
        <span className="text-green-700 font-semibold">₹{plant.price}</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <b>Categories:</b> {plant.categories?.join(", ") || "—"}
      </div>
      <div className="mt-1">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs ${
            plant.inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {plant.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
}
