
import { Product } from './types';

// NOTE: Switched to Unsplash URLs to guarantee images appear immediately.
// You can replace these strings with local paths (e.g., '/pictures/p1.jpg') later if your server is configured correctly.

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Midnight Oxford',
    price: 24500,
    description: 'Handcrafted from the finest Italian leather, the Midnight Oxford defines evening elegance. A seamless silhouette for the modern gentleman.',
    category: 'Oxfords',
    gender: 'Men',
    image: './pictures/Cinematic Brogue Shot.png',
    images: ['./pictures/Cinematic Brogue Shot.png', './pictures/Outdoor Brogue Lifestyle.png']
  },
  {
    id: '2',
    name: 'Velvet Royale Loafer',
    price: 18500,
    description: 'Deep crimson velvet embroidered with gold thread. A statement piece for those who walk with purpose and style.',
    category: 'Loafers',
    gender: 'Men',
    image: './pictures/Loafer Hero Shot.png',
    images: ['./pictures/Loafer Hero Shot.png', './pictures/Loafer Studio Shot.png', './pictures/Premium Loafer Photoshoot.png', './pictures/Loafer Cinematic Scene.png']
  },
  {
    id: '3',
    name: 'Aurum Sneaker',
    price: 14000,
    description: 'Streetwear meets opulence. White calfskin leather with 24k gold-plated eyelets and a minimalist profile.',
    category: 'Sneakers',
    gender: 'Men',
    image: './pictures/Elevated Premium Sneaker.png',
    images: ['./pictures/Elevated Premium Sneaker.png', './pictures/Ad Campaign Sneaker Shot.png', './pictures/Aspirational Sneaker Lifestyle.png', './pictures/Cinematic Knit Sneaker.png']
  },
  {
    id: '4',
    name: 'Obsidian Boot',
    price: 32000,
    description: 'Rugged durability with a high-fashion edge. Full-grain leather construction with a Goodyear welt.',
    category: 'Boots',
    gender: 'Men',
    image: './pictures/boot.jpg',
    images: ['./pictures/boot.jpg']
  },
  {
    id: '5',
    name: 'Navy Luxe Loafer',
    price: 22000,
    description: 'Sophisticated navy suede loafers with gold hardware. Perfect for the modern gentleman who values comfort and style.',
    category: 'Loafers',
    gender: 'Men',
    image: './pictures/Loafer Luxury Setting.png',
    images: ['./pictures/Loafer Luxury Setting.png', './pictures/Engaging Loafer Lifestyle.png', './pictures/Loafer City Lifestyle.png', './pictures/Luxury Loafer Street Style.png']
  },
  {
    id: '6',
    name: 'Monarch Derby',
    price: 22000,
    description: 'Classic British design reimagined. Polished cognac leather that ages gracefully with every step.',
    category: 'Oxfords',
    gender: 'Men',
    image: './pictures/Outdoor Brogue Lifestyle.png',
    images: ['./pictures/Outdoor Brogue Lifestyle.png', './pictures/Cinematic Brogue Shot.png']
  },
  {
    id: '7',
    name: 'Celestial Heel',
    price: 28500,
    description: 'Defying gravity with a sculpted heel structure. Finished in luxurious teal floral embroidery for the gala of the year.',
    category: 'Heels',
    gender: 'Women',
    image: './pictures/Teal Loafer Engagement Shot.png',
    images: ['./pictures/Teal Loafer Engagement Shot.png', './pictures/Teal Loafer Engagement Shot copy.png']
  },
  {
    id: '8',
    name: 'Seraphina Pump',
    price: 26000,
    description: 'Elegance personified. A classic stiletto silhouette crafted from blush pink suede.',
    category: 'Heels',
    gender: 'Women',
    image: './pictures/High-Fashion Pink Loafers.png',
    images: ['./pictures/High-Fashion Pink Loafers.png', './pictures/Elevated Platform Loafer Shot.png']
  },
  {
    id: '9',
    name: 'Luna Sneaker',
    price: 13800,
    description: 'A feminine take on the luxury sneaker. Soft pink knit construction for all-day comfort.',
    category: 'Sneakers',
    gender: 'Women',
    image: './pictures/Outdoor Pink Knit Sneaker.jpg',
    images: ['./pictures/Outdoor Pink Knit Sneaker.jpg', './pictures/Minimalist Knit Sneaker.jpg', './pictures/Luxury Comfort Sneaker Detail.png']
  },
  {
    id: '10',
    name: 'Riviera Flat',
    price: 12500,
    description: 'Effortless chic. Soft leather loafers for comfort without compromising on style.',
    category: 'Flats',
    gender: 'Women',
    image: './pictures/E-commerce Loafer Shot.png',
    images: ['./pictures/E-commerce Loafer Shot.png']
  }
];

export const SHIPPING_COST = 250;
export const TAX_RATE = 0.05; // 5% Luxury Tax/GST approximation for display
