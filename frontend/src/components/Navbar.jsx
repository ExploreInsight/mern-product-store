import React from "react";  
import { Link } from "react-router-dom";
import { IoIosSunny } from "react-icons/io";
import { IoMoonSharp, IoCreate } from "react-icons/io5";
import '../styles/Navbar.css';

export default function Navbar({isDarkMode,toggleDarkMode}) {

  return (
    <header className="nav-container">
      <nav className="nav">
        {/* Logo on the left side */}
        <div className="logo-btn">
          <Link to="/">Product Store 🛒</Link>
        </div>

        {/* Links and toggle on the right side */}
        <ul className="nav-btn">
          <li className="add-btn">
            <Link to="/product" aria-label="Create Product">
              <IoCreate size={30} />
            </Link>
          </li>
          <li className="toggle-btn">
            <span aria-label="Toggle Dark Mode" onClick={toggleDarkMode}>
              {isDarkMode ? <IoIosSunny size={30} /> : <IoMoonSharp size={27} />}
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
