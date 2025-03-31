import React, { useState, useEffect } from "react";
import { ChevronRight, Mail, Lock } from "lucide-react";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getuserApi, signin } from "../../services/userServices";
import { login } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
const Signinc = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [position1, setPosition1] = useState({ x: 0, y: 0, scale: 1 });
  const [position2, setPosition2] = useState({ x: 0, y: 0, scale: 1 });
  const [position3, setPosition3] = useState({ x: 0, y: 0, scale: 1 });
  const dispatch=useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    const animateShapes = () => {
      const animate = (setter) => {
        const x = Math.random() * 80 - 40;
        const y = Math.random() * 80 - 40;
        const scale = 0.9 + Math.random() * 0.3;
        setter((prev) => ({ x, y, scale }));
      };

      // Initial animation
      animate(setPosition1);
      animate(setPosition2);
      animate(setPosition3);

      // Set interval for continuous animation
      const interval = setInterval(() => {
        animate(setPosition1);

        // Stagger the animations
        setTimeout(() => animate(setPosition2), 500);
        setTimeout(() => animate(setPosition3), 1000);
      }, 6000);

      return () => clearInterval(interval);
    };

    animateShapes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please fill in all fields.", {
        style: {
          border: "1px solid #e53e3e",
          padding: "16px",
          color: "#e53e3e",
        },
        iconTheme: {
          primary: "#e53e3e",
          secondary: "#ffe6e6",
        },
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        style: {
          border: "1px solid #e53e3e",
          padding: "16px",
          color: "#e53e3e",
        },
        iconTheme: {
          primary: "#e53e3e",
          secondary: "#ffe6e6",
        },
      });
      return;
    }
    try {
      const response = await signin(email, password);
      
      toast.success(response.data.message, {
        style: {
          border: "1px solid #38a169",
          padding: "16px",
          color: "#38a169",
        },
        iconTheme: {
          primary: "#38a169",
          secondary: "#e6ffe6",
        },
      });
      
      // First dispatch the Redux action
      dispatch(login({ uid: response.data.user, role: response.data.role }));
      
      // Then navigate after a small delay to ensure Redux state is updated
      setTimeout(() => {
        if (response.data.role === "admin") {
          navigate("/dashboard");
        } else if (response.data.role === "user") {
          navigate("/home");
        }
      }, 100);
        } catch (error) {
      toast.error(error.response, {
        style: {
          border: "1px solid #e53e3e",
          padding: "16px",
          color: "#e53e3e",
        },
        iconTheme: {
          primary: "#e53e3e",
          secondary: "#ffe6e6",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-800 to-blue-500 opacity-20 blur-3xl"
          style={{
            top: "-150px",
            left: "-150px",
            transform: `translate(${position1.x}px, ${position1.y}px) scale(${position1.scale})`,
            transition: "transform 6s ease-in-out",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-pink-700 to-purple-600 opacity-20 blur-3xl"
          style={{
            bottom: "-100px",
            right: "-100px",
            transform: `translate(${position2.x}px, ${position2.y}px) scale(${position2.scale})`,
            transition: "transform 6s ease-in-out",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-700 to-emerald-600 opacity-20 blur-3xl"
          style={{
            top: "50%",
            left: "30%",
            transform: `translate(${position3.x}px, ${position3.y}px) scale(${position3.scale})`,
            transition: "transform 6s ease-in-out",
          }}
        />
      </div>

      {/* Main card */}
      <div className="bg-gray-800 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 p-8 w-full max-w-md relative overflow-hidden">
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm"></div>

        <div className="flex flex-col space-y-6">
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
              ResumeAI
            </h1>
            <p className="text-gray-400 mt-1">Welcome back</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Email Address"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Password"
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-700/30 transition-all duration-200 transform hover:translate-y-[-2px]"
            >
              Sign In
              <ChevronRight size={18} className="ml-1" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center mt-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              className="flex items-center justify-center w-full py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span className="ml-2">Continue with Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-full py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
            >
              <Github size={20} />
              <span className="ml-2">Continue with GitHub</span>
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signinc;
