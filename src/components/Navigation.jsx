import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Pages", path: "/pages" },
    { name: "Alumni", path: "/alumni" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">

        {/* Logo */}
        <div className="font-bold py-4"><img src="/logo.svg" alt="Logo" className="h-10" /></div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-0.5">
          {menu.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative block py-6 px-3 transition-all duration-300
                  before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px]
                  before:bg-[#3b60c9] before:transition-all before:duration-300
                  ${
                    isActive
                      ? "bg-[#dbe5f3] before:w-full"
                      : "before:w-0 hover:before:w-full hover:bg-[#dbe5f3]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-2xl">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col bg-white border-amber-500-t">
          {menu.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 border-amber-100-t hover:bg-gray-100"
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}