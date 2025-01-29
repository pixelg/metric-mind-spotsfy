import { ReactNode } from "react";
import { ThemeProvider } from "@/components/themes/ThemeProvider.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSidebar.tsx";
import { ModeToggle } from "@/components/themes/ModeToggle.tsx";

export default function BaseLayout({children} : {children: ReactNode}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="metric-mind-theme">
      <div className='container'>
        <SidebarProvider>
          <AppSidebar />
            <main>
              <div className={'h-10 bg-white text-black dark:text-white dark:bg-gray-800'}>
                <SidebarTrigger />
                <ModeToggle />
              </div>

              <div className='w-screen h-content bg-white text-black dark:bg-gray-800 dark:text-white'>
                {children}
              </div>
            </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}