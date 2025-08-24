import "dotenv/config";
import { connectDB } from "./db.js";
import { Plant } from "./models/Plant.js";

const NAMES = [
  "Money Plant", "Snake Plant", "Areca Palm", "ZZ Plant", "Spider Plant",
  "Peace Lily", "Aloe Vera", "Jade Plant", "Rubber Plant", "Fiddle Leaf Fig",
  "Boston Fern", "English Ivy", "Pothos", "Dracaena", "Calathea",
  "Monstera", "Philodendron", "Succulent Mix", "Cactus Mix", "Bamboo Palm",
  "Aglaonema", "Croton", "Anthurium", "Begonia", "Coleus"
];

const CATS = ["indoor", "outdoor", "succulent", "air purifying", "home decor", "low light", "easy care"];

function randomPrice() {
  return Math.round((199 + Math.random() * 600) / 1) / 1; // ₹199–₹799
}
function pickCats() {
  const n = 1 + Math.floor(Math.random() * 3);
  const a = new Set();
  while (a.size < n) a.add(CATS[Math.floor(Math.random() * CATS.length)]);
  return Array.from(a);
}

async function run() {
  await connectDB(process.env.MONGODB_URI);
  await Plant.deleteMany({});
  console.log("[seed] cleared");

  const docs = [];
  let count = 0;
  while (count < 50) {
    const baseName = NAMES[count % NAMES.length];
    const variant = count < NAMES.length ? "" : ` Var. ${Math.ceil((count + 1) / NAMES.length)}`;
    docs.push({
      name: `${baseName}${variant}`,
      price: randomPrice(),
      categories: pickCats(),
      inStock: Math.random() > 0.15
    });
    count++;
  }

  await Plant.insertMany(docs);
  console.log(`[seed] inserted ${docs.length} plants`);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
