import { ThemeProvider } from "@/components/theme-provider.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/app-sidebar.tsx";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='w-full h-full bg-white text-black dark:bg-gray-800 dark:text-white p-4'>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}