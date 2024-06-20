import { useState } from "react";
import {
  FaAsterisk,
  FaCheckCircle,
  FaChevronDown,
  FaSpinner,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { createCampaign } from "../api";
import Modal from "react-modal";
Modal.setAppElement("#root");

const NewCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [digestCampaign, setDigestCampaign] = useState(false);
  const [linkedKeywords, setLinkedKeywords] = useState("");
  const [dailyDigest, setDailyDigest] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const campaign = {
      campaignName,
      campaignDescription,
      startDate,
      endDate,
      digestCampaign,
      linkedKeywords: linkedKeywords
        .split(",")
        .map((keyword) => keyword.trim()),
      dailyDigest,
    };
    try {
      const response = await createCampaign(campaign);
      console.log("Response", response);
      openModal();
      clearForm();
    } catch (error) {
      console.error("There was an error creating the campaign!", error);
    } finally {
      setIsLoading(false); // Set loading to false when form submission ends
    }
  };

  const clearForm = () => {
    setCampaignName("");
    setCampaignDescription("");
    setStartDate(null);
    setEndDate(null);
    setDigestCampaign(false);
    setLinkedKeywords("");
    setDailyDigest("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-7 text-[#247b7b]">
        Create New Campaign
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Campaign Name{" "}
            <FaAsterisk size={5} className="inline text-red-500 absolute" />
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g. The future is now"
            // className="mt-1 p-2 border rounded w-full"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Campaign Description
          </label>
          <textarea
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            // className="mt-1 p-2 border rounded w-full"
            placeholder="Please add a description to your campaign"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
            required
          />
        </div>
        {/* Start Date and End Date */}
        <div className="mb-4 flex justify-between">
          <div className="">
            <label className="block text-sm font-medium mb-1 text-[#666666]">
              Start Date{" "}
              <FaAsterisk size={5} className="inline text-red-500 absolute" />
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yy"
              className="w-[24rem] px-4 py-2 border rounded"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium mb-1 text-[#666666]">
              End Date{" "}
              <FaAsterisk size={5} className="inline text-red-500 absolute" />
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yy"
              className="w-[24rem] px-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* Daily Digest Toggle */}
        <div className="mb-4 flex items-center justify-between text-[#666666]">
          <span>Want to receive daily digest about the campaign?</span>
          <Toggle
            checked={digestCampaign}
            onChange={() => setDigestCampaign(!digestCampaign)}
            className="custom-classname"
            icons={false}
          />
        </div>

        {/* Linked Keywords */}
        <div className="mb-7">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Linked Keywords{" "}
            <FaAsterisk size={5} className="inline text-red-500 absolute" />
          </label>
          <textarea
            value={linkedKeywords}
            onChange={(e) => setLinkedKeywords(e.target.value)}
            placeholder="To add keywords, type your keyword and press enter"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
            required
          ></textarea>
        </div>

        {/* Frequency Dropdown */}
        <div className="mb-14">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Kindly select how often you want to receive daily digest
          </label>
          <div className="relative">
            <select
              className="px-4 py-2 border rounded appearance-none w-auto cursor-pointer bg-white text-[#666666]"
              style={{ paddingRight: "30px", minWidth: "150px" }}
              value={dailyDigest}
              onChange={(e) => setDailyDigest(e.target.value)}
            >
              <option>Select</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
            </select>
            <FaChevronDown className="absolute top-3 left-[7rem] text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            className="px-20 py-2 bg-white text-[#247b7b] rounded border border-[#247b7b]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-12 py-2 bg-[#247b7b] font-semibold text-white rounded hover:bg-[#1b5e5e]"
            disabled={isLoading}
          >
            <div className="flex items-center">
              {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
              {isLoading ? "Creating..." : "Create Campaign"}
            </div>
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Success Confirmation"
        className="bg-white p-8 rounded-md shadow-lg mx-auto my-32 max-w-sm text-center"
        overlayClassName="fixed inset-0 bg-gray-400 bg-opacity-50"
      >
        <div className="flex flex-col items-center">
          <FaCheckCircle size={40} className="text-[#247b7b] my-10" />
          <h2 className="text-sm text-[#666666] mb-10">
            Campaign successfully created!
          </h2>
          <button
            onClick={closeModal}
            className="bg-[#247b7b] text-white text-sm px-4 py-2 rounded hover:bg-[#1b5e5e] mb-5"
          >
            Go back to campaign list
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NewCampaign;
