import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  profileModalOpen: boolean;
  createDiscussionModalOpen: boolean;
}

const initialState: ModalState = {
  profileModalOpen: false,
  createDiscussionModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleProfileModal: (state) => {
      state.profileModalOpen = !state.profileModalOpen;
    },
    toggleCreateDiscussionModalOpen: (state) => {
      state.createDiscussionModalOpen = !state.createDiscussionModalOpen;
    },
    // optional: explicitly set modals via payload
    setProfileModal: (state, action: PayloadAction<boolean>) => {
      state.profileModalOpen = action.payload;
    },
    setCreateDiscussionModal: (state, action: PayloadAction<boolean>) => {
      state.createDiscussionModalOpen = action.payload;
    },
  },
});

export const {
  toggleProfileModal,
  toggleCreateDiscussionModalOpen,
  setProfileModal,
  setCreateDiscussionModal,
} = modalSlice.actions;

export default modalSlice.reducer;
