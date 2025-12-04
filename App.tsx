
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Star, ShieldCheck, Truck, ChevronRight, ChevronDown, Minus, Plus, Trash2, CreditCard, Instagram, Facebook, Twitter, Phone, Mail, MapPin, Ruler, Droplets, Package, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, SHIPPING_COST, TAX_RATE } from './constants';
import { Product, CartItem, Page } from './types';
import { Button } from './components/Button';
import { StylistChat } from './components/StylistChat';
import Swal from 'sweetalert2';

// --- Components defined locally for single-file XML structure optimization ---

// HEADER
const Header = ({
  cartCount,
  onCartClick,
  onNavClick,
  currentPage
}: {
  cartCount: number;
  onCartClick: () => void;
  onNavClick: (page: Page) => void;
  currentPage: Page;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isServicePage = [Page.CONTACT, Page.SHIPPING, Page.SIZE_GUIDE, Page.CARE].includes(currentPage);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => onNavClick(Page.HOME)}
          className="cursor-pointer z-50 flex items-center gap-2"
        >
          <img
            src="./pictures/logo.png"
            alt="MI MARTZ"
            className={`transition-all duration-500 w-auto object-contain ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
            onError={(e) => {
              // Fallback if image not found
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback Text if Image fails to load */}
          <h1 className="hidden text-2xl md:text-3xl font-bold tracking-tighter text-white font-serif">
            MI <span className="text-[#d4af37]">MARTZ</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          <button onClick={() => onNavClick(Page.HOME)} className={`text-sm tracking-widest uppercase hover:text-[#d4af37] transition ${currentPage === Page.HOME ? 'text-[#d4af37]' : 'text-neutral-300'}`}>Home</button>
          <button onClick={() => onNavClick(Page.MEN)} className={`text-sm tracking-widest uppercase hover:text-[#d4af37] transition ${currentPage === Page.MEN ? 'text-[#d4af37]' : 'text-neutral-300'}`}>Men</button>
          <button onClick={() => onNavClick(Page.WOMEN)} className={`text-sm tracking-widest uppercase hover:text-[#d4af37] transition ${currentPage === Page.WOMEN ? 'text-[#d4af37]' : 'text-neutral-300'}`}>Women</button>
          <button onClick={() => onNavClick(Page.SHOP)} className={`text-sm tracking-widest uppercase hover:text-[#d4af37] transition ${currentPage === Page.SHOP ? 'text-[#d4af37]' : 'text-neutral-300'}`}>Collection</button>

          {/* Client Services Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 text-sm tracking-widest uppercase hover:text-[#d4af37] transition ${isServicePage ? 'text-[#d4af37]' : 'text-neutral-300'}`}>
              Client Services
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top z-50">
              <div className="bg-[#0a0a0a] border border-neutral-800 shadow-2xl w-56 flex flex-col py-2">
                <button onClick={() => onNavClick(Page.CONTACT)} className="text-left px-6 py-3 text-sm text-neutral-400 hover:text-[#d4af37] hover:bg-neutral-900/50 transition tracking-wide uppercase">
                  Contact Us
                </button>
                <button onClick={() => onNavClick(Page.SHIPPING)} className="text-left px-6 py-3 text-sm text-neutral-400 hover:text-[#d4af37] hover:bg-neutral-900/50 transition tracking-wide uppercase">
                  Shipping & Returns
                </button>
                <button onClick={() => onNavClick(Page.SIZE_GUIDE)} className="text-left px-6 py-3 text-sm text-neutral-400 hover:text-[#d4af37] hover:bg-neutral-900/50 transition tracking-wide uppercase">
                  Size Guide
                </button>
                <button onClick={() => onNavClick(Page.CARE)} className="text-left px-6 py-3 text-sm text-neutral-400 hover:text-[#d4af37] hover:bg-neutral-900/50 transition tracking-wide uppercase">
                  Care Instructions
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6 z-50">
          <button onClick={onCartClick} className="relative group">
            <ShoppingBag className="w-6 h-6 text-white group-hover:text-[#d4af37] transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 md:hidden z-40 px-6 overflow-y-auto"
          >
            <button onClick={() => { onNavClick(Page.HOME); setMobileMenuOpen(false); }} className="text-2xl font-serif text-white hover:text-[#d4af37]">Home</button>
            <button onClick={() => { onNavClick(Page.MEN); setMobileMenuOpen(false); }} className="text-2xl font-serif text-white hover:text-[#d4af37]">Men</button>
            <button onClick={() => { onNavClick(Page.WOMEN); setMobileMenuOpen(false); }} className="text-2xl font-serif text-white hover:text-[#d4af37]">Women</button>
            <button onClick={() => { onNavClick(Page.SHOP); setMobileMenuOpen(false); }} className="text-2xl font-serif text-white hover:text-[#d4af37]">All Collection</button>

            <div className="w-12 h-[1px] bg-neutral-800 my-2" />
            <p className="text-[#d4af37] text-xs uppercase tracking-widest mb-2">Client Services</p>

            <button onClick={() => { onNavClick(Page.CONTACT); setMobileMenuOpen(false); }} className="text-xl font-serif text-white hover:text-[#d4af37]">Contact Us</button>
            <button onClick={() => { onNavClick(Page.SHIPPING); setMobileMenuOpen(false); }} className="text-xl font-serif text-white hover:text-[#d4af37]">Shipping & Returns</button>
            <button onClick={() => { onNavClick(Page.SIZE_GUIDE); setMobileMenuOpen(false); }} className="text-xl font-serif text-white hover:text-[#d4af37]">Size Guide</button>
            <button onClick={() => { onNavClick(Page.CARE); setMobileMenuOpen(false); }} className="text-xl font-serif text-white hover:text-[#d4af37]">Care Instructions</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// HERO SECTION
const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="./pictures/hero.jpg"
          alt="Luxury Shoes"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to the online version if local file is missing
            e.currentTarget.src = "./pictures/TealLoafer Engagement Shot.png";
          }}
        />
        {/* Adjusted gradient to ensure text readability against the yellow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="text-[#d4af37] tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">UNLOCK YOUR PERFECT PAIR</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Walk With <br />
            <span className="italic text-[#d4af37]">Distinction</span>
          </h2>
          <p className="text-neutral-300 text-lg mb-8 max-w-lg font-light leading-relaxed">
            Experience the pinnacle of Italian craftsmanship. Timeless designs for those who leave a mark wherever they go.
          </p>
          <Button onClick={onShopNow} className="group">
            View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-2"></div>
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

// CATEGORY SPLIT SECTION
const CategorySplit = ({ onNavClick }: { onNavClick: (page: Page) => void }) => (
  <section className="grid grid-cols-1 md:grid-cols-2 h-[60vh] md:h-[80vh]">
    <div
      onClick={() => onNavClick(Page.MEN)}
      className="relative group cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10"
    >
      <div className="absolute inset-0 bg-neutral-900">
        <img
          src="./pictures/men-collection.jpg"
          alt="Men's Collection"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 italic">For Him</h3>
        <span className="text-sm uppercase tracking-widest text-white border-b border-transparent group-hover:border-[#d4af37] transition-colors duration-300">Discover</span>
      </div>
    </div>

    <div
      onClick={() => onNavClick(Page.WOMEN)}
      className="relative group cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-neutral-900">
        <img
          src="./pictures/Teal Loafer Engagement Shot copy.png"
          alt="Women's Collection"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 italic">For Her</h3>
        <span className="text-sm uppercase tracking-widest text-white border-b border-transparent group-hover:border-[#d4af37] transition-colors duration-300">Discover</span>
      </div>
    </div>
  </section>
);

// ATELIER SECTION
const AtelierSection = () => (
  <section className="py-32 bg-neutral-900 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 skew-x-12 translate-x-20"></div>
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#d4af37] uppercase tracking-widest text-xs font-bold mb-4 block">The Legacy</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Uncompromising <br /><span className="italic text-neutral-500">Excellence</span></h2>
        <p className="text-neutral-400 leading-relaxed mb-6 font-light text-lg">
          Born from a desire to bridge the gap between traditional Italian artistry and modern Pakistani resilience. MI Martz is not just a brand; it is a declaration of sophistication.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-8 font-light">
          Each silhouette is sketched in our Islamabad studio before being brought to life by artisans who have dedicated their lives to the craft of shoemaking.
        </p>
        <div className="flex gap-8">
          <div>
            <span className="block text-3xl font-serif text-white">100+</span>
            <span className="text-xs text-neutral-500 uppercase tracking-wide">Design Steps</span>
          </div>
          <div>
            <span className="block text-3xl font-serif text-white">40h</span>
            <span className="text-xs text-neutral-500 uppercase tracking-wide">Handcrafting</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src="./pictures/Enhanced Premium Sneaker Wall.png"
            alt="Craftsmanship"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              // Fallback if URL fails
              e.currentTarget.src = "./pictures/Enhanced Premium Sneaker Wall.png";
            }}
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-[#d4af37] p-6 max-w-xs shadow-xl hidden md:block">
          <p className="text-black font-serif italic text-lg">"Quality is never an accident; it is always the result of high intention."</p>
        </div>
      </motion.div>
    </div>
  </section>
);

// NEWSLETTER SECTION
const NewsletterSection = () => {
  const images = [
    "./pictures/carousel 6.webp",
    "./pictures/carousel 2.webp",
    "./pictures/carousel.jpg",
    "./pictures/carousel 5.webp",
    "./pictures/carousel 8.webp",
    "./pictures/Premium Accessory Backdrop.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds for better relaxed vibe

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Carousel */}
      <AnimatePresence>
        {images.map((img, index) => (
          index === currentImageIndex && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }} // Smooth fade
              className="absolute inset-0 z-0"
            >
              <img
                src={img}
                alt={`Luxury Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/80 z-10" />

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-20">
        <h2 className="text-3xl font-serif text-white mb-4">Join the Inner Circle</h2>
        <p className="text-neutral-300 mb-8 max-w-md mx-auto font-light">
          Subscribe to receive complimentary shipping on your first order and exclusive access to private sales.
        </p>
        <form onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const email = (form.elements.namedItem('email') as HTMLInputElement).value;
          if (email) {
            Swal.fire({
              title: 'Welcome to the Circle!',
              text: 'You\'ve been added to our exclusive list.',
              icon: 'success',
              confirmButtonText: 'Excellent',
              background: '#0a0a0a',
              color: '#fff',
              confirmButtonColor: '#d4af37',
              iconColor: '#d4af37',
            });
            form.reset();
          }
        }} className="flex max-w-md mx-auto border-b border-neutral-500 focus-within:border-[#d4af37] transition-colors pb-2">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="bg-transparent flex-1 text-white placeholder-neutral-400 focus:outline-none"
          />
          <button type="submit" className="text-[#d4af37] uppercase tracking-widest text-xs font-bold hover:text-white transition">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

// PRODUCT CARD
const ProductCard: React.FC<{ product: Product; onClick: (p: Product) => void }> = ({ product, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = product.images || [product.image];
  const hasMultipleImages = productImages.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-neutral-900 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={productImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              // Fallback to a high quality generic shoe image if specific one fails
              e.currentTarget.src = "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop";
            }}
          />
        </AnimatePresence>

        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot Indicators - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                  ? 'bg-[#d4af37] w-4'
                  : 'bg-white/50 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
          <span className="text-white text-sm font-medium tracking-wider">View Details</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-serif text-lg mb-1 group-hover:text-[#d4af37] transition-colors">{product.name}</h3>
        <p className="text-neutral-400 text-sm mb-2 uppercase tracking-wide">{product.category}</p>
        <span className="text-[#d4af37] font-semibold">Rs. {product.price.toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

// PRODUCT LIST PAGE
const ProductList = ({
  products,
  onProductClick,
  gender,
  title
}: {
  products: Product[];
  onProductClick: (p: Product) => void;
  gender?: 'Men' | 'Women';
  title?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');

  // First filter by gender if provided
  const genderFilteredProducts = gender
    ? products.filter(p => p.gender === gender)
    : products;

  // Extract unique categories from the gender-filtered list
  const categories = ['All', ...Array.from(new Set(genderFilteredProducts.map(p => p.category)))];

  // Filter products based on subcategory and price (PKR Ranges)
  const filteredProducts = genderFilteredProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    let matchesPrice = true;
    if (priceRange === 'Under 15k') matchesPrice = product.price < 15000;
    if (priceRange === '15k - 25k') matchesPrice = product.price >= 15000 && product.price <= 25000;
    if (priceRange === 'Over 25k') matchesPrice = product.price > 25000;

    return matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen">
      {/* Category Banner */}
      <div className="relative h-[40vh] w-full overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src={
              gender === 'Men' ? "./pictures/MI MARTZ E-commerce Banner.png" :
                gender === 'Women' ? "./pictures/women-banner.png" :
                  "./pictures/carousel.jpg"
            }
            alt="Collection Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{title || 'The Collection'}</h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto" />
          </motion.div>
        </div>
      </div>

      <div className="pb-24 container mx-auto px-6">

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 border-b border-neutral-800 pb-6 sticky top-24 z-30 bg-[#0a0a0a]/95 backdrop-blur-md py-4 -mx-6 px-6 md:mx-0 md:px-0 md:relative md:top-0 md:bg-transparent">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm uppercase tracking-widest transition-all duration-300 relative group ${selectedCategory === cat ? 'text-[#d4af37]' : 'text-neutral-500 hover:text-white'}`}
              >
                {cat}
                {/* Underline indicator */}
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#d4af37] transform transition-transform duration-300 ${selectedCategory === cat ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
          </div>

          {/* Price Dropdown */}
          <div className="relative group min-w-[180px]">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full appearance-none bg-neutral-900 border border-neutral-800 text-neutral-300 py-3 px-4 pr-10 focus:outline-none focus:border-[#d4af37] text-sm uppercase tracking-wider cursor-pointer hover:bg-neutral-800 transition-colors"
            >
              <option value="All">Price: All</option>
              <option value="Under 15k">Under Rs. 15,000</option>
              <option value="15k - 25k">Rs. 15,000 - Rs. 25,000</option>
              <option value="Over 25k">Over Rs. 25,000</option>
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-[#d4af37] transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 min-h-[50vh]">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center text-center py-20"
              >
                <Filter className="w-12 h-12 text-neutral-700 mb-4" />
                <p className="text-neutral-500 text-lg font-light mb-2">No masterpieces found.</p>
                <p className="text-neutral-600 text-sm mb-6">Try adjusting your filters to discover more.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setPriceRange('All'); }}
                  className="text-[#d4af37] border-b border-[#d4af37] hover:text-white hover:border-white transition-colors uppercase tracking-widest text-xs pb-1"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// PRODUCT DETAIL PAGE
const ProductDetail = ({
  product,
  onBack,
  onAddToCart
}: {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = product.images || [product.image];
  const hasMultipleImages = productImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12 container mx-auto px-6 min-h-screen flex items-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/5] bg-neutral-900 overflow-hidden shadow-2xl group"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </AnimatePresence>

          {/* Navigation Arrows - Only show if multiple images */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dot Indicators - Only show if multiple images */}
          {hasMultipleImages && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                    ? 'bg-[#d4af37] w-6'
                    : 'bg-white/50 hover:bg-white/80'
                    }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button onClick={onBack} className="text-neutral-400 hover:text-white mb-8 flex items-center gap-2 text-sm uppercase tracking-widest transition">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Collection
          </button>

          <div className="flex gap-2 mb-2">
            <span className="text-[#d4af37] uppercase tracking-widest text-sm font-medium">{product.gender}</span>
            <span className="text-neutral-600 uppercase tracking-widest text-sm font-medium">•</span>
            <span className="text-[#d4af37] uppercase tracking-widest text-sm font-medium">{product.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">{product.name}</h1>
          <p className="text-2xl text-white font-light mb-8">Rs. {product.price.toLocaleString()}</p>

          <div className="border-t border-b border-neutral-800 py-8 mb-8">
            <p className="text-neutral-300 leading-relaxed font-light">{product.description}</p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-neutral-400 text-sm">
              <Truck className="w-4 h-4" /> <span>Free Nationwide Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400 text-sm">
              <ShieldCheck className="w-4 h-4" /> <span>Lifetime Warranty</span>
            </div>
          </div>

          <Button onClick={() => onAddToCart(product)} fullWidth className="md:w-auto">
            Add to Bag
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// CONTACT PAGE
const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 container mx-auto px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">At Your Service</h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8" />
          <p className="text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            Our dedicated concierge team is available to assist you with styling advice, order inquiries, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8 p-8 bg-neutral-900/50 border border-neutral-800">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-none text-[#d4af37]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-serif text-lg mb-1">Call Us</h3>
                <p className="text-neutral-400 text-sm mb-2">Available 9am - 6pm PKT</p>
                <a href="tel:0300-09876673" className="text-white hover:text-[#d4af37] transition font-medium tracking-wide">0300-09876673</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-none text-[#d4af37]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-serif text-lg mb-1">Email Us</h3>
                <p className="text-neutral-400 text-sm mb-2">We reply within 24 hours</p>
                <a href="mailto:mimartz@gmail.com" className="text-white hover:text-[#d4af37] transition font-medium tracking-wide">mimartz@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-none text-[#d4af37]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-serif text-lg mb-1">MI MARTZ</h3>
                <p className="text-neutral-400 text-sm">
                  Khayaban-e-Sir Syed<br />
                  Islamabad
                </p>
              </div>
            </div>
          </div>

          {/* Simple Form */}
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            Swal.fire({
              title: 'Message Sent!',
              text: 'Our concierge team will respond within 24 hours.',
              icon: 'success',
              confirmButtonText: 'Perfect',
              background: '#0a0a0a',
              color: '#fff',
              confirmButtonColor: '#d4af37',
              iconColor: '#d4af37',
            });
            (e.target as HTMLFormElement).reset();
          }}>
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="First Name" className="bg-transparent border-b border-neutral-700 p-3 text-white focus:outline-none focus:border-[#d4af37] transition w-full" />
              <input required placeholder="Last Name" className="bg-transparent border-b border-neutral-700 p-3 text-white focus:outline-none focus:border-[#d4af37] transition w-full" />
            </div>
            <input required type="email" placeholder="Email Address" className="bg-transparent border-b border-neutral-700 p-3 text-white focus:outline-none focus:border-[#d4af37] transition w-full" />
            <textarea required placeholder="Your Message" rows={4} className="bg-transparent border-b border-neutral-700 p-3 text-white focus:outline-none focus:border-[#d4af37] transition w-full"></textarea>
            <Button type="submit" variant="outline" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// SHIPPING & RETURNS PAGE
const ShippingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 container mx-auto px-6 max-w-4xl"
    >
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-8 text-center">Shipping & Returns</h2>

      <div className="space-y-8">
        <section className="bg-neutral-900/50 p-8 border border-neutral-800">
          <div className="flex items-center gap-3 mb-4 text-[#d4af37]">
            <Truck className="w-6 h-6" />
            <h3 className="text-xl font-serif text-white">White-Glove Delivery</h3>
          </div>
          <p className="text-neutral-400 leading-relaxed font-light mb-4">
            MI Martz offers premium shipping services across Pakistan. Your items are packaged in our signature boxes, ensuring they arrive in pristine condition.
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 text-sm ml-2">
            <li>Standard Delivery (3-5 business days): Rs. {SHIPPING_COST}</li>
            <li>Free Shipping on orders over Rs. 50,000</li>
            <li>Same-Day Concierge (Islamabad/Rawalpindi): Rs. 1,500</li>
          </ul>
        </section>

        <section className="bg-neutral-900/50 p-8 border border-neutral-800">
          <div className="flex items-center gap-3 mb-4 text-[#d4af37]">
            <Package className="w-6 h-6" />
            <h3 className="text-xl font-serif text-white">Returns & Exchanges</h3>
          </div>
          <p className="text-neutral-400 leading-relaxed font-light">
            We accept returns within 14 days of receipt. Items must be unworn, in their original condition, and in the original packaging.
          </p>
          <p className="text-neutral-400 leading-relaxed font-light mt-4">
            To initiate a return, please contact our concierge team at <span className="text-white">mimartz@gmail.com</span> or call <span className="text-white">0300-09876673</span>.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

// SIZE GUIDE PAGE
const SizeGuidePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 container mx-auto px-6 max-w-4xl"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Size Guide</h2>
        <p className="text-neutral-400">Find your perfect fit with our international size conversion chart.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-400">
          <thead className="bg-neutral-900 text-white font-serif uppercase tracking-widest text-xs border-b border-neutral-800">
            <tr>
              <th className="px-6 py-4">MI Martz (EU)</th>
              <th className="px-6 py-4">US</th>
              <th className="px-6 py-4">UK</th>
              <th className="px-6 py-4">Foot Length (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 bg-neutral-900/30">
            {[39, 40, 41, 42, 43, 44, 45, 46].map((size, idx) => (
              <tr key={size} className="hover:bg-neutral-800/50 transition">
                <td className="px-6 py-4 font-medium text-white">{size}</td>
                <td className="px-6 py-4">{[6, 7, 8, 9, 10, 11, 12, 13][idx]}</td>
                <td className="px-6 py-4">{[5, 6, 7, 8, 9, 10, 11, 12][idx]}</td>
                <td className="px-6 py-4">{[25.1, 25.4, 26, 26.7, 27.3, 27.9, 28.6, 29.2][idx]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 bg-neutral-900/50 p-8 border border-neutral-800 flex gap-6 items-start">
        <Ruler className="w-8 h-8 text-[#d4af37] flex-shrink-0" />
        <div>
          <h3 className="text-white font-serif text-lg mb-2">Fit Advice</h3>
          <p className="text-neutral-400 font-light leading-relaxed">
            Our shoes are crafted on Italian lasts which tend to run true to size. If you are between sizes or have a wider foot, we recommend selecting the next size up. For specific styling advice, please chat with our AI Concierge.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// CARE INSTRUCTIONS PAGE
const CarePage = () => {
  const careItems = [
    {
      title: "Leather Care",
      icon: Droplets,
      description: "Clean regularly with a soft, dry cloth. To maintain suppleness, apply a high-quality leather conditioner monthly. Avoid direct heat sources which can cause the leather to crack."
    },
    {
      title: "Suede Maintenance",
      icon: Star,
      description: "Use a suede brush to gently remove surface dirt. Apply a protective spray to repel water and stains. Never use water to clean suede as it may stain the nap."
    },
    {
      title: "Storage",
      icon: Package,
      description: "Store your shoes in the provided dust bags to prevent dust accumulation. Use cedar shoe trees to maintain shape and absorb moisture after wear."
    },
    {
      title: "Repair Services",
      icon: ShieldCheck,
      description: "MI Martz offers resoling and refurbishment services. Contact us at mimartz@gmail.com to schedule a service appointment for your beloved pair."
    }
  ];

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Product Care</h2>
        <div className="w-16 h-1 bg-[#d4af37] mx-auto" />
        <p className="mt-6 text-neutral-400 max-w-2xl mx-auto font-light">
          Preserve the legacy of your footwear with our master craftsman's guide to longevity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {careItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="relative bg-neutral-900/30 p-8 border border-neutral-800 group overflow-hidden"
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#d4af37] group-hover:w-full transition-all duration-700 ease-in-out" />

            <div className="relative z-10">
              <div className="mb-6 inline-flex p-4 bg-neutral-900 rounded-none border border-neutral-800 group-hover:border-[#d4af37] transition-all duration-500 group-hover:rotate-3 shadow-lg">
                <item.icon className="w-8 h-8 text-neutral-400 group-hover:text-[#d4af37] transition-colors duration-300" />
              </div>

              <h3 className="text-xl font-serif text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
              <p className="text-neutral-400 font-light leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// CART DRAWER
const Cart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onCheckout
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-neutral-800 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-serif text-white">Your Selection</h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-white transition">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p className="uppercase tracking-widest text-sm">Your bag is empty</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 border-b border-neutral-800 pb-6"
                  >
                    <div className="w-20 h-24 bg-neutral-900 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium font-serif">{item.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="text-neutral-500 hover:text-red-500 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[#d4af37] text-sm mt-1">Rs. {item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-[#0a0a0a]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-400 uppercase tracking-widest text-sm">Subtotal</span>
                  <span className="text-xl text-white font-serif">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <Button onClick={onCheckout} fullWidth>
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// CHECKOUT PAGE
const Checkout = ({
  cartItems,
  onBack,
  onComplete
}: {
  cartItems: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 container mx-auto px-6"
    >
      <button onClick={onBack} className="text-neutral-400 hover:text-white mb-8 flex items-center gap-2 text-sm uppercase tracking-widest transition">
        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Bag
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-serif text-white mb-8">Secure Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-[#d4af37] text-sm uppercase tracking-widest font-semibold border-b border-neutral-800 pb-2">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="First Name" className="bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-[#d4af37] transition" />
                <input required placeholder="Last Name" className="bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-[#d4af37] transition" />
              </div>
              <input required placeholder="Address" className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-[#d4af37] transition" />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="City" className="bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-[#d4af37] transition" />
                <input required placeholder="Postal Code" className="bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-[#d4af37] transition" />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="text-[#d4af37] text-sm uppercase tracking-widest font-semibold border-b border-neutral-800 pb-2">Payment Details</h3>
              <div className="relative">
                <CreditCard className="absolute top-3.5 left-3 text-neutral-500 w-5 h-5" />
                <input required placeholder="Card Number" className="w-full bg-neutral-900 border border-neutral-800 p-3 pl-10 text-white focus:outline-none focus:border-[#d4af37] transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="MM/YY" className="bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-[#d4af37] transition" />
                <input required placeholder="CVC" className="bg-neutral-900 border border-neutral-800 p-3 text-white focus:outline-none focus:border-[#d4af37] transition" />
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading} className="mt-8">
              {loading ? 'Processing...' : `Pay Rs. ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            </Button>
          </form>
        </div>

        <div className="bg-neutral-900 p-8 h-fit">
          <h3 className="text-xl font-serif text-white mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-neutral-800 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{item.name}</p>
                  <p className="text-neutral-400 text-xs mt-1">Qty: {item.quantity}</p>
                </div>
                <p className="text-white text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            <div className="flex justify-between text-neutral-400 text-sm">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-400 text-sm">
              <span>Shipping</span>
              <span>Rs. {SHIPPING_COST.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-400 text-sm">
              <span>Tax (5%)</span>
              <span>Rs. {tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between text-white text-lg font-serif pt-4 border-t border-neutral-800">
              <span>Total</span>
              <span>Rs. {total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Show SweetAlert notification
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Added to Bag',
      text: product.name,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#0a0a0a',
      color: '#fff',
      iconColor: '#d4af37',
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    Swal.fire({
      title: 'Remove Item?',
      text: `Remove ${item?.name} from your bag?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Keep it',
      background: '#0a0a0a',
      color: '#fff',
      confirmButtonColor: '#d4af37',
      cancelButtonColor: '#333',
      iconColor: '#d4af37',
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems(prev => prev.filter(item => item.id !== id));
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: 'Item Removed',
          showConfirmButton: false,
          timer: 1500,
          background: '#0a0a0a',
          color: '#fff',
          iconColor: '#d4af37',
        });
      }
    });
  };

  // Navigation Logic
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage(Page.PRODUCT_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    setIsCartOpen(false);
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage(Page.CHECKOUT);
    window.scrollTo(0, 0);
  };

  const handleOrderComplete = () => {
    Swal.fire({
      title: 'Order Confirmed!',
      html: `
        <div style="text-align: center;">
          <p style="margin-bottom: 10px;">Thank you for your purchase!</p>
          <p style="color: #d4af37;">Your luxury footwear is being prepared with care.</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Continue Shopping',
      background: '#0a0a0a',
      color: '#fff',
      confirmButtonColor: '#d4af37',
      iconColor: '#d4af37',
    }).then(() => {
      setCartItems([]);
      handleNavClick(Page.HOME);
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4af37] selection:text-black">
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onNavClick={handleNavClick}
        currentPage={currentPage}
      />

      <main>
        {currentPage === Page.HOME && (
          <>
            <Hero onShopNow={() => handleNavClick(Page.SHOP)} />

            {/* Features/Values Section with Background Image */}
            <section className="py-24 relative overflow-hidden">
              {/* Background Image and Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src="./pictures/carousel 8.webp"
                  alt="Luxury Leather Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/85" />
              </div>

              <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 border border-white/10 bg-black/40 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-serif text-[#d4af37] mb-4">Master Craftsmanship</h3>
                    <p className="text-neutral-300 font-light leading-relaxed">Every stitch is placed by hand by master artisans in Florence.</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-6 border border-white/10 bg-black/40 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-serif text-[#d4af37] mb-4">Premium Materials</h3>
                    <p className="text-neutral-300 font-light leading-relaxed">Sourced from the finest tanneries in Europe for unmatched quality.</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="p-6 border border-white/10 bg-black/40 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-serif text-[#d4af37] mb-4">Global Concierge</h3>
                    <p className="text-neutral-300 font-light leading-relaxed">White-glove delivery service to your doorstep, anywhere.</p>
                  </motion.div>
                </div>
              </div>
            </section>

            <CategorySplit onNavClick={handleNavClick} />

            {/* Featured Preview */}
            <div className="py-24 bg-[#0a0a0a]">
              <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-3xl font-serif">Trending Now</h2>
                  <button onClick={() => handleNavClick(Page.SHOP)} className="text-[#d4af37] hover:text-white transition flex items-center gap-2 uppercase tracking-widest text-xs">
                    View All <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRODUCTS.slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                  ))}
                </div>
              </div>
            </div>

            <AtelierSection />
            <NewsletterSection />
          </>
        )}

        {currentPage === Page.SHOP && (
          <ProductList products={PRODUCTS} onProductClick={handleProductClick} title="Full Collection" />
        )}

        {currentPage === Page.MEN && (
          <ProductList products={PRODUCTS} onProductClick={handleProductClick} gender="Men" title="Men's Collection" />
        )}

        {currentPage === Page.WOMEN && (
          <ProductList products={PRODUCTS} onProductClick={handleProductClick} gender="Women" title="Women's Collection" />
        )}

        {currentPage === Page.PRODUCT_DETAIL && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => handleNavClick(Page.SHOP)}
            onAddToCart={addToCart}
          />
        )}

        {currentPage === Page.CHECKOUT && (
          <Checkout
            cartItems={cartItems}
            onBack={() => { setIsCartOpen(true); handleNavClick(Page.SHOP); }}
            onComplete={handleOrderComplete}
          />
        )}

        {currentPage === Page.CONTACT && <ContactPage />}
        {currentPage === Page.SHIPPING && <ShippingPage />}
        {currentPage === Page.SIZE_GUIDE && <SizeGuidePage />}
        {currentPage === Page.CARE && <CarePage />}

      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <StylistChat />

      <footer className="bg-black border-t border-neutral-900 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <img
                src="/pictures/logo.png"
                alt="MI MARTZ"
                className="h-16 w-auto object-contain mb-6"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <h2 className="hidden text-2xl font-serif font-bold text-white mb-6">MI <span className="text-[#d4af37]">MARTZ</span></h2>
              <p className="text-neutral-500 max-w-sm mb-6 font-light">
                Redefining luxury footwear for the modern era. Where tradition meets innovation.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/mi_martzz?igsh=bXlwZ3NwOTJ0ZXdh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-[#d4af37] hover:border-[#d4af37] transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-[#d4af37] hover:border-[#d4af37] transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-[#d4af37] hover:border-[#d4af37] transition">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-serif mb-6">Collection</h4>
              <ul className="space-y-4 text-neutral-500 text-sm tracking-wide">
                <li><button onClick={() => handleNavClick(Page.MEN)} className="hover:text-[#d4af37] transition">Men</button></li>
                <li><button onClick={() => handleNavClick(Page.WOMEN)} className="hover:text-[#d4af37] transition">Women</button></li>
                <li><button onClick={() => handleNavClick(Page.SHOP)} className="hover:text-[#d4af37] transition">New Arrivals</button></li>
                <li><button onClick={() => handleNavClick(Page.SHOP)} className="hover:text-[#d4af37] transition">Accessories</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-serif mb-6">Client Services</h4>
              <ul className="space-y-4 text-neutral-500 text-sm tracking-wide">
                <li><button onClick={() => handleNavClick(Page.CONTACT)} className="hover:text-[#d4af37] transition">Contact Us</button></li>
                <li><button onClick={() => handleNavClick(Page.SHIPPING)} className="hover:text-[#d4af37] transition">Shipping & Returns</button></li>
                <li><button onClick={() => handleNavClick(Page.SIZE_GUIDE)} className="hover:text-[#d4af37] transition">Size Guide</button></li>
                <li><button onClick={() => handleNavClick(Page.CARE)} className="hover:text-[#d4af37] transition">Care Instructions</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-xs tracking-widest uppercase">
            <p>&copy; 2024 MI Martz. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
