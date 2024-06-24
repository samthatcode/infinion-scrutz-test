/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  updateCampaignStatus,
} from "../api";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { FaChevronDown, FaSpinner, FaEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WithContext as ReactTags, SEPARATORS  } from 'react-tag-input';


const CampaignDetails = ({ campaignId, onClose, isEditing }) => {
  const [campaign, setCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState("");
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (campaignId) {
      // console.log("Fetching campaign details for ID:", campaignId);
      getCampaignById(campaignId)
        .then((response) => {
          const data = response.data;
          setCampaign({
            campaignName: data.campaignName,
            campaignDescription: data.campaignDescription,
            startDate: data.startDate,
            endDate: data.endDate,
            digestCampaign: data.digestCampaign,
            linkedKeywords: data.linkedKeywords.join(", "),
            dailyDigest: data.dailyDigest,
          });
          setCampaignStatus(data.campaignStatus); // Set campaign status
        })
        .catch((error) => {
          console.error("Error fetching campaign details:", error);
        });
    }
  }, [campaignId]);

  const handleEdit = () => {
    if (!campaign.startDate || !campaign.endDate) {
      // Handle error state or show a message to the user
      console.error("Please select both start date and end date.");
      return;
    }
    const updatedCampaign = {
      ...campaign,
      id: campaignId,
      linkedKeywords: campaign.linkedKeywords
        .split(",")
        .map((keyword) => keyword.trim()),
      digestCampaign: campaign.digestCampaign === "true" ? true : false, // Convert to Boolean
    };
    // console.log("Updating campaign with ID:", campaignId);
    updateCampaign(campaignId, updatedCampaign)
      .then(() => {
        // console.log("Campaign updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the campaign!", error);
      });
  };

  const handleDelete = () => {
    // console.log("Attempting to delete campaign with ID:", campaignId);
    if (campaignId) {
      // console.log("Deleting campaign with ID:", campaignId);
      deleteCampaign(campaignId)
        .then(() => {
          setIsDeleted(true);
        })
        .catch((error) => {
          console.error("There was an error deleting the campaign!", error);
        });
    } else {
      console.error("campaignId is undefined when attempting to delete");
    }
  };

  const handleStatusChange = () => {
    const statusPayload = {
      id: campaignId,
      campaignStatus: newStatus === "active",
    };
    // console.log("Updating status for campaign ID:", campaignId);
    // console.log("Status payload:", statusPayload);
    updateCampaignStatus(campaignId, statusPayload)
      .then(() => {
        setCampaignStatus(newStatus);
        setIsEditingStatus(false);
      })
      .catch((error) => {
        console.error(
          "There was an error updating the campaign status!",
          error
        );
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isDeleted) {
      onClose();
    }
  };

  const handleDateChange = (date, field) => {
    setCampaign({ ...campaign, [field]: date.toISOString() }); // Assuming campaign state stores dates as ISO strings
  };

  const handleDeleteKeyword = (i) => {
    setKeywords(keywords.filter((_, index) => index !== i));
  };

  const handleAddition = (keyword) => {
    setKeywords([...keywords, keyword]);
  };

  const handleDrag = (keyword, currPos, newPos) => {
    const newKeywords = [...keywords];
    newKeywords.splice(currPos, 1);
    newKeywords.splice(newPos, 0, keyword);
    setKeywords(newKeywords);
  };

  if (!campaign) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-[#247b7b]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 capitalize text-[#247b7b]">
          {isEditing ? "Edit Campaign" : "Campaign Information"}
        </h1>
        <div className="flex items-center border bg-[#edf0f0] p-2 rounded-md text-sm">
          <div className="pr-2 font-semibold">
            <span>Campaign Status</span>
          </div>
          <span>|</span>
          <span
            className={`pl-2 capitalize flex items-center ${
              campaignStatus.toLowerCase() === "active"
                ? "bg-green-100 text-green-700 text-xs font-bold inline-block py-1 px-2 last:mr-0 mr-1 text-[14px]"
                : "bg-red-100 text-red-700 text-xs font-bold inline-block py-1 px-2 last:mr-0 mr-1 text-[14px]"
            }`}
          >
            {campaignStatus}
            {isEditing && (
              <FaEdit
                className="ml-2 cursor-pointer"
                onClick={() => setIsEditingStatus(true)}
              />
            )}
          </span>
        </div>
      </div>
      {isEditingStatus && (
        <div className="flex items-center mb-4">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="px-4 py-2 border rounded-sm cursor-pointer bg-white text-[#666666] mr-2"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={handleStatusChange}
            className="bg-[#247b7b] text-white px-4 py-2 rounded"
          >
            Update Status
          </button>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Campaign Name</label>
        <input
          type="text"
          value={campaign.campaignName}
          onChange={(e) =>
            setCampaign({ ...campaign, campaignName: e.target.value })
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
          disabled={!isEditing}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={campaign.campaignDescription}
          onChange={(e) =>
            setCampaign({ ...campaign, campaignDescription: e.target.value })
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
          disabled={!isEditing}
        />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <DatePicker
            selected={new Date(campaign.startDate)}
            onChange={(date) => handleDateChange(date, "startDate")}
            className="w-[24rem] px-4 py-2 border rounded"
            dateFormat="yyyy-MM-dd"
            disabled={!isEditing}
          />
          {!campaign.startDate && (
            <p className="text-red-500">Start Date is required.</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <DatePicker
            selected={new Date(campaign.endDate)}
            onChange={(date) => handleDateChange(date, "endDate")}
            className="w-[24rem] px-4 py-2 border rounded"
            dateFormat="yyyy-MM-dd"
            disabled={!isEditing}
          />
          {!campaign.endDate && (
            <p className="text-red-500">End Date is required.</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Linked Keywords</label>
        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <ReactTags
              tags={keywords}
              handleDelete={handleDeleteKeyword}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
              inputFieldPosition="top"
              placeholder="Add new keyword"
              classNames={{
                tags: "tagsClass",
                tagInput: "tagInputClass",
                tagInputField: "tagInputFieldClass",
                selected: "selectedClass",
                tag: "tagClass",
                remove: "removeClass",
              }}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-[#E2F3F3] text-[#247b7b] text-xs font-semibold inline-block py-1 px-2 uppercase rounded last:mr-0 mr-1"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Want to receive daily digest about the campaign?
        </label>
        <div className="relative">
          <select
            value={campaign.digestCampaign ? "Yes" : "No"}
            onChange={(e) =>
              setCampaign({
                ...campaign,
                digestCampaign: e.target.value === "Yes",
              })
            }
            className="px-4 py-2 border rounded appearance-none cursor-pointer bg-white text-[#666666] w-full"
            style={{ paddingRight: "30px", minWidth: "150px" }}
            disabled={!isEditing} // Disable the dropdown when not in editing mode
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <FaChevronDown className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="mb-14">
        <label className="block text-sm font-medium mb-1 text-[#666666]">
          Kindly select how often you want to receive daily digest
        </label>
        <div className="relative">
          <select
            value={campaign.dailyDigest}
            onChange={(e) =>
              setCampaign({ ...campaign, dailyDigest: e.target.value })
            }
            className="px-4 py-2 border rounded appearance-none cursor-pointer bg-white text-[#666666] w-full"
            style={{ paddingRight: "30px", minWidth: "150px" }}
            disabled={!isEditing}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
          <FaChevronDown className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {isEditing ? (
        <div className="flex gap-6">
          <button
            onClick={handleEdit}
            className="bg-[#fffffa] text-[#247b7b] border border-[#76acaa] px-4 py-2 rounded mr-2"
          >
            Update Campaign
          </button>
        </div>
      ) : (
        <div className="flex gap-6">
          <button
            onClick={openModal}
            className="bg-[#990000] text-white px-4 py-2 rounded"
          >
            Stop Campaign
          </button>
        </div>
      )}

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
              <h2
                className="capitalize text-xl mb-10 text-[#000]"
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}
              >
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
                onClick={handleDelete}
                className="bg-[#990000] text-white px-4 py-2 rounded"
              >
                Delete Campaign
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h2
                className="capitalize text-xl mb-10 text-[#000]"
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}
              >
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

export default CampaignDetails;
