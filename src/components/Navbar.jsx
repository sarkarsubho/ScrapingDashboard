import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path as necessary

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo & Brand */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-8 h-8" /> {/* Optional */}
        <span className="text-xl font-bold text-blue-700">
          AUTO <span className="text-black">SCRAPE</span>
        </span>
      </Link>

      {/* Navigation Buttons */}
      <div className="space-x-6">
        <Link
          to="/"
          className={`text-gray-700 font-medium hover:text-blue-600 transition duration-200 ${
            location.pathname === "/" ? "underline text-blue-700" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/Allpost"
          className={`text-gray-700 font-medium hover:text-blue-600 transition duration-200 ${
            location.pathname === "/Allpost" ? "underline text-blue-700" : ""
          }`}
        >
          POST to WP
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
