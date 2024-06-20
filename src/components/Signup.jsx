import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pending from "./Pending";
import Navbar from "./Navbar";


const Signup = () => {

  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",   
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false); // State for spinner visibility
  const [timeoutId, setTimeoutId] = useState(null);


 
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; 


  const handlePasswordToggle = (showField) => {
    setFormData((prevState) => ({
      ...prevState,
      [showField]: !prevState[showField],
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform API call or submit data as needed
    // console.log("Form submitted:", formData); 

    // Mocking a successful sign-up with setTimeout
    toast.success("Sign Up Successful", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",     
    });

    // Show spinner
    setShowSpinner(true);

    // Delay showing the modal for 4 seconds (4000 milliseconds)
    setTimeout(() => {
      setShowSpinner(false); // Hide spinner after 4 seconds
      setShowModal(true);    // Show modal after 4 seconds
    }, 4000);
  };




  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md p-8 bg-white rounded-md shadow-xl">
          <h2 className="md:text-left text-center text-xl font-bold text-[#247b7b]">
            Welcome to Infinion Scrutz
          </h2>
          <p className="text-[.75rem] text-[#606060]">
            Please complete the form below to get started
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>          
             
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[.875rem]"
                    htmlFor="businessName"
                  >
                   Name
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    className="block font-medium text-[#1A1619] text-[.875rem]"
                    htmlFor="businessEmail"
                  >
                    Business Email Address
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 "
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleFormChange}
                    required
                  />
                  <span className="absolute top-full left-0 text-red-500 text-sm"></span>
                </div>        
                
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[.875rem]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border border-gray-300 rounded-md py-2 px-3 "
                      type={formData.showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      required
                    />
                    <button
                      onClick={() => handlePasswordToggle("showPassword")}
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[.875rem]"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border border-gray-300 rounded-md py-2 px-3 "
                      type={formData.showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        handleFormChange(e);
                        // Clear old timeout if it exists
                        clearTimeout(timeoutId);
                        // Set new timeout
                        const newTimeoutId = setTimeout(() => {
                          if (e.target.value !== formData.password) {
                            toast.error(
                              "Password and confirm password do not match"
                            );
                          } else {
                            toast.success("Passwords match");
                          }
                        }, 1000); // One second delay
                        setTimeoutId(newTimeoutId);
                      }}
                    />
                    <button
                      onClick={() =>
                        handlePasswordToggle("showConfirmPassword")
                      }
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {formData.showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>  
                <button
                className={`bg-[#247b7b] text-white hover:bg-[#236e6e] font-bold flex items-center text-[.875rem] py-3 px-14 rounded`}
                type="submit"               
              >
                Submit
                {showSpinner && <FaSpinner className="ml-2 animate-spin" />}
              </button>                      
          </form>
        </div>
        <Pending showModal={showModal} setShowModal={setShowModal} />
      </div>
      
    </>
  );
};

export default Signup;
