function Banner() {
  return (
    <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
      <div className='space-y-10 px-10'>
        <h1 className='font-serif text-7xl max-w-xl'>
          <span className='underline decoraction-black'>Medium</span> is a place
          to write, read, and connect
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </h2>
      </div>
      <img
        src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
        className='hidden md:inline-flex h-32 lg:h-full'
        alt=''
      />
    </div>
  )
}

export default Banner
