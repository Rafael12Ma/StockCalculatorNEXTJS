import { create } from "zustand"


export const useTheme = create((set) => ({
    theme: 'light',
    toggleThemes: () => set((state) => ({ theme: state.theme === "light" ? "dark" : 'light' }))
}))