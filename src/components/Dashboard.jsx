import {
  FaBars,
  FaChevronDown,
  FaFreeCodeCamp,
  FaRegBell,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import {
  Overview,
  NewCampaign,
  Campaigns,
  MarketIntelligence,
  AccountSettings,
} from "../pages";
import { useState } from "react";
import { Link } from "react-router-dom";
import NewCampButton from "./NewCampButton";
import Search from "./Search";

const Dashboard = () => {
  const { collapseSidebar } = useProSidebar();
  const [activeComponent, setActiveComponent] = useState("overview");
  const [showLinks, setShowLinks] = useState(false);

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "overview":
        return <Overview onNewCampaignClick={handleNewCampaignClick} />;
      case "campaign":
        return <Campaigns />;
      case "market-intelligence":
        return <MarketIntelligence />;
      case "account-settings":
        return <AccountSettings />;
      case "new-campaign":
        return <NewCampaign />;
      default:
        return <Overview onNewCampaignClick={handleNewCampaignClick} />;
    }
  };

  const handleNewCampaignClick = () => {
    setActiveComponent("new-campaign");
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar
        style={{
          height: "100vh",
          backgroundColor: "#f0f4f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Menu>
          <MenuItem
            icon={<FaBars size={25} />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            <h2 className="capitalize">scrutz</h2>
          </MenuItem>
          <div className="my-11 mx-2">
            <button onClick={() => setActiveComponent("new-campaign")}>
              <NewCampButton />
            </button>
          </div>
          <MenuItem
            icon={<FaFreeCodeCamp size={25} />}
            onClick={() => setActiveComponent("overview")}
            style={{
              backgroundColor:
                activeComponent === "overview" ? "#ffffff" : "transparent",
              color: activeComponent === "overview" ? "#247b7b" : "inherit",
            }}
          >
            Overview
          </MenuItem>
          <MenuItem
            icon={<FaFreeCodeCamp size={25} />}
            onClick={() => setActiveComponent("campaign")}
            style={{
              backgroundColor:
                activeComponent === "campaign" ? "#ffffff" : "transparent",
              color: activeComponent === "campaign" ? "#247b7b" : "inherit",
            }}
          >
            {" "}
            Campaign
          </MenuItem>
          <MenuItem
            icon={<FaFreeCodeCamp size={25} />}
            onClick={() => setActiveComponent("market-intelligence")}
            style={{
              backgroundColor:
                activeComponent === "market-intelligence"
                  ? "#ffffff"
                  : "transparent",
              color:
                activeComponent === "market-intelligence"
                  ? "#247b7b"
                  : "inherit",
            }}
          >
            Market Intelligence
          </MenuItem>
          <MenuItem
            icon={<FaFreeCodeCamp size={25} />}
            onClick={() => setActiveComponent("account-settings")}
            style={{
              backgroundColor:
                activeComponent === "account-settings"
                  ? "#ffffff"
                  : "transparent",
              color:
                activeComponent === "account-settings" ? "#247b7b" : "inherit",
            }}
          >
            Account Settings
          </MenuItem>
        </Menu>
        <div className="p-5 bg-white border-solid m-4 rounded-md flex flex-col items-center my-12">
          <div className="text-[#247b7b] flex flex-col items-center">
            <FaRegQuestionCircle />
            <h3>Need help?</h3>
          </div>
          <small className="text-[#707070] text-center my-3">
            We&#39;re readily available to provide help
          </small>
          <small className="text-[#247b7b] border border-[#247b7b] px-4 py-1 rounded font-medium">
            Get help
          </small>
        </div>
      </Sidebar>

      {/* Render the active component */}
      <main style={{ flex: 1, padding: "16px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
          className="mx-10"
        >
          <Search />
          <div className="relative">
            <div className="flex items-center">
              <div className="relative">
                <FaRegBell className="text-2xl ml-4" />
              </div>
              <img
                src={`/images/${
                  JSON.parse(localStorage.getItem("user")).photo
                }`}
                alt="Logo"
                className="w-8 h-8 ml-4 rounded-full"
              />
              <p className="ml-4">Big Tech</p>
              <FaChevronDown
                className="text-sm text-[#787678] ml-1 cursor-pointer"
                onClick={() => setShowLinks(!showLinks)}
              />
            </div>
            {showLinks && (
              <div className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg">
                <Link
                  to={""}
                  className="block px-4 py-2 hover:bg-gray-200 text-[12px]"
                >
                  Edit Profile
                </Link>
                <Link
                  to={""}
                  className="block px-4 py-2 hover:bg-gray-200 text-[12px]"
                >
                  Check Status
                </Link>
                <Link
                  to={"/login"}
                  className="block px-4 py-2 hover:bg-gray-200 text-[12px]"
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </header>
        <hr />
        {renderComponent()}
      </main>
    </div>
  );
};

export default Dashboard;
