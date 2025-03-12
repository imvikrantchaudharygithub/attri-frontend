import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  isLoginPopupOpen: boolean;
}

const initialState: PopupState = {
  isLoginPopupOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openLoginPopup: (state) => {
      state.isLoginPopupOpen = true;
    },
    closeLoginPopup: (state) => {
      state.isLoginPopupOpen = false;
    },
  },
});

export const { openLoginPopup, closeLoginPopup } = popupSlice.actions;
export default popupSlice.reducer;
