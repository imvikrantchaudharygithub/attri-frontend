// src/slices/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import userReducer from './userSlice';
import popupReducer from './popupSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  popup: popupReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
