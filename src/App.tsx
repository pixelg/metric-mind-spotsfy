import './App.css'

function App() {
  return (
    <>
      <div data-theme="dark" className={"bg-gray-700 self-center w-max h-max p-5 m-5 rounded border border-amber-500"}>
        <h1 className={"text-4xl text-center"}>
          Playground
        </h1>

        <p className={"m-4"}>This is a paragraph that can go on and on and on</p>
        <ul className={"p-6 list-disc"}>
          <li>Item 1</li>
        </ul>

        <button className={"bg-amber-500 hover:bg-amber-300 px-5 py-2 rounded-full font-semibold text-white border border-amber-500"}>
          Search
        </button>
      </div>


    </>
  )
}

export default App
