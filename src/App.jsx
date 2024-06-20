import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Home, SignIn, Signup } from "./components";


const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </div>
    </>
  );
};

export default App;
