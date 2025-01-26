import { createContext } from "react";
import { AuthContextProvider, AuthFlowType, initAuthState } from "@/components/auth/types/AuthTypes.tsx";

const defaultAuthContextProvider: AuthContextProvider = {
  authFlowType: "PKCE" as AuthFlowType,
  authState: initAuthState,
  setAuthState: () => {},
};

export const AuthContext = createContext<AuthContextProvider>(defaultAuthContextProvider);