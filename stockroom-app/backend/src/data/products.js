// Master inventory array. In a real system this would live in a database —
// kept as an in-memory array here so the filtering/sorting logic underneath
// stays the star of the show.

const PRODUCTS = [
  { id: 1,  name: "Trailhead Wind Shell",      category: "Apparel",      price: 68,  rating: 4.5, icon: "🧥" },
  { id: 2,  name: "Oat-Wash Denim Jacket",      category: "Apparel",      price: 92,  rating: 4.0, icon: "🧥" },
  { id: 3,  name: "Ribbed Merino Crew",         category: "Apparel",      price: 44,  rating: 4.8, icon: "👕" },
  { id: 4,  name: "Utility Cargo Pant",         category: "Apparel",      price: 76,  rating: 3.8, icon: "👖" },
  { id: 5,  name: "Fieldnote Flannel",          category: "Apparel",      price: 55,  rating: 4.2, icon: "👔" },
  { id: 6,  name: "Slate Wool Beanie",          category: "Accessories",  price: 22,  rating: 4.6, icon: "🧢" },
  { id: 7,  name: "Waxed Canvas Tote",          category: "Accessories",  price: 38,  rating: 4.1, icon: "👜" },
  { id: 8,  name: "Brass Buckle Belt",          category: "Accessories",  price: 29,  rating: 3.6, icon: "🎗️" },
  { id: 9,  name: "Polarized Trail Shades",     category: "Accessories",  price: 64,  rating: 4.4, icon: "🕶️" },
  { id: 10, name: "Six-Panel Ledger Cap",       category: "Accessories",  price: 26,  rating: 4.0, icon: "🧢" },
  { id: 11, name: "Trailrunner Mesh Sneaker",   category: "Footwear",     price: 118, rating: 4.7, icon: "👟" },
  { id: 12, name: "Waterproof Field Boot",      category: "Footwear",     price: 165, rating: 4.9, icon: "🥾" },
  { id: 13, name: "Canvas Deck Slip-On",        category: "Footwear",     price: 54,  rating: 3.9, icon: "👞" },
  { id: 14, name: "Recovery Slide Sandal",      category: "Footwear",     price: 32,  rating: 3.5, icon: "🩴" },
  { id: 15, name: "Studio Ankle Boot",          category: "Footwear",     price: 142, rating: 4.3, icon: "👢" },
  { id: 16, name: "Noise-Cancel Headset",       category: "Electronics",  price: 189, rating: 4.6, icon: "🎧" },
  { id: 17, name: "Compact Power Bank 20K",     category: "Electronics",  price: 46,  rating: 4.2, icon: "🔋" },
  { id: 18, name: "Mechanical Travel Keyboard", category: "Electronics",  price: 98,  rating: 4.5, icon: "⌨️" },
  { id: 19, name: "Fitness Tracker Band",       category: "Electronics",  price: 74,  rating: 3.7, icon: "⌚" },
  { id: 20, name: "Portable Bluetooth Speaker", category: "Electronics",  price: 59,  rating: 4.0, icon: "🔊" },
  { id: 21, name: "4K Webcam Mount",            category: "Electronics",  price: 82,  rating: 3.9, icon: "📷" },
  { id: 22, name: "Cast-Iron Skillet 10in",     category: "Home & Living",price: 41,  rating: 4.8, icon: "🍳" },
  { id: 23, name: "Linen Throw Blanket",        category: "Home & Living",price: 58,  rating: 4.3, icon: "🛋️" },
  { id: 24, name: "Amber Glass Candle",         category: "Home & Living",price: 24,  rating: 4.1, icon: "🕯️" },
  { id: 25, name: "Ceramic Pour-Over Set",      category: "Home & Living",price: 47,  rating: 4.6, icon: "☕" },
  { id: 26, name: "Bamboo Cutting Board",       category: "Home & Living",price: 33,  rating: 3.8, icon: "🪵" },
  { id: 27, name: "Desk Lamp, Brushed Steel",   category: "Home & Living",price: 69,  rating: 4.4, icon: "💡" },
  { id: 28, name: "Insulated Steel Bottle",     category: "Accessories",  price: 27,  rating: 4.5, icon: "🧴" },
];

module.exports = { PRODUCTS };
