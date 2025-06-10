import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState({ open: false, message: '', type: 'info' });
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
        // Save user info in localStorage
        localStorage.setItem('user', JSON.stringify(res.data.user));
        // Redirect to homepage
        navigate('/');
      } else {
        // Signup
        await axios.post('http://localhost:5000/api/auth/signup', {
          fullName,
          email,
          password,
        });
        setPopup({ open: true, message: 'Signup successful! Please login.', type: 'success' });
        setIsLogin(true);
      }
    } catch (err) {
      setPopup({
        open: true,
        message: err.response?.data?.error || 'Something went wrong',
        type: 'error',
      });
    }
  };

  const closePopup = () => setPopup({ ...popup, open: false });

  return (
    <div className="fixed inset-0 -z-10 bg-gray-100">
      {/* Popup */}
      {popup.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] border-t-4 border-purple-500 animate-popup flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-3 mb-3">
              {popup.type === 'error' ? (
                <svg className="w-10 h-10 text-red-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-green-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
                </svg>
              )}
              <span className={`text-lg font-semibold ${popup.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {popup.type === 'error' ? 'Error' : 'Success'}
              </span>
            </div>
            <div className="mb-6 text-gray-700 text-base">{popup.message}</div>
            <button
              onClick={closePopup}
              className="w-full py-2 rounded bg-purple-500 hover:bg-purple-700 text-white font-medium transition"
            >
              Close
            </button>
          </div>
          {/* Animations */}
          <style>
            {`
        .animate-fadeIn { animation: fadeInBg 0.2s; }
        .animate-popup { animation: popupScale 0.25s; }
        @keyframes fadeInBg { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popupScale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}
          </style>
        </div>
      )}
      <div className="min-h-screen pt-[64px] px-6 flex items-center justify-center">
        <div className="w-full max-w-[500px] mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {isLogin ? 'Welcome back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                {isLogin ? 'Login to continue your journey' : 'Register your account'}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition duration-200"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </span>{' '}
              <button
                onClick={toggleMode}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;