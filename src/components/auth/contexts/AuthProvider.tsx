import { ReactNode, useEffect, useState } from "react";
import { AuthState } from "@/components/auth/types/AuthTypes.tsx";
import { AuthContext } from "@/components/auth/contexts/AuthContext.tsx";

const storageKey = "metric-minds-auth-state";

export const AuthProvider = ({ children}: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [accessToken, setAccessTokenInternal] = useState("");
  const [refreshToken, setRefreshTokenInternal] = useState("");

  const setAccessToken = (token: string) => {
    setAccessTokenInternal(token);
    setIsAuthenticated(!!token);
  }

  const setRefreshToken = (token: string) => {
    setRefreshTokenInternal(token);
    setShouldRefresh(!!token);
  }

  const authState : AuthState = {
    isAuthenticated,
    shouldRefresh,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  }

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuthState = localStorage.getItem(storageKey);
    if (savedAuthState) {
      const parsedState = JSON.parse(savedAuthState);
      setAccessToken(parsedState.accessToken || "");
      setRefreshToken(parsedState.refreshToken || "");
    }
  }, []);

  // Save auth state into localStorage on changes
  useEffect(() => {
    const state = { accessToken, refreshToken };
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ authFlowType: "PKCE",  authState }}>
      {children}
    </AuthContext.Provider>
  );
};