import Layout from "@/components/Layout.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import Widget from "@/components/ui/Widget.tsx";

function App() {
  return (
    <Layout>
      <ModeToggle />
      <h1 className={'text-4xl text-center font-bold'}>Welcome!</h1>
      <div className='flex justify-center items-center max-w-screen-lg h-screen m-auto'>
        <Widget name={'Widget'} />
        <Widget name={'Widget'} />
        <Widget name={'Widget'} />
      </div>
    </Layout>
  )
}

export default App
