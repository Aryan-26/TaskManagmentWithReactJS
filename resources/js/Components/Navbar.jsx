import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

function Navbar() {
  const user = usePage().props.auth.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
console.log(user.role + `/dashboard`);
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link href={'/'+ user.role + '/dashboard'} className="text-indigo-600 font-bold text-2xl">
              <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {user.role === 'admin' && (
              <>
                <Link
                  href={route('users.index')}
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Users
                </Link>
                <Link
                  href='/tasks'
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Tasks
                </Link>
                <Link
                  href='/projects'
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Projects
                </Link>
                <Link
                  href={route('client.index')}
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Clients
                </Link>
              </>
            )}
            {user.role === 'employee' && (
              <>
                <Link
                  href="/tasks"
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Tasks
                </Link>
                <Link
                  href="/projects"
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Projects
                </Link>
              </>
            )}
            {user.role === 'client' && (
              <>
              
                {/* <Link
                  href="/tasks"
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Tasks
                </Link> */}

              <Link
                href="/projects"
                className="text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                Projects
              </Link>
              </>
            )}
          </div>

        
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              {user.name}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <Link
                  href={route('profile.index')}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
                <Link
                  method="post"
                  href={route('logout')}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>

      
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
