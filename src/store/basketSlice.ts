import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: BasketState = {
  items: [],
  isOpen: false,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.isOpen = true;
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearBasket: (state) => {
      state.items = [];
    },
    toggleBasket: (state) => {
      state.isOpen = !state.isOpen;
    },
    setBasketOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { 
  addToBasket, 
  removeFromBasket, 
  updateQuantity, 
  clearBasket, 
  toggleBasket,
  setBasketOpen
} = basketSlice.actions;

export default basketSlice.reducer; 