import {Button} from "@/components/ui/button.tsx";
import Layout from "@/components/Layout.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

function App() {
  return (
    <Layout>
      <ModeToggle />
      <div>
        <h1>Hello World</h1>
        <Button className='bg-amber-200 dark:bg-lime-500'>Click</Button>
      </div>
    </Layout>
  )
}

export default App
