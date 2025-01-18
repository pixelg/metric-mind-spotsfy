import {ThemeProvider} from "@/components/theme-provider.tsx";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='bg-white text-black dark:bg-gray-800 dark:text-stone-200 p-4'>
        {children}
      </div>
    </ThemeProvider>
  )
}