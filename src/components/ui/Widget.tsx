import './Widget.css';

function Widget(props: { name: string; }) {
  return (
    <div className='w-1/2 h-1/2 bg-amber-400 rounded-xl p-4 m-4'>
      <h2 className='text-3xl p-1'>{props.name && props.name.toUpperCase()}</h2>
      <p className='color-me-special p-2'>This is a widget.</p>
    </div>
  );
}

export default Widget;