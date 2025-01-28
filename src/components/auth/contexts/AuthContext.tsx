import { createContext } from "react";
import { AuthContextProvider } from "@/components/auth/types/AuthTypes.tsx";

export const AuthContext = createContext<AuthContextProvider | null>(null);