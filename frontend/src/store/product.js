import { create } from 'zustand';

export const userProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields.' };
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const { data } = await res.json();
    set((state) => ({ products: [...state.products, data] }));
    return { success: true, message: 'products created successfully!' };
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const { data } = await res.json();
    set({ products: data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };
    // set(state => ({products : state}))
    return { success: true, message: 'products deleted successfully!' };
  },
}));
