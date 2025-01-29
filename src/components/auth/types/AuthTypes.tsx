export type AuthFlowType = "PKCE" | "Implicit" | "Authorization Code";

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string;
  tokenType: string;
  scope: string;
  expiresIn: number;
  refreshToken: string;
};
