import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSidebar.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=''>
        <SidebarProvider>
          <AppSidebar />
            <main>
              <div className={'h-10 bg-white text-black dark:text-white dark:bg-gray-800'}>
                <SidebarTrigger />
                <ModeToggle />
              </div>

              <div className='w-full h-full bg-white text-black dark:bg-gray-800 dark:text-white'>
                {children}
              </div>
            </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}