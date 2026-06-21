import React from 'react'

export default function About() {
  return (
    <div className='mt-70 max-w-7xl mx-auto' data-aos="fade-up">
        <div className='flex gap-5 items-center my-10 relative justify-between'>
            <div className=''><img src="about/about-img-2.jpg" className='h-120 rounded-md' alt="" /></div>
            <div className='p-5 w-[60%] h-100 bg-[rgba(236,241,245,0.8)] border-8 rounded-lg flex flex-col absolute top-10 left-100 gap-5 justify-center border-[#dbe5f3]'>
                <h2 className="font-bold text-6xl text-[#161f37]">Our Mission</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquet, nunc nisl aliquam nisl, eget ultricies nunc nisl eget nunc.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione quo veniam magni explicabo, <br /> quidem cupiditate enim at aliquid esse optio blanditiis ullam molestias omnis voluptates tempore aspernatur harum, ut nemo?    nisl eget ultricies aliquet, nunc nisl aliquam nisl, eget ultricies nunc nisl eget nunc.     </p>

                <button className='text-white w-32 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-2 py-3.5 cursor-pointer'>Read More</button> 
            </div>
        </div>
    </div>
  )
}
