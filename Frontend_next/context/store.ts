import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";

// Zustand Store
const useAuth = create(
  persist(
    (set: any) => ({
      user: null,
      isAuthenticated: false,
      useAuthlogin: (newUser: any) => {
        set({ user: newUser, isAuthenticated: true });
      },
      useAuthlogout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    }
  )
);
export default useAuth;