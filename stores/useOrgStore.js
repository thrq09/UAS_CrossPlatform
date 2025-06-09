// src/store/useOrgStore.js
import { create } from 'zustand';

export const useOrgStore = create((set) => ({
  selectedOrg: 'Uki Matcha PURI',
  setSelectedOrg: (org) => set({ selectedOrg: org }),
}));

export default useOrgStore;