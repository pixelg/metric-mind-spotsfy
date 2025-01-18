import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <ModeToggle />
      <Button className="dark:bg-amber-400">Click Me</Button>
    </App>
  </StrictMode>,
)
