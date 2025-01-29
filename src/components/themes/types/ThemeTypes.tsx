import { ReactNode } from "react"
export type Theme = "dark" | "light" | "system"

export type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}