import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Plus,
  FileText,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { logoutApi } from "../../services/userServices";
import axios from "axios";

const Headerc = ({ setSelectedTab }) => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const respones = await logoutApi();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const uid = useSelector((state) => state.auth.uid);

  const [userData, setUserdata] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/details/${uid}`,
        { withCredentials: true }
      );

      setUserdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (uid) {
      console.log("useefect triggered");

      getUser();
    }
  }, [uid]);

  return (
    <header className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
                ResumeAI
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <a
                onClick={() => {
                  navigate("/home");

                  setSelectedTab("home");
                }}
                className="text-white  hover:text-indigo-400 px-3 py-2 text-sm font-medium flex items-center"
              >
                <Home size={18} className="mr-1" />
                Home
              </a>
              <a
                onClick={() => {
                  setSelectedTab("show");

                  navigate("/home");
                }}
                className="text-gray-300 hover:text-indigo-400 px-3 py-2 text-sm font-medium flex items-center"
              >
                <FileText size={18} className="mr-1" />
                My Resumes
              </a>
              <a
                onClick={() => {
                  navigate("/home");

                  setSelectedTab("create");
                }}
                className="text-gray-300 hover:text-indigo-400 px-3 py-2 text-sm font-medium flex items-center"
              >
                <Plus size={18} className="mr-1" />
                New Resume
              </a>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Right side - Create and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-white uppercase text-xl flex gap-2">
              <p>Hello</p> <p> {userData.name}</p>
            </div>
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-md shadow-xl border border-gray-700 z-50">
                  <a
                    href="#"
                    className=" px-4 py-2 cursor-not-allowed text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </a>
                  <a
                    href="#"
                    className=" px-4 py-2 cursor-not-allowed text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </a>
                  <div className="border-t border-gray-700 my-1"></div>
                  <a
                    onClick={handleLogout}
                    className=" px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg border-t border-gray-700">
            <a className="text-white  px-3 py-2 text-base font-medium rounded-md bg-gray-700 flex items-center">
              <Home size={18} className="mr-2" />
              Dashboard
            </a>
            <a className="text-gray-300 hover:text-white hover:bg-gray-700  px-3 py-2 text-base font-medium rounded-md flex items-center">
              <FileText size={18} className="mr-2" />
              My Resumes
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white hover:bg-gray-700  px-3 py-2 text-base font-medium rounded-md flex items-center"
            >
              <Plus size={18} className="mr-2" />
              New Resume
            </a>
            <div className="border-t border-gray-700 my-2"></div>
            <a className="text-gray-300 hover:text-white hover:bg-gray-700  px-3 py-2 text-base font-medium rounded-md flex items-center">
              <User size={18} className="mr-2" />
              Profile
            </a>
            <a className="text-gray-300 hover:text-white hover:bg-gray-700  px-3 py-2 text-base font-medium rounded-md flex items-center">
              <Settings size={18} className="mr-2" />
              Settings
            </a>
            <a
              onClick={() => navigate("/signin")}
              className="text-gray-300 hover:text-white hover:bg-gray-700  px-3 py-2 text-base font-medium rounded-md flex items-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Headerc;
