import { useState, useEffect } from "react";
import { User, Lock, AlertCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { login } from "../services/api";

export default function Login() {
  const [ka_id, setKaId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, setToken } = useUser();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    console.log('Login component - useEffect triggered');
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    console.log('Login component - Saved token:', savedToken ? 'Present' : 'Missing');
    console.log('Login component - Saved user:', savedUser ? 'Present' : 'Missing');

    if (savedToken && savedUser) {
      console.log('Login component - Setting saved token and user');
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      console.log('Login component - Navigating to leaderboard');
      navigate("/leaderboard");
    }
  }, [setToken, setUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('Login attempt for:', ka_id);
      const res = await login(ka_id, password);
      console.log('Login response received:', res.data);

      // Save token + user data
      console.log('Setting token and user in context');
      setToken(res.data.token);
      setUser(res.data.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      console.log('Token and user set, navigating to leaderboard');
      navigate("/leaderboard");
    } catch (err) {
      console.error('Login error:', err);
      const message =
        err.response?.data?.msg ||
        err.message ||
        "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Small text typewriter effect
  function useTypewriter(text, speed = 50) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, [text, speed]);

    return displayedText;
  }

  const typedText = useTypewriter(
    "Creating sustainable solutions for your digital transformation",
    60
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-2 sm:p-4 pt-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center flex-grow">
        {/* Left side - branding */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <img
            src="https://kanini.com/wp-content/uploads/2022/06/Kanini-Logo.svg"
            alt="Kanini Logo"
            className="w-[200px] sm:w-[240px] lg:w-[280px] mb-4 sm:mb-6"
          />
          <p className="text-lg sm:text-xl text-gray-700 font-bold tracking-wide mb-3 sm:mb-4 px-2">
            {typedText}
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed px-4 sm:px-0">
            Welcome to Kanini's Interns Leaderboard — a smart platform that
            tracks intern progress, performance, and engagement. Stay updated,
            stay ahead.
          </p>
        </div>

        {/* Right side - login form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 w-full order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* KA ID */}
            <div>
              <label
                htmlFor="ka_id"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                KA ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  id="ka_id"
                  type="text"
                  value={ka_id}
                  onChange={(e) => setKaId(e.target.value)}
                  required
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white text-sm sm:text-base"
                  placeholder="Enter your KA ID"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white text-sm sm:text-base"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A0A23] hover:bg-[#1a1a40] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="text-lg sm:text-xl">→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-500">
              Need help? Contact your administrator
            </p>
            <p className="text-xs sm:text-sm">
              <Link
                to="/admin/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Admin? Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright message */}
      <footer className="mt-6 sm:mt-8 text-center text-gray-500 text-xs sm:text-sm select-none px-4">
        &copy; {new Date().getFullYear()} KANINI Software Solutions | All Rights Reserved | <a className="text-blue-600" href="https://kanini.com/privacy-policy/">Privacy Policy</a>
      </footer>
    </div>
  );
}
