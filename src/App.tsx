import './App.css'
import Widget from "./components/ui/Widget.tsx";

function App() {
  return (
    <div className='bg-white text-black dark:bg-gray-800 dark:text-stone-200 p-4'>
      <h1 className={'text-4xl text-center font-bold'}>Welcome!</h1>
      <div className='flex justify-center items-center max-w-screen-lg h-screen m-auto'>
        <Widget name='BoxMe'/>
        <Widget name='BoxMe'/>
        <Widget name='BoxMe'/>
      </div>
    </div>
  )
}

export default App
