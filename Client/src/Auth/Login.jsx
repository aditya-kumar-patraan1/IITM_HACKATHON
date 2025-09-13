import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useAppContext } from "../Context/AppContext";

const Login = ({ isLightMode, setisLightMode }) => {
  const { BACKEND_URL, setisLoggedIn, isLoggedIn, userData, getUserData } = useAppContext();
  const Navigate = useNavigate();

  const [formData, setFormdata] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(BACKEND_URL + "/api/auth/login", formData, { withCredentials: true })
      .then((res) => {
        setFormdata({ email: "", password: "" });
        if (res.data.status === 0) {
          setisLoggedIn(false);
          Navigate("/RegisterPage");
        } else {
          toast.success("Login Successfully...");
          getUserData();
          setisLoggedIn(true);
          Navigate("/");
        }
      })
      .catch(() => {
        toast.error("Login failed. Please try again.");
      });
  }

  function handleChange(e) {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-900">
          Login to Your Account
        </h2>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm sm:text-base font-medium mb-1 text-gray-700">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg text-gray-500" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm sm:text-base font-medium mb-1 text-gray-700">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 -translate-y-1/2 left-3 text-base sm:text-lg text-gray-500" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
            </div>
          </div>

          {/* Submit & Forgot Password */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto text-sm sm:text-base px-5 cursor-pointer py-2.5 rounded-lg font-medium text-white transition duration-300 bg-gray-900 hover:bg-gray-800"
            >
              Login
            </button>
            <button
              type="button"
              className="text-sm sm:text-base text-gray-600 hover:underline"
              onClick={() => Navigate("/RegisteredEmail")}
            >
              Forgot Password?
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm sm:text-base text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => Navigate("/RegisterPage")}
              type="button"
              className="font-medium cursor-pointer hover:underline text-gray-900"
            >
              Register here
            </button>
          </p>
        </div>

        <Toaster />
      </div>
    </div>
  );
};

export default Login;
