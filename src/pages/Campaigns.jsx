import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { getAllCampaigns, deleteCampaign } from "../api";
import { FaRegEdit, FaRegEye, FaTrash, FaSpinner } from "react-icons/fa";
import Search from "../components/Search.jsx";
import CampaignDetails from "./CampaignDetails.jsx";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Campaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedTab, setSelectedTab] = useState("all");
  const itemsPerPage = 10;
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for deletion modal
  const [campaignToDelete, setCampaignToDelete] = useState(null); // State to track which campaign to delete
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true);
      const response = await getAllCampaigns(currentPage, itemsPerPage);

      // console.log('Response Data:', response.data);
      
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
    setIsEditing(false); // Reset editing mode
  };

  const handleEditClick = (id) => {
    setSelectedCampaignId(id);
    setIsEditing(true); // Enable editing mode
  };

  const handleViewClick = (id) => {
    setSelectedCampaignId(id);
    setIsEditing(false); // Disable editing mode
  };

  const handleDeleteClick = (id) => {
    setCampaignToDelete(id);
    setIsModalOpen(true);
  };

  const handleDeleteCampaign = () => {
    deleteCampaign(campaignToDelete)
      .then(() => {
        setIsDeleted(true);
        setTableData((prevData) =>
          prevData.filter((item) => item.id !== campaignToDelete)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the campaign!", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCampaignToDelete(null);
    if (isDeleted) {
      setIsDeleted(false); // Reset the deletion state
    }
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
        <CampaignDetails
          campaignId={selectedCampaignId}
          onClose={handleCloseDetails}
          isEditing={isEditing} // Pass editing mode to CampaignDetails
        />
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
                      onClick={() => handleViewClick(item.id)}
                    />
                    <FaRegEdit
                      className="cursor-pointer"
                      onClick={() => handleEditClick(item.id)}
                    />
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDeleteClick(item.id)}
                    />
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="bg-white p-8 rounded shadow-lg mx-auto my-32 max-w-md text-center"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        {!isDeleted ? (
          <>
            <div className="my-14">
              <h2 className="capitalize text-xl mb-10 text-[#000]">
                stop campaign
              </h2>
              <small className="text-base mb-4 text-[#666666]">
                Are you sure you want to delete MTN campaign?
              </small>
              <br />
              <small className=" text-[#666666]">
                This action cannot be undone
              </small>
            </div>
            <div className="space-x-4">
              <button
                onClick={closeModal}
                className="bg-white text-[#404040] border border-[#435a6b] px-6 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCampaign}
                className="bg-[#990000] text-white px-4 py-2 rounded"
              >
                Delete Campaign
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h2 className="capitalize text-xl mb-10 text-[#000]">
                Campaign deleted
              </h2>
              <small className="text-sm mb-10 text-[#666666]">
                MTN campaign has been deleted
              </small>
              <button
                onClick={closeModal}
                className="bg-[#247b7b] text-white px-6 py-2 rounded text-sm"
              >
                Go back to campaign list
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Campaigns;
