function Widget(props: { name: string; }) {
  return (
    <div className='w-1/2 h-1/2 bg-amber-400'>
      <h2 className='text-black text-3xl p-1'>Widget {props.name && props.name.toUpperCase()}</h2>
    </div>
  );
}

export default Widget;