import './App.css'
import Widget from "./components/ui/Widget.tsx";

function App() {
  return (
    <div className='bg-white text-black dark:bg-gray-800 dark:text-white'>
      <h1 className={'text-4xl text-center font-bold'}>Welcome!</h1>
      <div className='flex justify-center items-center h-screen w-screen'>
        <Widget name='BoxMe'/>
      </div>
    </div>
  )
}

export default App
