import {ReactNode, useEffect, useState} from "react";
import {AuthState, initAuthState} from "@/components/auth/types/AuthTypes.tsx";
import {AuthContext} from "@/components/auth/contexts/AuthContext.tsx";

const storageKey = "metric-minds-auth-state";

export const SpotifyAuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initAuthState);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuthState = localStorage.getItem(storageKey);
    if (savedAuthState) {
      setAuthState(JSON.parse(savedAuthState));
    }
  }, []);

  // Save auth state into localStorage on changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authFlowType: "PKCE", authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};