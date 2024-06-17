import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Home, SignIn, Signup } from "./components";
// import { Overview, NewCampaign, CampaignDetails } from "./pages";


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

          {/* pages */}
          {/* <Route path="/overview" element={<Overview />} />
          <Route path="/new-campaign" element={<NewCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />   */}
        </Routes>
      </div>
    </>
  );
};

export default App;
