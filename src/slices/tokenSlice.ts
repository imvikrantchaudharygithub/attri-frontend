// src/slices/tokenSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '@/utils/auth';

interface TokenState {
  token: string | null;
}

const initialState: TokenState = {
  token: null
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        setToken(action.payload); // Sync with localStorage
      }
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    }
  }
});

export const { setToken: setReduxToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
