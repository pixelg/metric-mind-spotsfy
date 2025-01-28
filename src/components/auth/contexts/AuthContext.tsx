import { createContext } from "react";
import { AuthState } from "@/components/auth/types/AuthTypes.tsx";

export const AuthContext = createContext<AuthState | null>(null);