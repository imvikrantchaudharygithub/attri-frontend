import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  amount: string;
}

const initialState: UserState = {
  id: '',
  amount: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.amount = action.payload.amount;
    },
    clearUser: (state) => {
      state.id = '';
      state.amount = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
