import Layout from "@/components/Layout";
import Widget from "@/components/ui/Widget";
import DataPage from "@/components/payments/page";

function App() {
  return (
    <Layout>
      <h1 className={'text-3xl text-center font-bold w-screen'}>Welcome Brent!</h1>
      <div className='flex justify-center items-center w-1/2 h-1/2 m-auto'>
        <Widget title={'Widget 1'} />
        <Widget title={'Widget 2'} />
        <Widget title={'Widget 3'} />
      </div>

      <div className="min-w-fit lg: w-1/2 p-4 m-auto">
        <DataPage />
      </div>
    </Layout>
  )
}

export default App
