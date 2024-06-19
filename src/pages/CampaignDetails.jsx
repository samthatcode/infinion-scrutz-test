import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampaignById, updateCampaign, deleteCampaign } from "../api";
import Modal from "react-modal";
// import { updateCampaignStatus } from "../api";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    digestCampaign: false,
    linkedKeywords: "",
    dailyDigest: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getCampaignById(id)
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
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the campaign details!",
          error
        );
      });
  }, [id]);

  const handleEdit = () => {
    const updatedCampaign = {
      ...campaign,
      linkedKeywords: campaign.linkedKeywords
        .split(",")
        .map((keyword) => keyword.trim()),
    };
    updateCampaign(id, updatedCampaign)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error updating the campaign!", error);
      });
  };

  const handleDelete = () => {
    deleteCampaign(id)
      .then((response) => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.error("There was an error deleting the campaign!", error);
      });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Inside CampaignDetails component, below other state declarations
  const [campaignStatus, setCampaignStatus] = useState(false);

  useEffect(() => {
    getCampaignById(id)
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
        setCampaignStatus(data.campaignStatus === "active");
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the campaign details!",
          error
        );
      });
  }, [id]);

  // const handleStatusChange = () => {
  //   updateCampaignStatus(id, !campaignStatus)
  //     .then((response) => {
  //       setCampaignStatus(!campaignStatus);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There was an error updating the campaign status!",
  //         error
  //       );
  //     });
  // };

  // Inside the return statement of CampaignDetails component
  // <button
  //   onClick={handleStatusChange}
  //   className="bg-green-500 text-white px-4 py-2 rounded mr-2"
  // >
  //   {campaignStatus ? "Deactivate" : "Activate"} Campaign
  // </button>;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isDeleted) {
      navigate("/");
    }
  };

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
          <span className="pl-2">Current Status Here</span>
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
            placeholder="dd/mm/yy"
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
            placeholder="dd/mm/yy"
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
            <h4 className="text-xl mb-4">
              Are you sure you want to delete MTN campaign?
            </h4>
            <p>This action cannot be undone</p>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Delete Campaign
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-green-500 text-4xl mb-4" />
              <h2 className="text-xl mb-4">Campaign successfully deleted!</h2>
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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
