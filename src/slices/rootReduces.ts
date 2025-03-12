// src/slices/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import userReducer from './userSlice';
import popupReducer from './popupSlice';
import cartReducer from './cartSlice';
import cartCountReducer from './loginUserSlice';
const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  popup: popupReducer,
  cart: cartReducer,
  cartCount: cartCountReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
