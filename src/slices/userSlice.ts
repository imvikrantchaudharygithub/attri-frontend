import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
  balance: string;
  phone: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  balance: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.balance = action.payload.balance;
      state.phone = action.payload.phone;
    },
    clearUser: (state) => {
      state.id = '';
      state.name = '';
      state.balance = '';
      state.phone = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
