import React, { useState, useEffect } from "react";
import { ChevronRight, Mail, Lock, User } from "lucide-react";
import { Github } from "lucide-react";
import toast from "react-hot-toast";
import { signupUser } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from '../../slices/authSlice'

const Signupc = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [position1, setPosition1] = useState({ x: 0, y: 0, scale: 1 });
  const [position2, setPosition2] = useState({ x: 0, y: 0, scale: 1 });
  const [position3, setPosition3] = useState({ x: 0, y: 0, scale: 1 });

  const navigate = useNavigate();
const dispatch=useDispatch()
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

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
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
      const response = await signupUser(name, email, password);
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
      console.log(response);
       dispatch(login({  uid: response.data.user,
              role: response.data.role,
            }))
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message, {
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

      <div className="bg-gray-800 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 p-8 w-full max-w-md relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm"></div>

        <div className="flex flex-col space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
              ResumeAI
            </h1>
            <p className="text-gray-400 mt-1">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Full Name"
              />
            </div>

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

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Confirm Password"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                  className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-300">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!checked}
              className={`w-full ${
                !checked && "cursor-not-allowed disabled"
              } flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-700/30 transition-all duration-200 transform hover:translate-y-[-2px]`}
            >
              Create Account
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

          <p
            onClick={() => navigate("/signin")}
            className="text-center text-gray-400 text-sm mt-6"
          >
            Already have an account?{" "}
            <a className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signupc;
