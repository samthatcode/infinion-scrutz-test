import { FaChevronDown, FaRegBell, FaRegQuestionCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCampaign } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaWifi } from "react-icons/fa6";
import { PiFirstAidKit } from "react-icons/pi";
import { LuUsers2 } from "react-icons/lu";
import { GiSpeedometer } from "react-icons/gi";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import {
  Overview,
  NewCampaign,
  Campaigns,
  MarketIntelligence,
  AccountSettings,
  BrandHealth,
  Feeds,
  Influencers,
  CompetitorInsights,
} from "../pages";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewCampButton from "./NewCampButton";
import Search from "./Search";
import arcticons_google_messages from "../assets/arcticons_google_messages.png";

const Dashboard = () => {
  const { collapseSidebar } = useProSidebar();
  const [activeComponent, setActiveComponent] = useState("overview");
  const [showLinks, setShowLinks] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const useScrollPosition = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos;
      setVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    // Set up event listener for window resize and scroll Position
    window.addEventListener("scroll", useScrollPosition);

    return () => {
      // Clean up the event listener
      window.removeEventListener("scroll", useScrollPosition);
    };
  }, [prevScrollPos]);

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
      case "feeds":
        return <Feeds />;
      case "brand-health":
        return <BrandHealth />;
      case "competitor-insights":
        return <CompetitorInsights />;
      case "influencers":
        return <Influencers />;
      default:
        return <Overview onNewCampaignClick={handleNewCampaignClick} />;
    }
  };

  const handleNewCampaignClick = () => {
    setActiveComponent("new-campaign");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        className="sidebar-container"
        style={{
          backgroundColor: "#f0f4f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Menu>
          <MenuItem
            icon={""}
            onClick={() => {
              collapseSidebar();
            }}
          >
            <div className="flex items-center gap-2">
              <img src={arcticons_google_messages} alt="Scrutz" />
              <h2 className="capitalize font-bold text-4xl text-[#247b7b]">
                sc<span className="text-[#3B247B]">rutz</span>
              </h2>
            </div>
          </MenuItem>
          <div className="my-11 mx-2">
            <button onClick={() => setActiveComponent("new-campaign")}>
              <NewCampButton />
            </button>
          </div>
          <MenuItem
            icon={<GiSpeedometer size={25} />}
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
            icon={<MdOutlineCampaign size={25} />}
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
            icon={<HiOutlineLightBulb size={25} />}
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
            icon={<FaWifi size={25} />}
            onClick={() => setActiveComponent("feeds")}
            style={{
              backgroundColor:
                activeComponent === "feeds" ? "#ffffff" : "transparent",
              color: activeComponent === "feeds" ? "#247b7b" : "inherit",
            }}
          >
            Feeds
          </MenuItem>
          <MenuItem
            icon={<PiFirstAidKit size={25} />}
            onClick={() => setActiveComponent("brand-health")}
            style={{
              backgroundColor:
                activeComponent === "brand-health" ? "#ffffff" : "transparent",
              color: activeComponent === "brand-health" ? "#247b7b" : "inherit",
            }}
          >
            Brand Health
          </MenuItem>
          <MenuItem
            icon={<LuUsers2 size={25} />}
            onClick={() => setActiveComponent("influencers")}
            style={{
              backgroundColor:
                activeComponent === "influencers" ? "#ffffff" : "transparent",
              color: activeComponent === "influencers" ? "#247b7b" : "inherit",
            }}
          >
            Influencers
          </MenuItem>
          <MenuItem
            icon={<MdOutlineCampaign size={25} />}
            onClick={() => setActiveComponent("competitor-insights")}
            style={{
              backgroundColor:
                activeComponent === "competitor-insights"
                  ? "#ffffff"
                  : "transparent",
              color:
                activeComponent === "competitor-insights"
                  ? "#247b7b"
                  : "inherit",
            }}
          >
            Competitor Insights
          </MenuItem>
          <MenuItem
            icon={<IoSettingsOutline size={25} />}
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
      <main className="main-content" style={{ padding: "16px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
          className={`sticky top-0 z-50 ${
            visible ? "shadow backdrop-filter" : "shadow-none"
          }`}
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
