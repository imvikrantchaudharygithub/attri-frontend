import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartCountState {
  count: number;
}

const initialState: CartCountState = {
  count: 0,
};

const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    resetCartCount: (state) => {
      state.count = 0;
    },
  },
});

export const { setCartCount, resetCartCount } = cartCountSlice.actions;
export default cartCountSlice.reducer;
