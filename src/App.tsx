import { ButtonComponents } from "@/components/ui/button"
import './App.css'

function App() {
  return (
    <div className={"mx-auto my-auto"}>
      <h1 className={'text-4xl p-4 text-center bg-gray-700 font-bold'}>
        Spotify Me
      </h1>
      <div className={'flex justify-center py-10'}>
        <ButtonComponents.Button>Button</ButtonComponents.Button>
      </div>
    </div>
  )
}

export default App
