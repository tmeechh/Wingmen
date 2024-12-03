import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, setSortOption } = useProductStore();
  // Initialize dark mode state based on localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'; // Check localStorage first
  });

  // Sync dark mode with the HTML element and localStorage
  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <header className="p-4 shadow flex-col flex lg:flex-row dark:bg-black dark:shadow-2xl items-center justify-between ">
        <h1 className="text-xl mb-5 lg:mb-0 dark:text-white md:text-3xl font-bold">
          Wingmen <span className="text-[#820505]">Store</span>
        </h1>

        <div className="grid  grid-cols-2 gap-4 w-full lg:flex lg:space-x-4 lg:w-3/5">
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="p-2 border rounded outline-none shadow w-full lg:w-1/2"
          />

          {/* Sorting Dropdown */}
          <select
            onChange={handleSort}
            className="p-2 shadow border rounded w-full lg:w-auto"
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2  text-sm w-fit  lg:w-fit border rounded-xl shadow bg-gray-100 dark:bg-black dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white dark:text-white"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
