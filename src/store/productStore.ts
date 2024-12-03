import { create } from 'zustand';

// Define TypeScript types for product and store
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

interface ProductStore {
  products: Product[];
  searchQuery: string;
  sortOption: string;
  setProducts: (products: Product[]) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: string) => void;
}

// Zustand store for managing product data and search state
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  searchQuery: '',
  sortOption: 'default',
  setProducts: (products) => set({ products }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortOption: (option) => set({ sortOption: option }),
}));
