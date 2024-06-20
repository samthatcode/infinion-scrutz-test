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
import { FaChevronDown, FaSpinner } from "react-icons/fa";

const CampaignDetails = ({ campaignId, onClose }) => {
  const [campaign, setCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState("");

  useEffect(() => {
    if (campaignId) {
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
    const updatedCampaign = {
      ...campaign,
      linkedKeywords: campaign.linkedKeywords
        .split(",")
        .map((keyword) => keyword.trim()),
    };
    updateCampaign(campaignId, updatedCampaign)
      .then((response) => {
        console.log("Campaign updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the campaign!", error);
      });
  };

  const handleDelete = () => {
    deleteCampaign(campaignId)
      .then(() => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.error("There was an error deleting the campaign!", error);
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
          campaign information
        </h1>
        <div className="flex items-center border bg-[#edf0f0] p-2 rounded-md text-sm">
          <div className="pr-2 font-semibold">
            <span>Campaign Status</span>
          </div>
          <span>|</span>
          <span className="pl-2 capitalize ">{campaignStatus}</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Campaign Name</label>
        <input
          type="text"
          value={campaign.campaignName}
          onChange={(e) =>
            setCampaign({ ...campaign, campaignName: e.target.value })
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={campaign.campaignDescription}
          onChange={(e) =>
            setCampaign({ ...campaign, campaignDescription: e.target.value })
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            value={campaign.startDate}
            onChange={(e) =>
              setCampaign({ ...campaign, startDate: e.target.value })
            }
            className="w-[24rem] px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            value={campaign.endDate}
            onChange={(e) =>
              setCampaign({ ...campaign, endDate: e.target.value })
            }
            className="w-[24rem] px-4 py-2 border rounded"
          />
        </div>
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700">Digest Campaign</label>
        <input
          type="checkbox"
          checked={campaign.digestCampaign}
          onChange={(e) =>
            setCampaign({ ...campaign, digestCampaign: e.target.checked })
          }
          className="mt-1 p-2"
        />
      </div> */}
      <div className="mb-4">
        <label className="block text-gray-700">Linked Keywords</label>
        <textarea
          type="text"
          value={campaign.linkedKeywords}
          onChange={(e) =>
            setCampaign({ ...campaign, linkedKeywords: e.target.value })
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Want to receive daily digest about the campaign?
        </label>
        <input
          type="text"
          value={campaign.dailyDigest}
          onChange={(e) =>
            setCampaign({ ...campaign, dailyDigest: e.target.value })
          }
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-14">
        <label className="block text-sm font-medium mb-1 text-[#666666]">
          Kindly select how often you want to receive daily digest
        </label>
        <div className="relative">
          <select
            className="px-4 py-2 border rounded appearance-none cursor-pointer bg-white text-[#666666] w-full"
            style={{ paddingRight: "30px", minWidth: "150px" }}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
          <FaChevronDown className="absolute  right-3 top-3 text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex gap-6">
        <button
          onClick={openModal}
          className="bg-[#990000] text-white px-4 py-2 rounded"
        >
          Stop Campaign
        </button>
        <button
          onClick={handleEdit}
          className="bg-[#fffffa] text-[#76acaa] border border-[#76acaa] px-4 py-2 rounded mr-2"
        >
          Edit Information
        </button>
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

export default CampaignDetails;
