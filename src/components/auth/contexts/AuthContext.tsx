import { createContext } from "react";
import { AuthState } from "@/components/auth/types/AuthTypes.tsx";

export interface AuthContextProps {
  authState: AuthState;
  setAuthState: (
    value: ((prevState: AuthState) => AuthState) | AuthState,
  ) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
