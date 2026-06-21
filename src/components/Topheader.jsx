import React from "react";
  import { Link } from 'react-router-dom';
export default function TopHeader() {

  return (
    <div className="bg-[#161f37] hidden md:block"> 
    <div className="flex flex-col md:flex-row items-center justify-between text-white max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-betwee text-white">
        <div className="mr-4"><span className="font-bold">Email</span> : <span className="font-normal">info@alumni.org</span></div>
        <div><span className="font-bold">Phone</span> : <span className="font-normal">+1 (123) 456-7890</span></div>
      </div>
      <div className="flex items-center space-x-4 mt-2 md:mt-0">
        <div className="bg-[#3b60c9] transition duration-300 py-2 hover:bg-[#1dd983] px-4 cursor-pointer">
          <Link to="/login">Login</Link>  
        </div>
        <div className="bg-[#1dd983] transition duration-300 py-2 hover:bg-[#2a489e] px-4 cursor-pointer">
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
    </div>
  );
}
