// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Логотип или название сайта */}
        <Link to="/" className="text-2xl font-bold">
          MyFlatApp
        </Link>

        {/* Меню навигации */}
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/flats" className="hover:underline">Flats</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Поиск (можно оставить пустым для дальнейшей реализации) */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded bg-white text-black"
          />
        </div>

        {/* Меню пользователя (можно добавить позже) */}
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
