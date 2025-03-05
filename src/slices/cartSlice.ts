import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define type for cart state
interface CartState {
  items: any; // Use a more specific type in real code
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    
    // Remove item from cart by id
    removeFromCart: (state, action: PayloadAction<any>) => {
      const itemToRemove = action.payload;
      console.log("Removing item:", itemToRemove);
      
      // Remove by comparing entire object or by ID
      state.items = state.items.filter((item: any) => {
        // If item has _id property, compare by _id
        if (itemToRemove._id && item._id) {
          return item._id !== itemToRemove._id;
        }
        // Fallback to object comparison
        return item !== itemToRemove;
      });
    },
    
    // Clear all items from cart
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer; 