import { useContext } from "react";
import { AuthContext } from "@/components/auth/contexts/AuthContext.tsx";

export function useAuthHook() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}