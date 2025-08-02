import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm px-8 flex items-center justify-between fixed z-50 top-0 left-0 right-0 h-20">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <img
          src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
          alt="Kanini Logo"
          className="w-32 h-auto object-contain"
        />
      </div>

      {/* Navigation + CTA */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-800">
          <div className="cursor-pointer">What We Do ▼</div>
          <div className="cursor-pointer">Who We Are ▼</div>
          <div className="cursor-pointer">Industries We’re Into ▼</div>
          <div className="cursor-pointer">Join Us ▼</div>
          <div className="cursor-pointer">Our Insights ▼</div>
        </nav>
        <button className="bg-[#0A0A23] text-white text-sm font-bold py-2 px-5 rounded-md hover:bg-[#1a1a40] transition-all">
          Talk to Us
        </button>
      </div>
    </header>
  );
};

export default Header;