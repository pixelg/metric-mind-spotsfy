import { ReactNode, useEffect, useState } from "react";
import { AuthState } from "@/components/auth/types/AuthTypes.tsx";
import { AuthContext } from "@/components/auth/contexts/AuthContext.tsx";

const storageKey = "metric-minds-auth-state";
const initAuthState = {
  accessToken: "",
  tokenType: "",
  isAuthenticated: false,
  scope: "",
  expiresIn: 0,
  refreshToken: "",
}

export const AuthProvider = ({ children}: { children: ReactNode }) => {
  const [ authState, setAuthState ] = useState<AuthState>(() => {
    const savedAuthState = localStorage.getItem(storageKey);
    try {
      return savedAuthState ? JSON.parse(savedAuthState!) as AuthState : initAuthState;
    } catch (e) {
      console.error("Error parsing auth state from localStorage", e);
      return initAuthState;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Save auth state into localStorage on changes
  useEffect(() => {
    if (isLoading) return;

    console.log("Saving auth state to localStorage", authState);
    localStorage.setItem(storageKey, JSON.stringify(authState));
  }, [authState, isLoading]);

  return (
    <AuthContext value={{authState, setAuthState}}>
      {children}
    </AuthContext>
  );
};