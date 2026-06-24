

export default function About() {
  return (
    <div className='mt-10 md:mt-20 lg:mt-36 max-w-7xl mx-auto px-4' data-aos="fade-up">
      <div className='relative flex flex-col md:flex-row items-center my-6 md:my-10'>
        <div className='w-full md:w-[55%]'>
          <img src="about/about-img-2.jpg" className='w-full h-64 md:h-96 lg:h-[480px] rounded-md object-cover' alt="" />
        </div>
        <div className='relative md:absolute md:right-0 md:top-10 w-full md:w-[60%] p-6 md:p-8 bg-[rgba(236,241,245,0.8)] border-8 rounded-lg border-[#dbe5f3] -mt-16 md:mt-0 flex flex-col gap-3 md:gap-4 justify-center'>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#161f37]">Our Mission</h2>
          <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquet, nunc nisl aliquam nisl, eget ultricies nunc nisl eget nunc.</p>
          <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione quo veniam magni explicabo, <br /> quidem cupiditate enim at aliquid esse optio blanditiis ullam molestias omnis voluptates tempore aspernatur harum, ut nemo?    nisl eget ultricies aliquet, nunc nisl aliquam nisl, eget ultricies nunc nisl eget nunc.</p>
          <button className='text-white w-32 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-2 py-3.5 cursor-pointer'>Read More</button>
        </div>
      </div>
    </div>
  )
}
