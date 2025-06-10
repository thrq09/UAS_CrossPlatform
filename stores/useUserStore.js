// stores/useUserStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    language: "English",
    role: "",
    contractType: "",
    section: "",
    profilePicture: null,
  },
  setUser: (userData) => set({ user: userData }),
  updateUser: (newData) =>
    set((state) => ({
      user: { ...state.user, ...newData },
    })),
}));
