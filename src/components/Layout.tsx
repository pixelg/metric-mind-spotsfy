import {ThemeProvider} from "@/components/theme-provider.tsx";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='bg-gray-100 dark:bg-gray-900'>
        {children}
      </div>
    </ThemeProvider>
  )
}