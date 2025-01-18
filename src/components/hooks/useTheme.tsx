import {useContext} from "react";
import {ThemeProviderContext} from "@/components/contexts/ThemeProviderContext.tsx";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  console.log(context);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}