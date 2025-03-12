import { create } from "zustand";

interface NavbarState {
  bgColor: string;
  iconColor: string;
  setNavbarStyles: (bgColor: string, iconColor: string) => void;
}

const useNavbarStore = create<NavbarState>((set) => ({
  bgColor: "bg-transparent",
  iconColor: "text-white",

  setNavbarStyles: (bgColor,  iconColor) => 
    set({ bgColor,  iconColor }),
}));

export default useNavbarStore;
