import { ReactNode } from "react";
import { ThemeProvider } from "@/components/themes/ThemeProvider.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSidebar.tsx";
import { ModeToggle } from "@/components/themes/ModeToggle.tsx";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="metric-mind-theme">
      <div className="bg-white text-black dark:text-white dark:bg-gray-800">
        <SidebarProvider>
          <AppSidebar />
          <main className="container">
            <SidebarTrigger />
            <ModeToggle />
            <div>{children}</div>
          </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
}
