import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    // The navbar is fixed to the top, uses a semi-transparent dark background with a subtle blur effect
    // and has a shadow for a professional, modern feel.
    <nav className="fixed top-0 left-0 w-full z-50 bg-white  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 transition-colors duration-300 transform hover:scale-105">
            BlogForge
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-blue-400 text-lg font-medium hover:text-red-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-blue-400 text-lg font-medium hover:text-red-400 transition duration-300 ease-in-out"
            >
              About
            </Link>
            <Link 
              to="/blogs" 
              className="text-blue-400 text-lg font-medium hover:text-red-400 transition duration-300 ease-in-out"
            >
              Blogs
            </Link>
            <Link 
              to="/contact" 
              className="text-blue-400 text-lg font-medium hover:text-red-400 transition duration-300 ease-in-out"
            >
              Contact
            </Link>
          </div>

          {/* This section would be for a mobile menu, which is hidden for now */}
          <div className="flex md:hidden">
            {/* You could add a hamburger icon here for a mobile menu dropdown */}
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* You would place an SVG for the hamburger icon here */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
