import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import logoImage from '../assets/logo.svg';

const categories = [
  { name: "general", id: 1, icon: "🌐" },
  { name: "business", id: 2, icon: "💼" },
  { name: "entertainment", id: 3, icon: "🎬" },
  { name: "health", id: 4, icon: "🏥" },
  { name: "science", id: 5, icon: "🔬" },
  { name: "sports", id: 6, icon: "⚽" },
  { name: "technology", id: 7, icon: "💻" }
];

function Navbar({ onCategoryChange, onCountrySearch, selectedCategory }) {
  const [searchQuery, setSearchQuery] = useState("");

  const countryOptions = {
    us: "United States",
    gb: "United Kingdom",
    ae: "UAE",
    ar: "Argentina",
    at: "Austria",
    au: "Australia",
    be: "Belgium",
    bg: "Bulgaria",
    br: "Brazil",
    ca: "Canada",
    ch: "Switzerland",
    cn: "China",
    co: "Colombia",
    de: "Germany",
    eg: "Egypt",
    fr: "France",
    sa: "Saudi Arabia"
  };

  const handleSearch = () => {
    const countryCode = searchQuery.trim().toLowerCase();
    if (!countryCode) {
      alert("الرجاء إدخال رمز الدولة");
      return;
    }
    if (countryCode in countryOptions) {
      onCountrySearch(countryCode);
      setSearchQuery(countryCode.toUpperCase());
    } else {
      alert("عذراً، لا توجد أخبار متاحة لهذه الدولة\n\nالدول المتاحة:\n" + 
        Object.entries(countryOptions)
          .map(([code, name]) => `${code.toUpperCase()} - ${name}`)
          .join("\n")
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          {/* logo */}
          <div className='flex items-center gap-2 mr-9'>
                        <img className='w-20 h-12' src={logoImage} alt="logo" />
            <h2 className='font-bold text-2xl'><span className='text-blue-800'>Current</span><span className='text-blue-500'>News</span></h2>
          </div>

          {/* categories */}
          <div className='flex flex-wrap justify-center items-center gap-3'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.name)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-sm
                  flex items-center gap-2 hover:scale-105
                  ${selectedCategory === category.name 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                  }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</span>
              </button>
            ))}
          </div>

          {/* searchBox */}
          <div className='flex items-center gap-2 w-full md:w-auto md:min-w-[300px]'>
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Enter country code (US, GB, FR...)'
                className='w-full px-4 py-2 rounded-lg border-2 border-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-gray-400 text-gray-600 uppercase'
                title="Click to see available country codes"
                onClick={() => {
                  if (!searchQuery) {
                    alert("Available country codes:\n" + 
                      Object.entries(countryOptions)
                        .map(([code, name]) => `${code.toUpperCase()} - ${name}`)
                        .join("\n")
                    );
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                {searchQuery && countryOptions[searchQuery.toLowerCase()] && 
                  <span className="text-xs text-green-600 font-medium">{countryOptions[searchQuery.toLowerCase()]}</span>
                }
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors
                       flex items-center gap-2'
            >
              <IoSearchOutline className='text-xl'/>
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar