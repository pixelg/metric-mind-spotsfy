import './Widget.css';

function Widget(props: { title: string; }) {
  return (
    <div className='w-1/2 h-1/2 bg-amber-400 rounded-xl p-3 m-3'>
      <h2 className='text-2xl overflow-auto p-1'>{props.title}</h2>
      <p className='color-me-special p-2'>Lorem ipsum, Lorem ipsum, Lorem ipsum,</p>
    </div>
  );
}

export default Widget;