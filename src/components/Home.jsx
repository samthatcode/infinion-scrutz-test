import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Infinion Technologies
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We provide innovative solutions to drive your business forward. Join
          us to experience cutting-edge technology and exceptional service.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white border border-[#247b7b] text-[#247b7b] px-6 py-3 rounded-md text-lg hover:bg-[#247b7b] hover:text-white transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
