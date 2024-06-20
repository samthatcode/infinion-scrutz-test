import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { getAllCampaigns } from "../api";
import { FaRegEdit, FaRegEye, FaTrash, FaSpinner } from "react-icons/fa";
import Search from "../components/Search.jsx";
import CampaignDetails from "./CampaignDetails.jsx";

const Campaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedTab, setSelectedTab] = useState("all");
  const itemsPerPage = 10;
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true);
      const response = await getAllCampaigns(currentPage, itemsPerPage);
      let data = response.data;

      if (selectedTab !== "all") {
        const status =
          selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1); // Correctly map tab to status
        data = data.filter(
          (item) =>
            item.campaignStatus.trim().toLowerCase() ===
            status.trim().toLowerCase()
        );
      }

      setTableData(data);
      setTotalItems(response.totalItems);
      setIsLoading(false);
    };

    fetchTableData();
  }, [currentPage, selectedTab]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleCloseDetails = () => {
    setSelectedCampaignId(null);
  };

  // Calculate start and end indices for pagination info
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  if (selectedCampaignId !== null) {
    return (
      <div>
        <div className="flex items-center gap-1">
          <AiOutlineArrowLeft className="font-semibold" />
          <button onClick={() => setSelectedCampaignId(null)}>Back</button>
        </div>
        <CampaignDetails campaignId={selectedCampaignId} onClose={handleCloseDetails} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="font-bold capitalize text-xl text-[#247b7b] mb-4">
        all campaigns
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => handleTabChange("all")}
            className={`px-4 py-2 ${
              selectedTab === "all"
                ? "bg-white text-[#247b7b]  border border-[#247b7b]"
                : "bg-white text-gray-700 border border-gray-300"
            } rounded-md`}
          >
            All (90)
          </button>
          <button
            onClick={() => handleTabChange("inactive")}
            className={`px-4 py-2 ${
              selectedTab === "inactive"
                ? "bg-white text-[#247b7b] border border-[#247b7b]"
                : "bg-white text-gray-700 border border-gray-300"
            } rounded-md`}
          >
            Inactive (90)
          </button>
          <button
            onClick={() => handleTabChange("active")}
            className={`px-4 py-2 ${
              selectedTab === "active"
                ? "bg-white text-[#247b7b] border border-[#247b7b]"
                : "bg-white text-gray-700 border border-gray-300"
            } rounded-md`}
          >
            Active (90)
          </button>
        </div>

        <div className="flex">
          <Search />
          <button className="rounded text-[#666666] p-2 ml-2 text-[.875rem] border flex items-center">
            Filter by date <FiChevronDown className="ml-2" />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-2xl text-[#247b7b]" />
        </div>
      ) : (
        <table className="w-full overflow-hidden shadow-lg bg-[#ffffff]">
          <thead className="">
            <tr className="border-b bg-[#f0f4f4]">
              <th className="p-4 text-[#1A1619] font-bold text-[.875rem] text-left">
                S/N
              </th>
              <th className="p-4 text-[#1A1619] font-bold text-[.875rem] text-left capitalize">
                campaign name
              </th>
              <th className="p-4 text-[#1A1619] font-bold text-[.875rem] text-left capitalize">
                start date
              </th>
              <th className="p-4 text-[#1A1619] font-bold text-[.875rem] text-left">
                Status
              </th>
              <th className="p-4 text-[#1A1619] font-bold text-[.875rem] text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="p-4 text-[#666666] text-[.875rem]">
                  {index + 1}.
                </td>
                <td className="p-4 text-[#666666] text-[.875rem]">
                  {item.campaignName}
                </td>
                <td className="p-4 text-[#666666] text-[.875rem]">
                  {item.startDate}
                </td>
                <td className="p-4 text-[#666666] text-[.875rem]">
                  <div
                    className={`status ${item.campaignStatus.toUpperCase()} 
          ${
            item.campaignStatus === "Active"
              ? "text-[#009918] rounded-lg p-1 text-xs font-semibold inline-block text-[.875rem] uppercase"
              : ""
          }
          ${
            item.campaignStatus === "Inactive"
              ? "text-[#990000] rounded-lg p-1 text-xs font-semibold inline-block text-[.875rem] uppercase"
              : ""
          }          
        `}
                  >
                    {item.campaignStatus}
                  </div>
                </td>
                <td className="p-4 text-[#666666]">
                  <span className="flex gap-4">
                    <FaRegEye
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedCampaignId(item.id);
                      }}
                    />
                    <FaRegEdit />
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between w-full overflow-hidden p-6 shadow-lg bg-[#ffffff]">
        <div>
          <ReactPaginate
            pageCount={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"pagination-item"}
            previousLabel={
              <IconContext.Provider
                value={{ color: "#B8C1CC", size: "1.875rem" }}
              >
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider
                value={{ color: "#B8C1CC", size: "1.875rem" }}
              >
                <AiFillRightCircle />
              </IconContext.Provider>
            }
            activeClassName={"active-page"}
            breakLabel={"..."}
          />
        </div>
        <div className="">
          Showing {startIndex} to {endIndex} of {totalItems} results
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
