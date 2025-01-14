import './App.css'

function App() {
  return (
    <>
      <div data-theme="dark" className={"bg-gray-700 self-center w-max h-max p-5 m-5 rounded border border-amber-500"}>
        <h1 className={"text-4xl text-center font-bold"}>
          Playground
        </h1>

        <p className={"mt-4 mx-2"}>This is a paragraph that can go on and on and on</p>
        <div className={"m-4 border-amber-500 border"}>
          <ul role={'list'} className={"divide-y divide-amber-200"}>
            <li className={'p-4'}>Item 1</li>
            <li className={'p-4'}>Item 2</li>
            <li className={'p-4'}>Item 3</li>
            <li className={'p-4'}>Item 4</li>
          </ul>
        </div>

        <button className={"bg-amber-500 hover:bg-amber-300 px-5 py-2 rounded-full font-semibold text-white border border-amber-500"}>
          Search
        </button>
      </div>


    </>
  )
}

export default App
