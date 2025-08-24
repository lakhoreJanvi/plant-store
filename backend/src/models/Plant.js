import mongoose from "mongoose";

const PlantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    categories: { type: [String], default: [], index: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Helpful text index for name + categories
PlantSchema.index({ name: "text", categories: "text" });

export const Plant = mongoose.model("Plant", PlantSchema);
