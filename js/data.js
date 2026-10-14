const CONFIG = {
  messengerLink: "https://m.me/61576305416219", // PLACEHOLDER: replace with the owner's Messenger link
  gcashNumber: "09XX XXX XXXX", // PLACEHOLDER: replace with the owner's GCash number
  gcashName: "ACCOUNT NAME", // PLACEHOLDER: replace with the GCash account name
  deliveryNote: "Delivery fee depends on your location and is confirmed in chat." // PLACEHOLDER: replace with the owner's real delivery fees
};

const KEY_COLORS = "Colors: light purple, off white, rose pink, light pink, baby blue, bright red, white.";
const MINI_FLOWERS = "Flowers: mini tulips, mini sunflower, mini daisy.";

const PRODUCTS = [
  { id: "b480", type: "bouquet", name: "Purple Tulip and Lily Bouquet", price: 480, img: "images/b-480.jpg", available: true, note: "Purple tulips, a lily and daisies in a pink and cream wrapper." },
  { id: "b350", type: "bouquet", name: "Pink Lily Bouquet", price: 350, img: "images/b-350.jpg", available: true, note: "Pink and red lilies with small flowers and leaves." },
  { id: "b180", type: "bouquet", name: "Earth Tone Lily Bouquet", price: 180, img: "images/b-180.jpg", available: true, note: "A brown lily with small flowers in a beige and mauve wrapper." },
  { id: "b150", type: "bouquet", name: "Red Lily and Daisy Bouquet", price: 150, img: "images/b-150.jpg", available: true, note: "A red lily with daisies in a soft pink wrapper." },
  { id: "b100", type: "bouquet", name: "Red Gerbera Bouquet", price: 100, img: "images/b-100.jpg", available: true, note: "A single red gerbera with leaves." },
  { id: "kpot", type: "keychain", name: "Flower Pot Keychain", price: 100, img: "images/k-pot.jpg", available: true, note: "Flowers: mini tulips (6 pcs), mini sunflower (7 pcs), mini rose (3 pcs), mini daisy (7 pcs), gerbera, big rose, lily." },
  { id: "kmirror", type: "keychain", name: "Mirror Keychain", price: 40, img: "images/k-mirror.jpg", available: true, note: "A small mirror with flowers on the back. Front and back shown." },
  { id: "kbig", type: "keychain", name: "Big Bouquet Keychain", price: 50, img: "images/k-bigbq.jpg", available: true, note: MINI_FLOWERS },
  { id: "ksmall", type: "keychain", name: "Small Bouquet Keychain", price: 25, img: "images/k-smallbq.jpg", available: true, note: MINI_FLOWERS + " " + KEY_COLORS },
  { id: "ktrio", type: "keychain", name: "Trio Tulips Keychain", price: 25, img: "images/k-trio.jpg", available: true, note: KEY_COLORS },
  { id: "klily", type: "keychain", name: "Lily Keychain", price: 20, img: "images/k-lily.jpg", available: true, note: KEY_COLORS },
  { id: "kbutterfly", type: "keychain", name: "Butterfly Keychain", price: 15, img: "images/k-butterfly.jpg", available: true, note: KEY_COLORS },
  { id: "kring", type: "keychain", name: "Flower Ring Keychain", price: 15, img: "images/k-ring.jpg", available: true, note: KEY_COLORS },
  { id: "kgerbera", type: "keychain", name: "Mini Gerbera Keychain", price: 15, img: "images/k-gerbera.jpg", available: true, note: KEY_COLORS },
  { id: "krose", type: "keychain", name: "Mini Rose Keychain", price: 15, img: "images/k-rose.jpg", available: true, note: KEY_COLORS },
  { id: "kheart", type: "keychain", name: "Trio Heart Keychain", price: 10, img: "images/k-heart.jpg", available: true, note: KEY_COLORS }
];

const FLOWERS = [
  { id: "tulip", name: "Tulip", price: 70, available: true },
  { id: "biglily", name: "Big Lily", price: null, available: false },
  { id: "unlily", name: "Unbloomed Lily", price: 59, available: false },
  { id: "lady", name: "Lady Rose", price: null, available: false },
  { id: "rosy", name: "Rosy", price: null, available: false },
  { id: "lav", name: "Lavender", price: 30, available: true },
  { id: "bigsun", name: "Big Sunflower", price: null, available: false },
  { id: "smsun", name: "Small Sunflower", price: 45, available: true },
  { id: "minidaisy", name: "Mini Daisies", price: 49, available: true },
  { id: "daisy", name: "Daisy", price: 70, available: true },
  { id: "lily", name: "Lily", price: 89, available: true },
  { id: "tiger", name: "Tiger Lily", price: 99, available: true },
  { id: "poppy", name: "Poppy", price: 69, available: false },
  { id: "carn", name: "Carnation", price: null, available: false },
  { id: "daisy18", name: "18 Small Daisy Flower Bouquet", price: 200, available: true }
];

const LEAVES = [
  { id: "a", name: "Leaf A", price: 30, available: true },
  { id: "b", name: "Leaf B", price: 15, available: true },
  { id: "c", name: "Leaf C", price: 15, available: true },
  { id: "d", name: "Leaf D", price: null, available: false },
  { id: "e", name: "Leaf E", price: 20, available: true },
  { id: "f", name: "Leaf F", price: 25, available: true },
  { id: "g", name: "Leaf G", price: 20, available: true },
  { id: "h", name: "Leaf H", price: 25, available: true },
  { id: "i", name: "Leaf I", price: 15, available: true },
  { id: "j", name: "Leaf J", price: 20, available: true }
];

const GALLERY_EXTRA = []; // PLACEHOLDER: add more photos here, for example { src: "images/my-photo.jpg", alt: "Description" }

const FAQS = [
  ["How long does an order take?", "Orders take 1 to 4 days, or more depending on the design, quality, and availability of materials."],
  ["How do I pay?", "We accept GCash. We ask for the full payment or a 50% downpayment first. Downpayments are non-refundable."],
  ["Can I cancel my order?", "No. Orders cannot be cancelled once they are confirmed."],
  ["How do I get my order?", "You can pick it up in Addition Hills, Mandaluyong City, meet up with us, or book your preferred courier."],
  ["How much is the delivery fee?", CONFIG.deliveryNote],
  ["Is this item still available?", "Anything marked Not available cannot be ordered right now. Some items come back when the materials are in stock, so check this page again."],
  ["Can I order a custom bouquet?", "Yes. Use the custom bouquet builder to pick your flowers and leaves, and tell us your wrapper and ribbon colors in the notes. Custom orders depend on the materials we have."],
  ["How do I care for my fuzzy blooms?", "Keep them dry and dust them gently with a soft brush."]
];
