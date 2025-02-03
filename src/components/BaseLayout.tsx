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

              {/*<div className="w-screen h-screen bg-yellow-100 dark:bg-yellow-900 text-green-600 dark:text-green-300 flex items-center justify-center">*/}
              {/*  {children}*/}
              {/*</div>*/}

              <div className="w-screen min-h-screen pl-8 bg-gray-100 dark:bg-gray-800 text-blue-500 dark:text-blue-300 flex flex-col items-center justify-start">
                {children}
              </div>
            </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}