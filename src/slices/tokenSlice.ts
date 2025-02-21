// src/slices/tokenSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  token: string | null;
  isTokenSet: boolean;
}

const initialState: TokenState = {
  token: null,
  isTokenSet: false,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isTokenSet = true;
    },
    clearToken: (state) => {
      state.token = null;
      state.isTokenSet = false;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
