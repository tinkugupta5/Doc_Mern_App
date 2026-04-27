import React from 'react';

const Navbar = () => (
  <nav className="bg-white border-b border-amber-100 py-3 px-6 sticky top-0 z-50 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-2">
      <div className="bg-amber-100 p-1.5 rounded-lg text-amber-600 font-bold">SB</div>
      <div className="font-black text-xl tracking-tight text-gray-800">Smart Biodata</div>
    </div>
    <div className="flex gap-4 items-center">
        <span className="hidden md:inline text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 uppercase tracking-wider">Premium Biodata Maker</span>
    </div>
  </nav>
);

export default Navbar;
