
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  gender: 'Men' | 'Women';
  image: string;
  images?: string[]; // Optional array of images for carousel
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Page {
  HOME = 'HOME',
  SHOP = 'SHOP',
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CONTACT = 'CONTACT',
  SHIPPING = 'SHIPPING',
  SIZE_GUIDE = 'SIZE_GUIDE',
  CARE = 'CARE',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
