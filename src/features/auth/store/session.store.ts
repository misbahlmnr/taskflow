import { create } from "zustand";
import { Session } from "@/features/auth/type";

type SessionState = {
  session: Session | null;
  isAuthenticated: boolean;

  setSession: (session: Session) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  isAuthenticated: false,
  setSession: (session) =>
    set({
      session,
      isAuthenticated: true,
    }),
  clearSession: () =>
    set({
      session: null,
      isAuthenticated: false,
    }),
}));
