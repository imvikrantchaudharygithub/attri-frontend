import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define type for cart state
interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    mrp: number;
    discount: number;
    images: string[];
  };
  quantity: number;
  price: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<{
      product: CartItem['product'];
      quantity: number
    }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * product.price;
      } else {
        state.items.push({
          product,
          quantity,
          price: product.price,
          totalPrice: quantity * product.price
        });
      }
      
      // Update cart total
      state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
    },
    
    // Remove item from cart by id
    removeFromCart: (state, action: PayloadAction<any>) => {
      const itemToRemove = action.payload;
      console.log("Removing item:", itemToRemove);
      
      // Remove by comparing product ID
      state.items = state.items.filter((item: CartItem) => 
        item.product._id !== itemToRemove.product._id
      );
      console.log("Updated cart items:", state.items);
    },
    
    // Clear all items from cart
    clearCart: (state) => {
      state.items = [];
    },

    updateQuantity: (state, action: PayloadAction<{productId: string; quantity: number}>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product._id === productId);
      
      if (item) {
        item.quantity = quantity;
        item.totalPrice = quantity * item.product.price;
        state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
      }
    },
    
    // Increment quantity by 1
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.product._id === productId);
      
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.product.price;
        state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
      }
    },
    
    // Decrement quantity by 1 (minimum 1)
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.product._id === productId);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.product.price;
        state.total = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
      }
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  updateQuantity,
  incrementQuantity,
  decrementQuantity 
} = cartSlice.actions;

// Selectors
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartItemCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;