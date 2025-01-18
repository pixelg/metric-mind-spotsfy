import Layout from "@/components/Layout.tsx";
import Widget from "@/components/ui/Widget.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

function App() {
  return (
    <Layout>
      <ModeToggle />
      <h1 className={'text-4xl text-center font-bold w-screen mb-2'}>Welcome!</h1>
      <div className='flex justify-center items-center w-1/2 h-1/2 m-auto'>
        <Widget name={'Widget'} />
        <Widget name={'Widget'} />
        <Widget name={'Widget'} />
      </div>
    </Layout>
  )
}

export default App
