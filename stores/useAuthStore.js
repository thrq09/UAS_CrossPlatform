// stores/useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  registeredUser: null,
  user: null,

  register: (username, password) => {
    const newUser = {
      username,
      password,
      firstName: username, // Gunakan username sebagai firstName awal
      profilePic: "https://i.pravatar.cc/300",
      phone: "",
      email: "",
    };
    set({ registeredUser: newUser });
  },

  login: (username, password) => {
    const registeredUser = get().registeredUser;

    if (
      registeredUser &&
      registeredUser.username === username &&
      registeredUser.password === password
    ) {
      set({ user: registeredUser }); // Pakai semua data, termasuk firstName
    } else {
      alert("Username or password incorrect.");
    }
  },

  logout: () => set({ user: null }),
}));
export default useAuthStore;
