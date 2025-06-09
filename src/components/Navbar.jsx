import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user on mount and when localStorage changes
  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };
    loadUser();
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow flex items-center px-8 py-4">
      {/* Logo on the left */}
      <div className="flex-shrink-0 mr-16 font-bold text-xl text-purple-900">
        <Link to="/">TravelTech</Link>
      </div>

      {/* Centered nav links */}
      <div className="flex-1 flex justify-center gap-16">
        <Link to="/" className="text-gray-700 hover:text-pink-500 font-medium transition">Home</Link>
        <Link to="/destinations" className="text-gray-700 hover:text-pink-500 font-medium transition">Destinations</Link>
        <Link to="/about" className="text-gray-700 hover:text-pink-500 font-medium transition">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-pink-500 font-medium transition">Contact</Link>
      </div>

      {/* User greeting or Login/Signup button */}
      <div className="ml-auto">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Hi, {user.fullName}</span>
            <button
              onClick={handleLogout}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-900"
          >
            Login / Signup
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;