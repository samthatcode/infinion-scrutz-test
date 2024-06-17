/* eslint-disable no-undef */
import axios from "../axiosSetup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false); // State for spinner visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock login (you can replace this with actual login authentication)
    try {
      const response = await axios.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Mock login formData:", formData);
      console.log("Mock login response data:", response.data);
      console.log("Response:", response);

      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Save to local storage
      localStorage.setItem("session", JSON.stringify(response.data.session));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Show spinner
      setShowSpinner(true);

      // Delay showing the modal for 4 seconds (4000 milliseconds)
      setTimeout(() => {
        setShowSpinner(false); // Hide spinner after 4 seconds
        // Redirect to dashboard
        navigate("/dashboard");
      }, 4000);
    } catch (error) {
      console.error("Error details:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Incorrect Username or Password", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Oops!, Network error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 drop-shadow-xl">
        <div className="w-full max-w-md p-8 bg-white rounded-md">
          <h2 className="md:text-left text-center text-xl font-medium text-[#247b7b]">
            Welcome Back!
          </h2>
          <p className="text-[12px] text-[#606060]">
            Sign in to your Infinion Scrutz&#39;s dashboard
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-[#1a1619]"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-[#1a1619]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handlePasswordToggle}
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="flex items-center text-[12px]">
                  <p className="text-[#606060]">Forgot Password?</p>
                  <Link to="" className="text-[#039BF0] p-2 font-medium">
                    Reset it
                  </Link>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`bg-[#247b7b] text-white hover:bg-[#236e6e] font-bold flex items-center text-[.875rem] py-3 px-14 rounded`}
            >
              Sign In
              {showSpinner && <FaSpinner className="ml-2 animate-spin" />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
