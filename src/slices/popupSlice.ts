import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  parentPopupOpen: boolean;
  signInOpen: boolean;
  signUpOpen: boolean;
  userInfoOpen: boolean;
  resetPasswordOpen: boolean;
}

const initialState: PopupState = {
  parentPopupOpen: false,
  signInOpen: false,
  signUpOpen: false,
  userInfoOpen: false,
  resetPasswordOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openParentPopup: (state) => {
      state.parentPopupOpen = true;
    },
    closeParentPopup: (state) => {
      state.parentPopupOpen = false;
      state.signInOpen = false;
      state.signUpOpen = false;
      state.userInfoOpen = false;
      state.resetPasswordOpen = false;
    },
    openSignIn: (state) => {
      state.parentPopupOpen = true;
      state.signInOpen = true;
      state.signUpOpen = false;
      state.userInfoOpen = false;
      state.resetPasswordOpen = false;
    },
    closeSignIn: (state) => {
      state.signInOpen = false;
      if (!state.signUpOpen && !state.userInfoOpen && !state.resetPasswordOpen) {
        state.parentPopupOpen = false;
      }
    },
    openSignUp: (state) => {
      state.parentPopupOpen = true;
      state.signUpOpen = true;
      state.signInOpen = false;
      state.userInfoOpen = false;
      state.resetPasswordOpen = false;
    },
    closeSignUp: (state) => {
      state.signUpOpen = false;
      if (!state.signInOpen && !state.userInfoOpen && !state.resetPasswordOpen) {
        state.parentPopupOpen = false;
      }
    },
    openUserInfo: (state) => {
      
      state.userInfoOpen = true;
      state.signInOpen = false;
      state.signUpOpen = false;
      state.resetPasswordOpen = false;
    },
    closeUserInfo: (state) => {
      state.userInfoOpen = false;
      if (!state.signInOpen && !state.signUpOpen && !state.resetPasswordOpen) {
        state.parentPopupOpen = false;
      }
    },
    openResetPassword: (state) => {
      state.parentPopupOpen = true;
      state.resetPasswordOpen = true;
      state.signInOpen = false;
      state.signUpOpen = false;
      state.userInfoOpen = false;
    },
    closeResetPassword: (state) => {
      state.resetPasswordOpen = false;
      if (!state.signInOpen && !state.signUpOpen && !state.userInfoOpen) {
        state.parentPopupOpen = false;
      }
    },
  },
});

export const {
  openParentPopup,
  closeParentPopup,
  openSignIn,
  closeSignIn,
  openSignUp,
  closeSignUp,
  openUserInfo,
  closeUserInfo,
  openResetPassword,
  closeResetPassword,
} = popupSlice.actions;

export default popupSlice.reducer;
