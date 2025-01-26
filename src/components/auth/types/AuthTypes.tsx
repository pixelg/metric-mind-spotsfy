export type AuthFlowType = "PKCE" | "Implicit" | "Authorization Code";

export type AuthState = {
  isAuthenticated: boolean;
  shouldRefresh: boolean;
  accessToken: string;
  refreshToken: string;
};

export const initAuthState: AuthState = {
  isAuthenticated: false,
  shouldRefresh: false,
  accessToken: "",
  refreshToken: "",
};

export interface AuthContextProvider {
  authFlowType: AuthFlowType;
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
}
